// packages/portal/src/pages/universities/index.tsx
// University browser: search/filter all 26 universities, optional APS-match view

import { useEffect, useMemo, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Typography,
  TextField,
  MenuItem,
  Grid,
  Card,
  Button,
  Chip,
  Stack,
  Alert,
  CircularProgress,
  InputAdornment,
  Tooltip,
  IconButton,
  Menu,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ReplayIcon from '@mui/icons-material/Replay';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import LanguageIcon from '@mui/icons-material/Language';
import api from '@/config/api';
import PortalNav from '@/components/Layout/PortalNav';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { getErrorMessage } from '@/utils/error-message';
import type { ProgrammeMatch, PortalApplication } from '@/types';
import type { Programme } from '@applyonce/shared';

interface University {
  id: string;
  name: string;
  shortName: string;
  applicationFee: number;
  feeNote?: string;
  type?: string;
  city?: string;
  province?: string;
  programmes: Programme[];
  applyUrl?: string;
  website?: string;
  logoUrl?: string;
}

const strategyColor: Record<string, 'error' | 'success' | 'primary' | 'warning'> = {
  reach: 'warning',
  match: 'primary',
  safety: 'success',
  not_qualified: 'error',
};

const strategyLabel: Record<string, string> = {
  reach: 'Aim high',
  match: 'Strong fit',
  safety: 'Secure',
};

// Page-scoped colour tokens matching the requested restyle direction.
const brand = {
  purple: '#5B32D6',
  purpleDark: '#4930D8',
  navy: '#17213A',
  secondaryText: '#526078',
  mutedText: '#7B8497',
  border: '#E4E7EF',
  purpleSurface: '#F2EDFF',
  pageBg: '#FAFBFF',
  success: '#15966B',
};

type SortOption = 'name-asc' | 'name-desc' | 'programmes-desc';

export default function UniversitiesPage() {
  return (
    <ProtectedRoute>
      <UniversitiesContent />
    </ProtectedRoute>
  );
}

function UniversitiesContent() {
  const router = useRouter();
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [province, setProvince] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');
  const [apsToggle, setApsToggle] = useState(false);
  const [matchesByUni, setMatchesByUni] = useState<Record<string, ProgrammeMatch[]>>({});
  const [apsByUni, setApsByUni] = useState<Record<string, number>>({});
  const [matchesError, setMatchesError] = useState('');
  const [matchesLoading, setMatchesLoading] = useState(false);
  const [draftApplications, setDraftApplications] = useState<PortalApplication[]>([]);
  const [cardMenu, setCardMenu] = useState<{ el: HTMLElement; uni: University } | null>(null);
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    api
      .get('/universities')
      .then((res) => {
        if (mountedRef.current) setUniversities(res.data.universities || []);
      })
      .finally(() => {
        if (mountedRef.current) setLoading(false);
      });

    api
      .get('/applications')
      .then((res) => {
        if (!mountedRef.current) return;
        const drafts = (res.data.applications || []).filter(
          (a: PortalApplication) => a.status === 'draft'
        );
        setDraftApplications(drafts);
      })
      .catch(() => {});

    return () => {
      mountedRef.current = false;
    };
  }, []);

  const fetchMatches = async () => {
    setMatchesLoading(true);
    setMatchesError('');
    try {
      const res = await api.get('/aps/matches');
      if (!mountedRef.current) return;
      const grouped: Record<string, ProgrammeMatch[]> = {};
      for (const m of (res.data.matches || []) as ProgrammeMatch[]) {
        grouped[m.universityId] = grouped[m.universityId] || [];
        grouped[m.universityId].push(m);
      }
      const apsMap: Record<string, number> = {};
      for (const b of res.data.universityAPS || []) {
        apsMap[b.universityId] = b.aps;
      }
      setMatchesByUni(grouped);
      setApsByUni(apsMap);
    } catch (err) {
      if (!mountedRef.current) return;
      setMatchesError(
        getErrorMessage(
          err,
          'Upload your matric results to see which universities you qualify for.'
        )
      );
      setApsToggle(false);
    } finally {
      if (mountedRef.current) setMatchesLoading(false);
    }
  };

  const handleToggleAps = (checked: boolean) => {
    setApsToggle(checked);
    if (checked && Object.keys(matchesByUni).length === 0) {
      fetchMatches();
    }
  };

  const provinces = useMemo(() => {
    const set = new Set(universities.map((u) => u.province).filter(Boolean) as string[]);
    return Array.from(set).sort();
  }, [universities]);

  const filtered = useMemo(() => {
    const result = universities.filter((u) => {
      const matchesSearch =
        !search ||
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.shortName.toLowerCase().includes(search.toLowerCase());
      const matchesProvince = province === 'all' || u.province === province;
      return matchesSearch && matchesProvince;
    });

    const sorted = [...result];
    switch (sortBy) {
      case 'name-desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'programmes-desc':
        sorted.sort((a, b) => (b.programmes?.length || 0) - (a.programmes?.length || 0));
        break;
      case 'name-asc':
      default:
        sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
    return sorted;
  }, [universities, search, province, sortBy]);

  const totalProgrammes = useMemo(
    () => universities.reduce((sum, u) => sum + (u.programmes?.length || 0), 0),
    [universities]
  );

  const cartUniversityCount = useMemo(
    () => new Set(draftApplications.map((a) => a.universityId)).size,
    [draftApplications]
  );

  const hasActiveFilters = search !== '' || province !== 'all';
  const clearFilters = () => {
    setSearch('');
    setProvince('all');
  };

  if (loading) return null;

  return (
    <>
      <PortalNav />
      <Box sx={{ bgcolor: brand.pageBg, minHeight: '100vh' }}>
        <Container
          maxWidth={false}
          sx={{ maxWidth: 1400, mx: 'auto', px: { xs: 2.5, md: 6.5 }, py: { xs: 3, md: 3.5 } }}
        >
          {/* Hero */}
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={3}
            alignItems={{ md: 'center' }}
            justifyContent="space-between"
            sx={{ mb: 4 }}
          >
            <Box sx={{ maxWidth: 640 }}>
              <Typography
                sx={{
                  fontSize: { xs: 28, md: 36 },
                  fontWeight: 700,
                  color: brand.navy,
                  lineHeight: 1.2,
                }}
              >
                Find your university
              </Typography>
              <Typography sx={{ fontSize: 15, lineHeight: 1.5, color: brand.secondaryText, mt: 1 }}>
                Explore South Africa&apos;s public universities and add programmes to your
                application.
              </Typography>

              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ mt: 2.5, flexWrap: 'wrap', rowGap: 1 }}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <AccountBalanceIcon sx={{ color: brand.purple, fontSize: 20 }} />
                  <Typography sx={{ fontSize: 14, color: brand.navy, fontWeight: 600 }}>
                    {universities.length}
                  </Typography>
                  <Typography sx={{ fontSize: 14, color: brand.mutedText }}>
                    universities
                  </Typography>
                </Stack>
                <Box sx={{ width: '1px', height: 16, bgcolor: brand.border }} />
                <Stack direction="row" spacing={1} alignItems="center">
                  <MenuBookIcon sx={{ color: brand.purple, fontSize: 20 }} />
                  <Typography sx={{ fontSize: 14, color: brand.navy, fontWeight: 600 }}>
                    {totalProgrammes}
                  </Typography>
                  <Typography sx={{ fontSize: 14, color: brand.mutedText }}>programmes</Typography>
                </Stack>
                <Box sx={{ width: '1px', height: 16, bgcolor: brand.border }} />
                <Stack direction="row" spacing={1} alignItems="center">
                  <CheckCircleOutlineIcon sx={{ color: brand.purple, fontSize: 20 }} />
                  <Typography sx={{ fontSize: 14, color: brand.mutedText }}>Apply once</Typography>
                </Stack>
              </Stack>
            </Box>

            {/* Application summary card */}
            <Box
              sx={{
                bgcolor: '#fff',
                border: `1px solid ${brand.border}`,
                borderRadius: '14px',
                boxShadow: '0 4px 16px rgba(30, 35, 70, 0.06)',
                p: 2.5,
                minWidth: { md: 300 },
                width: { xs: '100%', md: 'auto' },
                flexShrink: 0,
              }}
            >
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                onClick={() => router.push('/cart')}
                sx={{ cursor: 'pointer' }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '10px',
                    bgcolor: brand.purpleSurface,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <AssignmentOutlinedIcon sx={{ color: brand.purple, fontSize: 20 }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontSize: 14, fontWeight: 700, color: brand.navy }}>
                    Your application
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: brand.mutedText }}>
                    {cartUniversityCount}{' '}
                    {cartUniversityCount === 1 ? 'university' : 'universities'} •{' '}
                    {draftApplications.length}{' '}
                    {draftApplications.length === 1 ? 'programme' : 'programmes'}
                  </Typography>
                </Box>
                <ChevronRightIcon sx={{ color: brand.mutedText }} />
              </Stack>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => router.push('/cart')}
                sx={{
                  mt: 2,
                  color: brand.purple,
                  borderColor: brand.purple,
                  '&:hover': { borderColor: brand.purpleDark, bgcolor: brand.purpleSurface },
                }}
              >
                View application
              </Button>
            </Box>
          </Stack>

          {/* Search + filter panel */}
          <Box
            sx={{
              bgcolor: '#fff',
              border: `1px solid ${brand.border}`,
              borderRadius: '14px',
              boxShadow: '0 4px 14px rgba(30,35,70,0.04)',
              p: 2.75,
              mb: 4,
            }}
          >
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <TextField
                placeholder="Search universities..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: brand.mutedText }} />
                    </InputAdornment>
                  ),
                  sx: {
                    height: 54,
                    borderRadius: '10px',
                    '& fieldset': { borderColor: brand.border },
                    '&.Mui-focused fieldset': {
                      borderColor: `${brand.purple} !important`,
                      boxShadow: `0 0 0 3px ${alpha(brand.purple, 0.1)}`,
                    },
                  },
                }}
              />
              <TextField
                select
                label="Province"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                sx={{
                  minWidth: 220,
                  '& .MuiInputBase-root': { height: 54, borderRadius: '10px' },
                  '& fieldset': { borderColor: brand.border },
                }}
              >
                <MenuItem value="all">All provinces</MenuItem>
                {provinces.map((p) => (
                  <MenuItem key={p} value={p}>
                    {p.replace(/_/g, ' ')}
                  </MenuItem>
                ))}
              </TextField>

              <Stack direction="row" alignItems="center" spacing={0.5} sx={{ minWidth: 220 }}>
                <TextField
                  select
                  fullWidth
                  label="APS eligibility"
                  value={apsToggle ? 'matches' : 'all'}
                  onChange={(e) => handleToggleAps(e.target.value === 'matches')}
                  sx={{
                    '& .MuiInputBase-root': { height: 54, borderRadius: '10px' },
                    '& fieldset': { borderColor: brand.border },
                  }}
                >
                  <MenuItem value="all">Show all universities</MenuItem>
                  <MenuItem value="matches">Show my APS matches</MenuItem>
                </TextField>
                <Tooltip title="Uses your uploaded matric results to check which programmes you qualify for.">
                  <IconButton
                    size="small"
                    sx={{ color: brand.mutedText }}
                    aria-label="How APS matching works"
                  >
                    <InfoOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>

              {hasActiveFilters && (
                <Button
                  onClick={clearFilters}
                  startIcon={<ReplayIcon fontSize="small" />}
                  variant="outlined"
                  sx={{
                    color: brand.secondaryText,
                    borderColor: brand.border,
                    whiteSpace: 'nowrap',
                  }}
                >
                  Clear filters
                </Button>
              )}
            </Stack>

            {matchesLoading && (
              <Typography sx={{ fontSize: 13, color: brand.mutedText, mt: 1.5 }}>
                Checking your APS matches…
              </Typography>
            )}
            {apsToggle && matchesError && (
              <Alert severity="info" sx={{ mt: 2 }}>
                {matchesError}
              </Alert>
            )}

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              alignItems={{ sm: 'center' }}
              spacing={1.5}
              sx={{ mt: 2.5 }}
            >
              <Box>
                <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                  <Typography sx={{ fontSize: 13, color: brand.mutedText }}>
                    Active filters:
                  </Typography>
                  {search && (
                    <Chip
                      label={`"${search}"`}
                      size="small"
                      onDelete={() => setSearch('')}
                      deleteIcon={<CloseIcon />}
                      sx={{
                        bgcolor: brand.purpleSurface,
                        color: brand.purple,
                        border: '1px solid #ddd2ff',
                        fontWeight: 500,
                      }}
                    />
                  )}
                  <Chip
                    label={province === 'all' ? 'All provinces' : province.replace(/_/g, ' ')}
                    size="small"
                    onDelete={() => setProvince('all')}
                    deleteIcon={<CloseIcon />}
                    sx={{
                      bgcolor: brand.purpleSurface,
                      color: brand.purple,
                      border: '1px solid #ddd2ff',
                      fontWeight: 500,
                      textTransform: 'capitalize',
                    }}
                  />
                </Stack>
              </Box>

              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={1.5}
                alignItems={{ sm: 'center' }}
              >
                <Typography sx={{ fontSize: 13, color: brand.mutedText }}>
                  {filtered.length} {filtered.length === 1 ? 'university' : 'universities'} found
                </Typography>
                <TextField
                  select
                  size="small"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  label="Sort by"
                  sx={{ minWidth: 170, '& .MuiInputBase-root': { borderRadius: '8px' } }}
                >
                  <MenuItem value="name-asc">Name A–Z</MenuItem>
                  <MenuItem value="name-desc">Name Z–A</MenuItem>
                  <MenuItem value="programmes-desc">Most programmes</MenuItem>
                </TextField>
              </Stack>
            </Stack>
          </Box>

          {/* University grid */}
          <Grid container spacing={2.5}>
            {filtered.map((uni) => {
              const uniMatches = matchesByUni[uni.id] || [];
              const qualifying = uniMatches.filter(
                (m) => m.meetsRequirements || m.outcome === 'waitlist'
              );
              const qualifies = apsToggle && uniMatches.length > 0 && qualifying.length > 0;
              const doesNotQualify = apsToggle && uniMatches.length > 0 && qualifying.length === 0;
              const minRequiredAPS = uniMatches.length
                ? Math.min(...uniMatches.map((m) => m.requiredAPS))
                : null;
              const bestTier = ['safety', 'match', 'reach'].find((t) =>
                qualifying.some((m) => m.choiceStrategy === t)
              );

              return (
                <Grid item xs={12} sm={6} lg={4} key={uni.id}>
                  <Card
                    role="button"
                    tabIndex={0}
                    onClick={() => router.push(`/universities/${uni.id}`)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        router.push(`/universities/${uni.id}`);
                      }
                    }}
                    aria-label={`View programmes for ${uni.name}`}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      p: 2.5,
                      cursor: 'pointer',
                      position: 'relative',
                      border: `1px solid ${brand.border}`,
                      borderRadius: '14px',
                      boxShadow: '0 3px 12px rgba(20, 25, 50, 0.045)',
                      transition:
                        'transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        borderColor: '#d8ccff',
                        boxShadow: '0 8px 24px rgba(70,45,160,0.08)',
                      },
                      '&:hover .view-programmes-arrow': { transform: 'translateX(3px)' },
                      '&:focus-visible': { outline: `2px solid ${brand.purple}`, outlineOffset: 2 },
                    }}
                  >
                    {(uni.applyUrl || uni.website) && (
                      <IconButton
                        size="small"
                        aria-label={`More actions for ${uni.shortName}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCardMenu({ el: e.currentTarget, uni });
                        }}
                        sx={{ position: 'absolute', top: 10, right: 10, color: brand.mutedText }}
                      >
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    )}

                    <Stack direction="row" spacing={1.5} alignItems="flex-start" sx={{ mb: 1.5 }}>
                      <Box
                        sx={{
                          width: 76,
                          height: 76,
                          borderRadius: '12px',
                          bgcolor: '#fff',
                          border: `1px solid ${brand.border}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          overflow: 'hidden',
                        }}
                      >
                        {uni.logoUrl ? (
                          <Box
                            component="img"
                            src={uni.logoUrl}
                            alt={`${uni.name} logo`}
                            sx={{ width: '100%', height: '100%', objectFit: 'contain', p: 0.75 }}
                          />
                        ) : (
                          <Typography
                            role="img"
                            aria-label={`${uni.shortName} logo`}
                            sx={{ fontWeight: 700, fontSize: 18, color: brand.purple }}
                          >
                            {uni.shortName.slice(0, 3).toUpperCase()}
                          </Typography>
                        )}
                      </Box>
                      <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Typography
                          sx={{ fontSize: 16, fontWeight: 700, color: brand.navy }}
                          noWrap
                        >
                          {uni.shortName}
                        </Typography>
                        <Typography sx={{ fontSize: 14, color: brand.secondaryText }}>
                          {uni.name}
                        </Typography>
                        {uni.city && (
                          <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt: 0.5 }}>
                            <LocationOnIcon sx={{ fontSize: 15, color: brand.mutedText }} />
                            <Typography sx={{ fontSize: 12, color: brand.mutedText }}>
                              {uni.city}
                            </Typography>
                          </Stack>
                        )}
                      </Box>
                    </Stack>

                    <Box
                      sx={{
                        display: 'flex',
                        border: `1px solid ${brand.border}`,
                        borderRadius: '10px',
                        overflow: 'hidden',
                        mb: 2,
                        flexGrow: 1,
                      }}
                    >
                      <Box
                        sx={{
                          flex: '0 0 40%',
                          p: 1.5,
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography
                          sx={{ fontSize: 22, fontWeight: 700, color: brand.purple, lineHeight: 1 }}
                        >
                          {uni.programmes?.length || 0}
                        </Typography>
                        <Typography sx={{ fontSize: 12, color: brand.navy }}>
                          programme{uni.programmes?.length === 1 ? '' : 's'}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          flex: 1,
                          p: 1.5,
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          borderLeft: `1px solid ${brand.border}`,
                          bgcolor: qualifies
                            ? '#f3faf7'
                            : doesNotQualify
                              ? alpha('#F43F5E', 0.05)
                              : 'transparent',
                        }}
                      >
                        {qualifies ? (
                          <>
                            <Stack direction="row" spacing={0.5} alignItems="center">
                              <CheckCircleIcon sx={{ fontSize: 15, color: brand.success }} />
                              <Typography sx={{ fontSize: 12, fontWeight: 600, color: brand.navy }}>
                                APS Match
                              </Typography>
                            </Stack>
                            <Typography
                              sx={{ fontSize: 12, color: brand.success, fontWeight: 500 }}
                            >
                              {bestTier ? strategyLabel[bestTier] : 'You qualify'}
                            </Typography>
                          </>
                        ) : doesNotQualify ? (
                          <>
                            <Stack direction="row" spacing={0.5} alignItems="center">
                              <ErrorOutlineIcon sx={{ fontSize: 15, color: '#F43F5E' }} />
                              <Typography sx={{ fontSize: 12, fontWeight: 600, color: brand.navy }}>
                                APS Match
                              </Typography>
                            </Stack>
                            <Typography sx={{ fontSize: 12, color: '#F43F5E', fontWeight: 500 }}>
                              {minRequiredAPS
                                ? `APS ${minRequiredAPS} required`
                                : 'Below requirements'}
                            </Typography>
                          </>
                        ) : (
                          <Typography sx={{ fontSize: 12, color: brand.mutedText }}>
                            {matchesLoading
                              ? 'Checking…'
                              : apsToggle
                                ? 'Admission requirements not listed yet'
                                : 'Enable APS matching to check eligibility'}
                          </Typography>
                        )}
                      </Box>
                    </Box>

                    <Stack
                      direction="row"
                      spacing={0.5}
                      alignItems="center"
                      justifyContent="center"
                      sx={{ color: brand.purple, fontWeight: 600, fontSize: 14 }}
                    >
                      <span>View programmes</span>
                      <ArrowForwardIcon
                        className="view-programmes-arrow"
                        sx={{ fontSize: 16, transition: 'transform 160ms ease' }}
                      />
                    </Stack>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          {filtered.length === 0 && (
            <Alert severity="info" sx={{ mt: 4 }}>
              No universities match your search.
            </Alert>
          )}

          {/* Info banner */}
          <Box
            sx={{
              mt: 4,
              mb: 4,
              bgcolor: '#fff',
              border: `1px solid ${brand.border}`,
              borderRadius: '14px',
              p: 3,
              display: 'flex',
              alignItems: { xs: 'flex-start', sm: 'center' },
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
            }}
          >
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: '10px',
                  bgcolor: brand.purpleSurface,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <SchoolIcon sx={{ color: brand.purple }} />
              </Box>
              <Box>
                <Typography sx={{ fontSize: 15, fontWeight: 700, color: brand.navy }}>
                  Apply to multiple universities with one application
                </Typography>
                <Typography sx={{ fontSize: 13, color: brand.secondaryText, mt: 0.5 }}>
                  Add programmes from different universities to your cart and submit a single
                  application.
                </Typography>
              </Box>
            </Stack>
            <Button
              onClick={() => setHowItWorksOpen(true)}
              endIcon={<ArrowForwardIcon />}
              sx={{
                bgcolor: brand.purple,
                color: '#fff',
                flexShrink: 0,
                whiteSpace: 'nowrap',
                '&:hover': { bgcolor: brand.purpleDark },
              }}
            >
              How it works
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Per-card actions menu — uses each university's real applyUrl/website */}
      <Menu anchorEl={cardMenu?.el} open={!!cardMenu} onClose={() => setCardMenu(null)}>
        {cardMenu?.uni.applyUrl && (
          <MenuItem
            onClick={() => {
              window.open(cardMenu.uni.applyUrl, '_blank', 'noopener,noreferrer');
              setCardMenu(null);
            }}
          >
            <ListItemIcon>
              <OpenInNewIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Visit application portal</ListItemText>
          </MenuItem>
        )}
        {cardMenu?.uni.website && cardMenu.uni.website !== cardMenu.uni.applyUrl && (
          <MenuItem
            onClick={() => {
              window.open(cardMenu.uni.website, '_blank', 'noopener,noreferrer');
              setCardMenu(null);
            }}
          >
            <ListItemIcon>
              <LanguageIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Visit university website</ListItemText>
          </MenuItem>
        )}
      </Menu>

      {/* How it works */}
      <Dialog
        open={howItWorksOpen}
        onClose={() => setHowItWorksOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700 }}>How ApplyOnce works</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {[
              [
                '1. Complete your profile',
                'Add your personal, address, guardian and school details once.',
              ],
              [
                '2. Upload your matric results',
                'We calculate your APS automatically from your results.',
              ],
              [
                '3. Browse and add programmes',
                'Add programmes from as many universities as you like to your cart.',
              ],
              [
                '4. Pay once, submit to all',
                'One payment submits every application in your cart simultaneously.',
              ],
              [
                '5. Track every decision',
                'Follow each application’s status from your dashboard as universities respond.',
              ],
            ].map(([title, body]) => (
              <Box key={title}>
                <Typography sx={{ fontWeight: 700, fontSize: 14, color: brand.navy }}>
                  {title}
                </Typography>
                <Typography sx={{ fontSize: 13, color: brand.secondaryText }}>{body}</Typography>
              </Box>
            ))}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={() => setHowItWorksOpen(false)} sx={{ color: brand.purple }}>
            Got it
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
