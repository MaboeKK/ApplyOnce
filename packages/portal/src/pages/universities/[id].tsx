// packages/portal/src/pages/universities/[id].tsx
// Faculty + programme selection for a single university
// Shows qualifies (green/red) indicator and reach/match/safety chip per programme

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Chip,
  Stack,
  Alert,
  CircularProgress,
  Divider,
  Snackbar,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useAuthStore } from '@/store/auth';
import api from '@/config/api';
import PortalNav from '@/components/Layout/PortalNav';

const strategyColor: Record<string, 'error' | 'success' | 'primary' | 'warning'> = {
  reach: 'warning',
  match: 'primary',
  safety: 'success',
};

const strategyLabel: Record<string, string> = {
  reach: 'Aim high',
  match: 'Strong fit',
  safety: 'Secure',
};

export default function UniversityDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { isAuthenticated } = useAuthStore();

  const [university, setUniversity] = useState<any>(null);
  const [matchByCode, setMatchByCode] = useState<Record<string, any>>({});
  const [hasAPS, setHasAPS] = useState<boolean | null>(null);
  const [existingApp, setExistingApp] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [addingCode, setAddingCode] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }
    if (!id) return;
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, id]);

  const load = async () => {
    setLoading(true);
    try {
      const [uniRes, appsRes] = await Promise.all([
        api.get(`/universities/${id}`),
        api.get('/applications'),
      ]);
      setUniversity(uniRes.data.university);

      const existing = (appsRes.data.applications || []).find(
        (a: any) => a.universityId === id && ['draft', 'submitted'].includes(a.status)
      );
      setExistingApp(existing || null);

      try {
        const matchesRes = await api.get('/aps/matches');
        const map: Record<string, any> = {};
        for (const m of matchesRes.data.matches || []) {
          if (m.universityId === id) {
            map[m.programmeCode] = m;
          }
        }
        setMatchByCode(map);
        setHasAPS(true);
      } catch {
        setHasAPS(false);
      }
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to load university');
    } finally {
      setLoading(false);
    }
  };

  const programmesByFaculty = useMemo(() => {
    if (!university) return {};
    const groups: Record<string, any[]> = {};
    for (const p of university.programmes || []) {
      groups[p.faculty] = groups[p.faculty] || [];
      groups[p.faculty].push(p);
    }
    return groups;
  }, [university]);

  const handleAddToCart = async (programme: any) => {
    setAddingCode(programme.qualificationCode);
    setError('');
    try {
      await api.post('/applications', {
        universityId: university.id,
        universityName: university.name,
        programmeId: programme.qualificationCode,
        programmeName: programme.name,
        facultyName: programme.faculty,
      });
      setToast(`${programme.name} added to your cart.`);
      await load();
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Could not add this programme to your cart.');
    } finally {
      setAddingCode(null);
    }
  };

  if (!isAuthenticated || loading) {
    return (
      <>
        <PortalNav />
        <Container sx={{ py: 8, textAlign: 'center' }}>
          <CircularProgress />
        </Container>
      </>
    );
  }

  if (!university) {
    return (
      <>
        <PortalNav />
        <Container sx={{ py: 8 }}>
          <Alert severity="error">University not found.</Alert>
        </Container>
      </>
    );
  }

  return (
    <>
      <PortalNav />
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Button onClick={() => router.push('/universities')} sx={{ mb: 2 }}>
          ← Back to Universities
        </Button>

        <Typography variant="h4" gutterBottom>
          {university.name}
        </Typography>
        {university.feeNote && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {university.feeNote}
          </Typography>
        )}

        {hasAPS === false && (
          <Alert severity="info" sx={{ mb: 3 }}>
            Upload your matric results to see whether you qualify for each programme below.
          </Alert>
        )}

        {existingApp && (
          <Alert severity={existingApp.status === 'submitted' ? 'success' : 'warning'} sx={{ mb: 3 }}>
            You already have {existingApp.status === 'submitted' ? 'a submitted' : 'a draft'} application
            to {university.name} for <strong>{existingApp.programmeName}</strong>.
            {existingApp.status === 'draft' &&
              ' Remove it from your cart first if you want to choose a different programme here.'}
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {Object.entries(programmesByFaculty).map(([faculty, programmes]) => (
          <Paper key={faculty} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              {faculty}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Stack spacing={2}>
              {programmes.map((programme: any) => {
                const match = matchByCode[programme.qualificationCode];
                const qualifies = match && (match.meetsRequirements || match.outcome === 'waitlist');
                const disqualified = match && !match.meetsRequirements && match.outcome !== 'waitlist';
                const canAdd = !existingApp && (!match || qualifies || hasAPS === false);

                return (
                  <Box
                    key={programme.qualificationCode}
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      justifyContent: 'space-between',
                      alignItems: { sm: 'center' },
                      gap: 2,
                      p: 2,
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        {hasAPS && (
                          qualifies ? (
                            <CheckCircleIcon color="success" fontSize="small" />
                          ) : disqualified ? (
                            <CancelIcon color="error" fontSize="small" />
                          ) : (
                            <HelpOutlineIcon color="disabled" fontSize="small" />
                          )
                        )}
                        <Typography variant="subtitle1" fontWeight={600}>
                          {programme.name}
                        </Typography>
                      </Stack>
                      <Typography variant="caption" color="text.secondary" display="block">
                        {programme.qualificationType} · {programme.durationYears} year
                        {programme.durationYears > 1 ? 's' : ''}
                        {match && ` · Requires APS ${match.requiredAPS}, you have ${match.studentAPS}`}
                      </Typography>
                      {programme.note && (
                        <Typography variant="caption" color="text.secondary" display="block">
                          {programme.note}
                        </Typography>
                      )}
                      {match?.choiceStrategy && strategyLabel[match.choiceStrategy] && (
                        <Chip
                          label={strategyLabel[match.choiceStrategy]}
                          size="small"
                          color={strategyColor[match.choiceStrategy]}
                          sx={{ mt: 1 }}
                        />
                      )}
                      {disqualified && match?.missingRequirements?.length > 0 && (
                        <Typography variant="caption" color="error" display="block" sx={{ mt: 0.5 }}>
                          Missing: {match.missingRequirements.join(', ')}
                        </Typography>
                      )}
                    </Box>
                    <Button
                      variant="contained"
                      disabled={!canAdd || addingCode === programme.qualificationCode}
                      onClick={() => handleAddToCart(programme)}
                    >
                      {addingCode === programme.qualificationCode ? 'Adding…' : 'Add to Cart'}
                    </Button>
                  </Box>
                );
              })}
            </Stack>
          </Paper>
        ))}

        {Object.keys(programmesByFaculty).length === 0 && (
          <Alert severity="info">No programmes listed for this university yet.</Alert>
        )}
      </Container>

      <Snackbar
        open={!!toast}
        autoHideDuration={4000}
        onClose={() => setToast('')}
        message={toast}
      />
    </>
  );
}
