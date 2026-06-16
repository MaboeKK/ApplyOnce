// packages/admin/src/pages/applications/[id].tsx
// Application detail view with decision panel

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  CircularProgress,
  Alert,
  Button,
  Divider,
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Download as DownloadIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { useAuthStore } from '@/store/auth';
import api from '@/config/api';

interface SubjectResult {
  id: string;
  subject: string;
  mark: number;
  achievementLevel: number;
}

interface Document {
  id: string;
  type: string;
  fileName: string;
  storageKey: string;
  uploadedAt: string;
}

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  idNumber: string;
  dateOfBirth: string;
  gender: string;
  race: string | null;
  nationality: string;
  homeLanguage: string | null;
  address: any;
  matricYear: number;
  school: string | null;
  subjectResults: SubjectResult[];
  documents: Document[];
}

interface Application {
  id: string;
  studentId: string;
  student: Student;
  universityId: string;
  universityName: string;
  programmeId: string;
  programmeName: string;
  facultyName: string;
  status: string;
  universityReference: string | null;
  submittedAt: string | null;
  decision: string | null;
  decisionReason: string | null;
  decisionAt: string | null;
  decidedBy: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function ApplicationDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { isAuthenticated, user } = useAuthStore();

  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Decision form state
  const [decision, setDecision] = useState<'accepted' | 'rejected' | ''>('');
  const [reason, setReason] = useState('');
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Auth guard
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, router]);

  // Fetch application detail
  useEffect(() => {
    if (!isAuthenticated || !id) return;

    const fetchApplication = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get(`/admin/applications/${id}`);
        setApplication(response.data.application);
      } catch (err: any) {
        console.error('Error fetching application:', err);
        if (err.response?.status === 403) {
          setError('You do not have permission to view this application. It may belong to another university.');
        } else if (err.response?.status === 404) {
          setError('Application not found.');
        } else {
          setError(err.response?.data?.message || 'Failed to load application');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [isAuthenticated, id]);

  const handleDecisionSubmit = async () => {
    if (!decision || !reason.trim()) {
      setSubmitError('Please select a decision and provide a reason');
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const response = await api.patch(`/admin/applications/${id}/decision`, {
        decision,
        reason: reason.trim(),
      });

      // Update local state with new decision
      if (application) {
        setApplication({
          ...application,
          status: response.data.application.status,
          decision: response.data.application.decision,
          decisionReason: response.data.application.decisionReason,
          decisionAt: response.data.application.decisionAt,
        });
      }

      setConfirmDialogOpen(false);
      setDecision('');
      setReason('');
    } catch (err: any) {
      console.error('Error submitting decision:', err);
      if (err.response?.status === 400 && err.response?.data?.code === 'ALREADY_DECIDED') {
        setSubmitError('This application has already been decided.');
      } else if (err.response?.status === 403) {
        setSubmitError('You do not have permission to decide on this application.');
      } else {
        setSubmitError(err.response?.data?.message || 'Failed to submit decision');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDownloadDocument = async (doc: Document) => {
    try {
      const response = await api.get(`/documents/${doc.id}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', doc.fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading document:', err);
      alert('Failed to download document');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'info';
      case 'accepted':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const calculateAPS = (subjectResults: SubjectResult[]) => {
    // Exclude Life Orientation and take best 6
    const eligibleSubjects = subjectResults.filter(
      (s) => s.subject !== 'Life Orientation'
    );
    const sorted = [...eligibleSubjects].sort((a, b) => b.achievementLevel - a.achievementLevel);
    const best6 = sorted.slice(0, 6);
    return best6.reduce((sum, s) => sum + s.achievementLevel, 0);
  };

  if (!isAuthenticated || !user) {
    return null; // Will redirect via useEffect
  }

  if (loading) {
    return (
      <DashboardLayout>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 400,
          }}
        >
          <CircularProgress />
        </Box>
      </DashboardLayout>
    );
  }

  if (error || !application) {
    return (
      <DashboardLayout>
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => router.push('/applications')}
            sx={{ mb: 2 }}
          >
            Back to Applications
          </Button>
          <Alert severity="error">{error || 'Application not found'}</Alert>
        </Box>
      </DashboardLayout>
    );
  }

  const student = application.student;
  const aps = calculateAPS(student.subjectResults);
  const alreadyDecided = !!application.decision;

  return (
    <DashboardLayout>
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push('/applications')}
          sx={{ mb: 2 }}
        >
          Back to Applications
        </Button>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            {student.firstName} {student.lastName}
          </Typography>
          <Chip
            label={application.status}
            color={getStatusColor(application.status)}
            sx={{ textTransform: 'capitalize' }}
          />
        </Box>

        <Typography variant="body1" color="text.secondary">
          {application.programmeName} • {application.facultyName}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Student Profile */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Student Profile
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body1">{student.email}</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Phone
                </Typography>
                <Typography variant="body1">{student.phone || 'N/A'}</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  ID Number
                </Typography>
                <Typography variant="body1">{student.idNumber}</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Date of Birth
                </Typography>
                <Typography variant="body1">
                  {new Date(student.dateOfBirth).toLocaleDateString('en-ZA')}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Gender
                </Typography>
                <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                  {student.gender}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Nationality
                </Typography>
                <Typography variant="body1">{student.nationality}</Typography>
              </Grid>

              {student.race && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Race
                  </Typography>
                  <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                    {student.race}
                  </Typography>
                </Grid>
              )}

              {student.homeLanguage && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Home Language
                  </Typography>
                  <Typography variant="body1">{student.homeLanguage}</Typography>
                </Grid>
              )}

              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Matric Year
                </Typography>
                <Typography variant="body1">{student.matricYear}</Typography>
              </Grid>

              {student.school && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    School
                  </Typography>
                  <Typography variant="body1">{student.school}</Typography>
                </Grid>
              )}

              {student.address && (
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    Address
                  </Typography>
                  <Typography variant="body1">
                    {student.address.street && `${student.address.street}, `}
                    {student.address.suburb && `${student.address.suburb}, `}
                    {student.address.city && `${student.address.city}, `}
                    {student.address.province && `${student.address.province}, `}
                    {student.address.postalCode}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Paper>

          {/* Subject Results */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Subject Results
              </Typography>
              <Chip
                label={`APS: ${aps}`}
                color="primary"
                sx={{ fontWeight: 600, fontSize: '1rem' }}
              />
            </Box>
            <Divider sx={{ mb: 2 }} />

            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Subject</TableCell>
                    <TableCell align="center">Mark (%)</TableCell>
                    <TableCell align="center">Achievement Level</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {student.subjectResults.map((subject) => (
                    <TableRow key={subject.id}>
                      <TableCell>{subject.subject}</TableCell>
                      <TableCell align="center">{subject.mark}</TableCell>
                      <TableCell align="center">{subject.achievementLevel}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {/* Uploaded Documents */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Uploaded Documents
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {student.documents.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                No documents uploaded
              </Typography>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {student.documents.map((doc) => (
                  <Card key={doc.id} variant="outlined">
                    <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {doc.fileName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {doc.type.replace('_', ' ').toUpperCase()} • Uploaded{' '}
                          {new Date(doc.uploadedAt).toLocaleDateString('en-ZA')}
                        </Typography>
                      </Box>
                      <IconButton
                        color="primary"
                        onClick={() => handleDownloadDocument(doc)}
                        title="Download"
                      >
                        <DownloadIcon />
                      </IconButton>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Application Info & Decision Panel */}
        <Grid item xs={12} md={4}>
          {/* Application Information */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Application Information
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  University Reference
                </Typography>
                <Typography variant="body1">
                  {application.universityReference || 'N/A'}
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary">
                  Submitted Date
                </Typography>
                <Typography variant="body1">
                  {application.submittedAt
                    ? new Date(application.submittedAt).toLocaleString('en-ZA', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : 'N/A'}
                </Typography>
              </Box>
            </Box>
          </Paper>

          {/* Decision Panel */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Decision
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {alreadyDecided ? (
              // Show existing decision
              <Box>
                <Alert
                  severity={application.decision === 'accepted' ? 'success' : 'error'}
                  icon={
                    application.decision === 'accepted' ? (
                      <CheckCircleIcon fontSize="inherit" />
                    ) : (
                      <CancelIcon fontSize="inherit" />
                    )
                  }
                  sx={{ mb: 2 }}
                >
                  <Typography variant="body1" sx={{ fontWeight: 600, textTransform: 'capitalize' }}>
                    {application.decision}
                  </Typography>
                </Alert>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    Reason
                  </Typography>
                  <Typography variant="body1">{application.decisionReason}</Typography>
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Decided on
                  </Typography>
                  <Typography variant="body1">
                    {application.decisionAt
                      ? new Date(application.decisionAt).toLocaleString('en-ZA', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : 'N/A'}
                  </Typography>
                </Box>
              </Box>
            ) : (
              // Decision form
              <Box>
                <FormControl component="fieldset" fullWidth sx={{ mb: 2 }}>
                  <FormLabel component="legend" sx={{ mb: 1 }}>
                    Select Decision
                  </FormLabel>
                  <RadioGroup
                    value={decision}
                    onChange={(e) => setDecision(e.target.value as 'accepted' | 'rejected')}
                  >
                    <FormControlLabel
                      value="accepted"
                      control={<Radio />}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CheckCircleIcon color="success" fontSize="small" />
                          <Typography>Accept</Typography>
                        </Box>
                      }
                    />
                    <FormControlLabel
                      value="rejected"
                      control={<Radio />}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CancelIcon color="error" fontSize="small" />
                          <Typography>Decline</Typography>
                        </Box>
                      }
                    />
                  </RadioGroup>
                </FormControl>

                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Reason (required)"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Provide a reason for your decision..."
                  sx={{ mb: 2 }}
                  helperText={`${reason.length}/500 characters`}
                  inputProps={{ maxLength: 500 }}
                />

                {submitError && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {submitError}
                  </Alert>
                )}

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={!decision || !reason.trim() || submitting}
                  onClick={() => setConfirmDialogOpen(true)}
                >
                  {submitting ? 'Submitting...' : 'Submit Decision'}
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onClose={() => !submitting && setConfirmDialogOpen(false)}>
        <DialogTitle>Confirm Decision</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to <strong>{decision}</strong> this application?
            <br />
            <br />
            This decision will be immediately visible to the student and cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)} disabled={submitting}>
            Cancel
          </Button>
          <Button
            onClick={handleDecisionSubmit}
            variant="contained"
            color={decision === 'accepted' ? 'success' : 'error'}
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : `Confirm ${decision}`}
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}
