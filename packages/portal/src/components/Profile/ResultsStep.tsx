// packages/portal/src/components/Profile/ResultsStep.tsx
// Upload-first OCR: matric certificate → auto APS → confirmation → ID document

import { useState } from 'react';
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
  IconButton,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import api from '@/config/api';

interface Subject {
  subject: string;
  mark: number;
  level: number;
  year: number;
  confidence?: number;
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

export default function ResultsStep({ data, onNext, onBack, profileData }: Props) {
  const [step, setStep] = useState<'upload' | 'confirm' | 'id-doc'>(
    data.subjects.length > 0 ? 'id-doc' : 'upload'
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [ocrResult, setOcrResult] = useState<any>(data.subjects.length > 0 ? { subjects: data.subjects, aps: data.aps } : null);
  const [editedSubjects, setEditedSubjects] = useState<Subject[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [matricIdNumber, setMatricIdNumber] = useState<string | null>(null); // ID from matric cert
  const [idDocIdNumber, setIdDocIdNumber] = useState<string | null>(null); // ID from ID doc
  const [idDocUploaded, setIdDocUploaded] = useState(false);
  const [idDocUploading, setIdDocUploading] = useState(false);
  const [idMismatchWarning, setIdMismatchWarning] = useState<string | null>(null);

  const currentYear = new Date().getFullYear();

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

      // Populate subjects with current year if missing
      const subjects = ocr.subjects.map((s: any) => ({
        ...s,
        year: s.year || currentYear,
      }));

      setOcrResult({ ...ocr, subjects });
      setEditedSubjects(subjects);
      setWarnings(ocr.warnings || []);
      setMatricIdNumber(ocr.idNumber); // Store matric cert ID number
      setStep('confirm');
    } catch (err: any) {
      const message = err.response?.data?.error?.message || 'Failed to scan certificate';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubjectEdit = (index: number, field: 'mark' | 'level', value: string) => {
    const numValue = parseInt(value);
    if (isNaN(numValue)) return;

    const updated = [...editedSubjects];
    updated[index] = { ...updated[index], [field]: numValue };
    setEditedSubjects(updated);
  };

  const handleConfirm = () => {
    // Recalculate APS from edited subjects (simple best-6 excl Life Orientation)
    const eligibleSubjects = editedSubjects
      .filter((s) => !s.subject.toLowerCase().includes('life orientation'))
      .sort((a, b) => b.level - a.level)
      .slice(0, 6);

    const aps = eligibleSubjects.reduce((sum, s) => sum + s.level, 0);

    setOcrResult({ ...ocrResult, subjects: editedSubjects, aps });
    setStep('id-doc');
  };

  const handleIdUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIdDocUploading(true);
    setError('');
    setIdMismatchWarning(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post('/documents/scan-id', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const { ocr } = response.data;
      setIdDocIdNumber(ocr.idNumber); // Store ID doc ID number

      // Cross-check all three ID numbers
      const typedId = profileData?.personal?.idNumber;
      const matricId = matricIdNumber;
      const idDocId = ocr.idNumber;

      const ids = [
        { source: 'Personal Information', id: typedId },
        { source: 'Matric Certificate', id: matricId },
        { source: 'ID Document', id: idDocId },
      ].filter(item => item.id); // Only include IDs that exist

      // Check if all are the same
      const uniqueIds = new Set(ids.map(item => item.id));
      if (uniqueIds.size > 1) {
        const mismatchDetails = ids.map(item => `${item.source}: ${item.id}`).join(', ');
        setIdMismatchWarning(
          `The ID numbers don't match across your documents. ${mismatchDetails}. Please double-check and correct if needed.`
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

    onNext({
      subjects: editedSubjects,
      aps: ocrResult.aps,
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
          <Button onClick={onBack} size="large" disabled={loading}>
            Back
          </Button>
        </Box>
      </Box>
    );
  }

  if (step === 'confirm') {
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          Confirm Your Results
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Review the extracted results. Click a value to edit if it was misread.
        </Typography>

        {warnings.length > 0 && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            {warnings.map((w, i) => (
              <div key={i}>{w}</div>
            ))}
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        <Paper sx={{ p: 3, mb: 3, bgcolor: 'success.50', border: '2px solid', borderColor: 'success.main' }}>
          <Typography variant="h5" align="center" color="success.dark">
            Your APS: <strong>{ocrResult.aps}</strong>
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary">
            (Best 6 subjects, excluding Life Orientation)
          </Typography>
        </Paper>

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
              {editedSubjects.map((subject, index) => (
                <TableRow key={index}>
                  <TableCell>{subject.subject}</TableCell>
                  <TableCell align="center">
                    <TextField
                      value={subject.mark}
                      onChange={(e) => handleSubjectEdit(index, 'mark', e.target.value)}
                      type="number"
                      size="small"
                      sx={{ width: 80 }}
                      inputProps={{ min: 0, max: 100 }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <TextField
                      value={subject.level}
                      onChange={(e) => handleSubjectEdit(index, 'level', e.target.value)}
                      type="number"
                      size="small"
                      sx={{ width: 80 }}
                      inputProps={{ min: 1, max: 7 }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {subject.confidence ? (
                      <Chip
                        label={`${Math.round(subject.confidence * 100)}%`}
                        size="small"
                        color={subject.confidence > 0.8 ? 'success' : 'warning'}
                      />
                    ) : (
                      '-'
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button onClick={() => setStep('upload')} size="large">
            Re-upload
          </Button>
          <Button onClick={handleConfirm} variant="contained" size="large">
            Confirm Results
          </Button>
        </Box>
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
        <Alert severity="warning" sx={{ mb: 3 }} onClose={() => setIdMismatchWarning(null)}>
          {idMismatchWarning}
        </Alert>
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
                  APS: {ocrResult.aps} • {editedSubjects.length} subjects
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
        <Button onClick={() => setStep('confirm')} size="large">
          Back to Results
        </Button>
        <Button
          onClick={handleNext}
          variant="contained"
          size="large"
          disabled={!idDocUploaded}
        >
          Next: Review
        </Button>
      </Box>
    </Box>
  );
}
