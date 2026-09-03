// packages/portal/src/pages/universities/[id].tsx
// Faculty + programme selection for a single university
// Shows qualifies (green/red) indicator and reach/match/safety chip per programme

import { useEffect, useMemo, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  Stack,
  Alert,
  CircularProgress,
  Snackbar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import api from '@/config/api';
import PortalNav from '@/components/Layout/PortalNav';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { getErrorMessage } from '@/utils/error-message';
import type { PortalApplication, ProgrammeMatch } from '@/types';
import type { University, Programme, ChoiceStrategy } from '@applyonce/shared';

const strategyColor: Record<ChoiceStrategy, 'error' | 'success' | 'primary' | 'warning'> = {
  reach: 'warning',
  match: 'primary',
  safety: 'success',
  not_qualified: 'error',
};

const strategyLabel: Record<ChoiceStrategy, string> = {
  reach: 'Aim high',
  match: 'Strong fit',
  safety: 'Secure',
  not_qualified: 'Does not qualify',
};

export default function UniversityDetailPage() {
  return (
    <ProtectedRoute>
      <UniversityDetailContent />
    </ProtectedRoute>
  );
}

function UniversityDetailContent() {
  const router = useRouter();
  const { id } = router.query;

  const [university, setUniversity] = useState<University | null>(null);
  const [matchByCode, setMatchByCode] = useState<Record<string, ProgrammeMatch>>({});
  const [hasAPS, setHasAPS] = useState<boolean | null>(null);
  const [existingApp, setExistingApp] = useState<PortalApplication | null>(null);
  const [loading, setLoading] = useState(true);
  const [addingCode, setAddingCode] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');
  const [expandedFaculties, setExpandedFaculties] = useState<Set<string>>(new Set());
  const mountedRef = useRef(true);

  useEffect(() => {
    if (!id) return;
    mountedRef.current = true;
    load();
    return () => {
      mountedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // The "already have an application here" gate is only as good as the last
  // fetch — if the student removes the draft from their cart in another tab
  // (or comes back to this page after a while), a stale existingApp would
  // wrongly keep blocking Add to Cart even though the cart is now empty.
  // Refresh it (without the full-page loading spinner) whenever the tab
  // regains focus, so it self-heals instead of requiring a manual reload.
  useEffect(() => {
    const refreshExistingApp = async () => {
      const universityId = Array.isArray(id) ? id[0] : id;
      if (!universityId) return;
      try {
        const appsRes = await api.get('/applications');
        if (!mountedRef.current) return;
        const existing = (appsRes.data.applications || []).find(
          (a: PortalApplication) =>
            a.universityId === universityId && ['draft', 'submitted'].includes(a.status)
        );
        setExistingApp(existing || null);
      } catch {
        // Best-effort background refresh — keep the last known state on failure.
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') refreshExistingApp();
    };

    window.addEventListener('focus', refreshExistingApp);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      window.removeEventListener('focus', refreshExistingApp);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [id]);

  const load = async () => {
    setLoading(true);
    const universityId = Array.isArray(id) ? id[0] : id;
    try {
      const [uniRes, appsRes] = await Promise.all([
        api.get(`/universities/${universityId}`),
        api.get('/applications'),
      ]);
      if (!mountedRef.current) return;
      setUniversity(uniRes.data.university);

      const existing = (appsRes.data.applications || []).find(
        (a: PortalApplication) =>
          a.universityId === universityId && ['draft', 'submitted'].includes(a.status)
      );
      setExistingApp(existing || null);

      try {
        const matchesRes = await api.get('/aps/matches');
        if (!mountedRef.current) return;
        const map: Record<string, ProgrammeMatch> = {};
        for (const m of (matchesRes.data.matches || []) as ProgrammeMatch[]) {
          if (m.universityId === universityId) {
            map[m.programmeCode] = m;
          }
        }
        setMatchByCode(map);
        setHasAPS(true);
      } catch {
        if (mountedRef.current) setHasAPS(false);
      }
    } catch (err) {
      if (mountedRef.current) setError(getErrorMessage(err, 'Failed to load university'));
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  };

  const programmesByFaculty = useMemo(() => {
    if (!university) return {};
    const groups: Record<string, Programme[]> = {};
    for (const p of university.programmes || []) {
      groups[p.faculty] = groups[p.faculty] || [];
      groups[p.faculty].push(p);
    }
    return groups;
  }, [university]);

  const handleAddToCart = async (programme: Programme) => {
    if (!university) return;
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
    } catch (err) {
      setError(getErrorMessage(err, 'Could not add this programme to your cart.'));
    } finally {
      setAddingCode(null);
    }
  };

  if (loading) {
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
          ← Back to universities
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
          <Alert
            severity={existingApp.status === 'submitted' ? 'success' : 'warning'}
            sx={{ mb: 3 }}
          >
            You already have {existingApp.status === 'submitted' ? 'a submitted' : 'a draft'}{' '}
            application to {university.name} for <strong>{existingApp.programmeName}</strong>.
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
          <Accordion
            key={faculty}
            expanded={expandedFaculties.has(faculty)}
            onChange={(_, isExpanded) => {
              setExpandedFaculties((prev) => {
                const next = new Set(prev);
                if (isExpanded) next.add(faculty);
                else next.delete(faculty);
                return next;
              });
            }}
            sx={{ mb: 2, '&:before': { display: 'none' } }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                sx={{ width: '100%', pr: 2 }}
              >
                <Typography variant="h6" color="primary" sx={{ flex: 1 }}>
                  {faculty}
                </Typography>
                <Chip
                  label={`${programmes.length} programme${programmes.length !== 1 ? 's' : ''}`}
                  size="small"
                />
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                {programmes.map((programme: Programme) => {
                  const match = matchByCode[programme.qualificationCode];
                  const qualifies =
                    match && (match.meetsRequirements || match.outcome === 'waitlist');
                  const disqualified =
                    match && !match.meetsRequirements && match.outcome !== 'waitlist';
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
                          {hasAPS &&
                            (qualifies ? (
                              <CheckCircleIcon color="success" fontSize="small" />
                            ) : disqualified ? (
                              <CancelIcon color="error" fontSize="small" />
                            ) : (
                              <HelpOutlineIcon color="disabled" fontSize="small" />
                            ))}
                          <Typography variant="subtitle1" fontWeight={600}>
                            {programme.name}
                          </Typography>
                        </Stack>
                        <Typography variant="caption" color="text.secondary" display="block">
                          {programme.qualificationType} · {programme.durationYears} year
                          {programme.durationYears > 1 ? 's' : ''}
                          {match &&
                            ` · Requires APS ${match.requiredAPS}, you have ${match.studentAPS}`}
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
                        {disqualified && (match?.missingRequirements?.length ?? 0) > 0 && (
                          <Typography
                            variant="caption"
                            color="error"
                            display="block"
                            sx={{ mt: 0.5 }}
                          >
                            Missing: {match?.missingRequirements?.join(', ')}
                          </Typography>
                        )}
                      </Box>
                      <Button
                        variant="contained"
                        disabled={!canAdd || addingCode === programme.qualificationCode}
                        onClick={() => handleAddToCart(programme)}
                      >
                        {addingCode === programme.qualificationCode ? 'Adding…' : 'Add to cart'}
                      </Button>
                    </Box>
                  );
                })}
              </Stack>
            </AccordionDetails>
          </Accordion>
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
