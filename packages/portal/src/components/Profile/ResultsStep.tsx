// packages/portal/src/components/Profile/ResultsStep.tsx
// Upload-first OCR: matric certificate → auto APS → confirmation → ID document

import { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Chip,
  Grid,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import api from '@/config/api';
import { markToAPS } from '@applyonce/shared';
import { subjectLabel } from '@/utils/subject-labels';
import { confidenceDisplay, ConfidenceTier } from '@/utils/confidence';
import { saveDraft, loadDraft, clearDraft } from '@/utils/draft-storage';

const DRAFT_KEY = 'applyonce_results_draft';

interface Subject {
  subject: string;
  mark: number;
  level: number;
  year: number;
  confidence?: ConfidenceTier;
  edited?: boolean;
}

interface Props {
  data: {
    subjects: Subject[];
    aps: number | null;
  };
  onNext: (data: any) => void;
  onBack: () => void;
  profileData?: any; // To get the ID number typed in PersonalStep
}

const OCR_BANNER: Record<ConfidenceTier, { severity: 'success' | 'warning' | 'error'; icon: JSX.Element; text: string }> = {
  high: { severity: 'success', icon: <CheckCircleIcon fontSize="small" />, text: 'Extraction Successful' },
  medium: {
    severity: 'warning',
    icon: <WarningAmberIcon fontSize="small" />,
    text: 'Extraction Completed – Manual Review Recommended',
  },
  low: {
    severity: 'error',
    icon: <ErrorOutlineIcon fontSize="small" />,
    text: 'Extraction Failed – Please Re-upload Your Certificate',
  },
};

function calculateAPSFromSubjects(subjects: Subject[]): number {
  const eligible = subjects
    .filter((s) => s.subject !== 'life_orientation' && !s.subject.toLowerCase().includes('life orientation'))
    .map((s) => ({ ...s, level: markToAPS(s.mark) }))
    .sort((a, b) => b.level - a.level)
    .slice(0, 6);
  return eligible.reduce((sum, s) => sum + s.level, 0);
}

export default function ResultsStep({ data, onNext, onBack, profileData }: Props) {
  const hasSavedResults = data.subjects.length > 0;

  const draft = useMemo(() => (!hasSavedResults ? loadDraft<any>(DRAFT_KEY) : null), [hasSavedResults]);

  const [step, setStep] = useState<'upload' | 'confirm' | 'id-doc'>(
    hasSavedResults ? 'id-doc' : draft?.step || 'upload'
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [overallConfidence, setOverallConfidence] = useState<ConfidenceTier | null>(draft?.overallConfidence || null);
  const [originalSubjects, setOriginalSubjects] = useState<Subject[]>(
    hasSavedResults ? data.subjects : draft?.originalSubjects || []
  );
  const [editedSubjects, setEditedSubjects] = useState<Subject[]>(
    hasSavedResults ? data.subjects : draft?.editedSubjects || []
  );
  const [warnings, setWarnings] = useState<string[]>(draft?.warnings || []);
  const [matricIdNumber, setMatricIdNumber] = useState<string | null>(draft?.matricIdNumber || null);
  const [idDocIdNumber, setIdDocIdNumber] = useState<string | null>(null);
  const [idDocUploaded, setIdDocUploaded] = useState(draft?.idDocUploaded || false);
  const [idDocUploading, setIdDocUploading] = useState(false);
  const [idMismatchWarning, setIdMismatchWarning] = useState<string | null>(null);
  const [mismatchAcknowledged, setMismatchAcknowledged] = useState(false);
  const [certFile, setCertFile] = useState<File | null>(null);
  const [certPreviewOpen, setCertPreviewOpen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(draft?.lastUpdated ? new Date(draft.lastUpdated) : null);
  const [pendingOverride, setPendingOverride] = useState<{ index: number; value: number } | null>(null);

  const currentYear = new Date().getFullYear();
  const aps = useMemo(() => calculateAPSFromSubjects(editedSubjects), [editedSubjects]);

  const certFileUrl = useMemo(() => (certFile ? URL.createObjectURL(certFile) : null), [certFile]);
  useEffect(() => {
    return () => {
      if (certFileUrl) URL.revokeObjectURL(certFileUrl);
    };
  }, [certFileUrl]);

  // Persist in-progress edits so a refresh doesn't lose them (only while results aren't saved server-side yet).
  useEffect(() => {
    if (hasSavedResults) return;
    if (step === 'upload' && editedSubjects.length === 0) return;
    saveDraft(DRAFT_KEY, {
      step,
      overallConfidence,
      originalSubjects,
      editedSubjects,
      warnings,
      matricIdNumber,
      idDocUploaded,
      lastUpdated,
    });
  }, [hasSavedResults, step, overallConfidence, originalSubjects, editedSubjects, warnings, matricIdNumber, idDocUploaded, lastUpdated]);

  const handleMatricUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post('/documents/scan-matric', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const { ocr } = response.data;

      const subjects: Subject[] = ocr.subjects.map((s: any) => ({
        ...s,
        year: s.year || currentYear,
        mark: s.mark ?? 0,
        level: markToAPS(s.mark ?? 0),
        edited: false,
      }));

      setOriginalSubjects(subjects);
      setEditedSubjects(subjects);
      setOverallConfidence(ocr.confidence || null);
      setWarnings(ocr.warnings || []);
      setMatricIdNumber(ocr.idNumber);
      setCertFile(file);
      setLastUpdated(new Date());
      setStep('confirm');
    } catch (err: any) {
      const message = err.response?.data?.error?.message || 'Failed to scan certificate';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const applyMarkChange = (index: number, mark: number) => {
    setEditedSubjects((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], mark, level: markToAPS(mark) };
      return updated;
    });
    setLastUpdated(new Date());
  };

  const handleMarkInput = (index: number, value: string) => {
    const numValue = value === '' ? 0 : parseInt(value, 10);
    if (Number.isNaN(numValue)) return;
    const clamped = Math.max(0, Math.min(100, numValue));
    applyMarkChange(index, clamped);
  };

  const handleMarkBlur = (index: number) => {
    const current = editedSubjects[index];
    const original = originalSubjects[index];
    if (!original || current.mark === original.mark || current.edited) return;
    setPendingOverride({ index, value: current.mark });
  };

  const confirmOverride = () => {
    if (!pendingOverride) return;
    setEditedSubjects((prev) => {
      const updated = [...prev];
      updated[pendingOverride.index] = { ...updated[pendingOverride.index], edited: true };
      return updated;
    });
    setPendingOverride(null);
  };

  const cancelOverride = () => {
    if (!pendingOverride) return;
    const original = originalSubjects[pendingOverride.index];
    applyMarkChange(pendingOverride.index, original.mark);
    setPendingOverride(null);
  };

  const duplicateSubjects = useMemo(() => {
    const seen = new Set<string>();
    const dupes = new Set<string>();
    editedSubjects.forEach((s) => {
      if (seen.has(s.subject)) dupes.add(s.subject);
      seen.add(s.subject);
    });
    return dupes;
  }, [editedSubjects]);

  const allMarksValid = editedSubjects.every((s) => Number.isInteger(s.mark) && s.mark >= 0 && s.mark <= 100);
  const hasMinSubjects = editedSubjects.length >= 6;
  const canConfirmResults = allMarksValid && duplicateSubjects.size === 0 && hasMinSubjects;

  const handleConfirm = () => {
    setStep('id-doc');
  };

  const handleIdUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIdDocUploading(true);
    setError('');
    setIdMismatchWarning(null);
    setMismatchAcknowledged(false);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post('/documents/scan-id', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const { ocr } = response.data;
      setIdDocIdNumber(ocr.idNumber);

      const typedId = profileData?.personal?.idNumber;
      const matricId = matricIdNumber;
      const idDocId = ocr.idNumber;

      const ids = [typedId, matricId, idDocId].filter(Boolean);
      const uniqueIds = new Set(ids);
      if (uniqueIds.size > 1) {
        setIdMismatchWarning(
          'The ID number detected on your uploaded certificate does not match the ID number entered during registration. Please verify both values before continuing.'
        );
      }

      setIdDocUploaded(true);
    } catch (err: any) {
      const message = err.response?.data?.error?.message || 'Failed to scan ID document';
      setError(message);
    } finally {
      setIdDocUploading(false);
    }
  };

  const handleNext = () => {
    if (!idDocUploaded) {
      setError('Please upload your ID document before proceeding');
      return;
    }
    if (idMismatchWarning && !mismatchAcknowledged) {
      setError('Please confirm your ID number before proceeding');
      return;
    }

    clearDraft(DRAFT_KEY);
    onNext({
      subjects: editedSubjects,
      aps,
    });
  };

  if (step === 'upload') {
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          Upload Matric Results
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Upload your National Senior Certificate (matric certificate). We&apos;ll scan it and automatically calculate your APS.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        <Paper
          sx={{
            p: 4,
            textAlign: 'center',
            border: '2px dashed',
            borderColor: 'primary.main',
            bgcolor: 'primary.50',
            cursor: loading ? 'wait' : 'pointer',
          }}
        >
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={handleMatricUpload}
            style={{ display: 'none' }}
            id="matric-upload"
            disabled={loading}
          />
          <label htmlFor="matric-upload">
            {loading ? (
              <>
                <CircularProgress size={48} sx={{ mb: 2 }} />
                <Typography variant="body1" color="text.secondary">
                  Scanning certificate...
                </Typography>
              </>
            ) : (
              <>
                <CloudUploadIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Click to upload your matric certificate
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Image (JPG, PNG) or PDF
                </Typography>
              </>
            )}
          </label>
        </Paper>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button onClick={onBack} size="large" disabled={loading} startIcon={<ArrowBackIcon />}>
            Back
          </Button>
        </Box>
      </Box>
    );
  }

  if (step === 'confirm') {
    const banner = overallConfidence ? OCR_BANNER[overallConfidence] : null;
    const suggestReupload = warnings.length > 0 || overallConfidence !== 'high';

    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          Confirm Your Results
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Review the extracted results. Only the mark can be edited — the level is calculated automatically.
        </Typography>

        {banner && (
          <Alert severity={banner.severity} icon={banner.icon} sx={{ mb: 2 }}>
            {banner.text}
          </Alert>
        )}

        {warnings.length > 0 && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            {warnings.map((w, i) => (
              <div key={i}>{w}</div>
            ))}
          </Alert>
        )}

        {suggestReupload && (
          <Alert severity="info" sx={{ mb: 3 }}>
            Some results could not be extracted accurately. For better accuracy, consider uploading a clearer copy of
            your certificate.
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        <Paper sx={{ p: 3, mb: 3, bgcolor: 'success.50', border: '2px solid', borderColor: 'success.main' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
            <Typography variant="h5" align="center" color="success.dark">
              Your APS: <strong>{aps}</strong>
            </Typography>
            <Tooltip title="APS is the sum of your best 6 subjects' achievement levels (1–7 each), excluding Life Orientation. It's the primary score universities use to check what you qualify for.">
              <IconButton size="small">
                <InfoOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
          <Typography variant="body2" align="center" color="text.secondary">
            Best 6 Subjects (excluding Life Orientation)
          </Typography>
          <Typography variant="caption" align="center" display="block" color="text.secondary">
            Last Updated: {lastUpdated ? lastUpdated.toLocaleTimeString() : '—'}
          </Typography>
        </Paper>

        {certFile && (
          <Box sx={{ mb: 2 }}>
            <Button size="small" startIcon={<VisibilityIcon />} onClick={() => setCertPreviewOpen(true)}>
              Preview Certificate
            </Button>
          </Box>
        )}

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Subject</strong></TableCell>
                <TableCell align="center"><strong>Mark (%)</strong></TableCell>
                <TableCell align="center"><strong>Level (APS)</strong></TableCell>
                <TableCell align="center">Confidence</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {editedSubjects.map((subject, index) => {
                const conf = confidenceDisplay(subject.confidence);
                const isDuplicate = duplicateSubjects.has(subject.subject);
                return (
                  <TableRow
                    key={index}
                    sx={{
                      bgcolor: subject.edited ? 'warning.50' : isDuplicate ? 'error.50' : undefined,
                      transition: 'background-color 0.3s',
                    }}
                  >
                    <TableCell>
                      {subjectLabel(subject.subject)}
                      {subject.edited && (
                        <Chip label="Edited" size="small" color="warning" sx={{ ml: 1, fontSize: '0.65rem', height: 18 }} />
                      )}
                      {isDuplicate && (
                        <Typography variant="caption" color="error.main" display="block">
                          Duplicate subject — please re-upload or remove one.
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        value={subject.mark}
                        onChange={(e) => handleMarkInput(index, e.target.value)}
                        onBlur={() => handleMarkBlur(index)}
                        type="number"
                        size="small"
                        sx={{ width: 80 }}
                        inputProps={{ min: 0, max: 100 }}
                        error={subject.mark < 0 || subject.mark > 100}
                      />
                      {subject.confidence === 'low' && (
                        <Typography variant="caption" color="error.main" display="block" sx={{ maxWidth: 140 }}>
                          Low extraction confidence — verify against your certificate.
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell align="center">{subject.level}</TableCell>
                    <TableCell align="center">
                      <Tooltip title={conf.available ? `${conf.percent}% confidence` : 'Confidence unavailable'}>
                        <Chip label={conf.available ? `${conf.label} (${conf.percent}%)` : conf.label} size="small" color={conf.color} />
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {!hasMinSubjects && (
          <Alert severity="error" sx={{ mt: 2 }}>
            At least 6 subjects are required. Please re-upload a clearer copy of your certificate.
          </Alert>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button onClick={() => setStep('upload')} size="large" startIcon={<ArrowBackIcon />}>
            Re-upload
          </Button>
          <Button onClick={handleConfirm} variant="contained" size="large" disabled={!canConfirmResults}>
            Confirm Results
          </Button>
        </Box>

        <Dialog open={!!pendingOverride} onClose={cancelOverride}>
          <DialogTitle>Confirm your correction</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You are overriding the automatically extracted result. Please ensure the entered mark matches your
              official certificate.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={cancelOverride}>Cancel</Button>
            <Button onClick={confirmOverride} variant="contained">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={certPreviewOpen} onClose={() => setCertPreviewOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>Your Uploaded Certificate</DialogTitle>
          <DialogContent>
            {certFile && certFileUrl && certFile.type.startsWith('image/') ? (
              <Box
                component="img"
                src={certFileUrl}
                alt="Uploaded matric certificate"
                sx={{ width: '100%', height: 'auto' }}
              />
            ) : certFile && certFileUrl ? (
              <Button variant="outlined" onClick={() => window.open(certFileUrl, '_blank', 'noopener,noreferrer')}>
                Open PDF in new tab
              </Button>
            ) : null}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCertPreviewOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }

  // step === 'id-doc'
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Upload ID Document
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Upload your South African ID document to complete your profile.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {idMismatchWarning && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {idMismatchWarning}
        </Alert>
      )}

      {idMismatchWarning && (
        <FormControlLabel
          sx={{ mb: 2 }}
          control={
            <Checkbox checked={mismatchAcknowledged} onChange={(e) => setMismatchAcknowledged(e.target.checked)} />
          }
          label="I've checked and confirm my ID number is correct"
        />
      )}

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3, bgcolor: 'success.50' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <CheckCircleIcon color="success" />
              <Box>
                <Typography variant="body1" fontWeight={600}>
                  Matric Results Confirmed
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  APS: {editedSubjects.length > 0 ? aps : data.aps} • {editedSubjects.length} subjects
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          {idDocUploaded ? (
            <Paper sx={{ p: 3, bgcolor: 'success.50' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CheckCircleIcon color="success" />
                <Typography variant="body1" fontWeight={600}>
                  ID Document Uploaded
                </Typography>
              </Box>
            </Paper>
          ) : (
            <Paper
              sx={{
                p: 4,
                textAlign: 'center',
                border: '2px dashed',
                borderColor: 'primary.main',
                bgcolor: 'primary.50',
                cursor: idDocUploading ? 'wait' : 'pointer',
              }}
            >
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleIdUpload}
                style={{ display: 'none' }}
                id="id-upload"
                disabled={idDocUploading}
              />
              <label htmlFor="id-upload">
                {idDocUploading ? (
                  <>
                    <CircularProgress size={48} sx={{ mb: 2 }} />
                    <Typography variant="body1" color="text.secondary">
                      Uploading and scanning ID...
                    </Typography>
                  </>
                ) : (
                  <>
                    <CloudUploadIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      Upload ID Document
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Image or PDF of your SA ID
                    </Typography>
                  </>
                )}
              </label>
            </Paper>
          )}
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button onClick={() => setStep('confirm')} size="large" startIcon={<ArrowBackIcon />}>
          Back to Results
        </Button>
        <Button
          onClick={handleNext}
          variant="contained"
          size="large"
          endIcon={<ArrowForwardIcon />}
          disabled={!idDocUploaded || (!!idMismatchWarning && !mismatchAcknowledged)}
        >
          Next: Review
        </Button>
      </Box>
    </Box>
  );
}
