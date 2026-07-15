// packages/portal/src/pages/universities/index.tsx
// University browser: search/filter all 26 universities, optional APS-match view

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Typography,
  TextField,
  MenuItem,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Stack,
  FormControlLabel,
  Switch,
  Alert,
  CircularProgress,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useAuthStore } from '@/store/auth';
import api from '@/config/api';
import PortalNav from '@/components/Layout/PortalNav';

interface University {
  id: string;
  name: string;
  shortName: string;
  applicationFee: number;
  feeNote?: string;
  type?: string;
  city?: string;
  province?: string;
  programmes: any[];
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

export default function UniversitiesPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [province, setProvince] = useState('all');
  const [apsToggle, setApsToggle] = useState(false);
  const [matchesByUni, setMatchesByUni] = useState<Record<string, any[]>>({});
  const [apsByUni, setApsByUni] = useState<Record<string, number>>({});
  const [matchesError, setMatchesError] = useState('');
  const [matchesLoading, setMatchesLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }
    api
      .get('/universities')
      .then((res) => setUniversities(res.data.universities || []))
      .finally(() => setLoading(false));
  }, [isAuthenticated, router]);

  const fetchMatches = async () => {
    setMatchesLoading(true);
    setMatchesError('');
    try {
      const res = await api.get('/aps/matches');
      const grouped: Record<string, any[]> = {};
      for (const m of res.data.matches || []) {
        grouped[m.universityId] = grouped[m.universityId] || [];
        grouped[m.universityId].push(m);
      }
      const apsMap: Record<string, number> = {};
      for (const b of res.data.universityAPS || []) {
        apsMap[b.universityId] = b.aps;
      }
      setMatchesByUni(grouped);
      setApsByUni(apsMap);
    } catch (err: any) {
      setMatchesError(
        err.response?.data?.error?.message ||
          'Upload your matric results to see which universities you qualify for.'
      );
      setApsToggle(false);
    } finally {
      setMatchesLoading(false);
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

  const filtered = universities.filter((u) => {
    const matchesSearch =
      !search ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.shortName.toLowerCase().includes(search.toLowerCase());
    const matchesProvince = province === 'all' || u.province === province;
    return matchesSearch && matchesProvince;
  });

  if (!isAuthenticated || loading) return null;

  return (
    <>
      <PortalNav />
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom>
          Browse Universities
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          All 26 South African public universities in one place. Add programmes to your cart and
          apply to all of them with a single payment.
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
          <TextField
            placeholder="Search by university name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            select
            label="Province"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            sx={{ minWidth: 220 }}
          >
            <MenuItem value="all">All provinces</MenuItem>
            {provinces.map((p) => (
              <MenuItem key={p} value={p}>
                {p.replace(/_/g, ' ')}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        <FormControlLabel
          sx={{ mb: 3 }}
          control={
            <Switch checked={apsToggle} onChange={(e) => handleToggleAps(e.target.checked)} />
          }
          label={
            matchesLoading ? 'Checking your APS matches…' : 'Show my APS match for each university'
          }
        />

        {apsToggle && matchesError && (
          <Alert severity="info" sx={{ mb: 3 }}>
            {matchesError}
          </Alert>
        )}

        <Grid container spacing={3}>
          {filtered.map((uni) => {
            const uniMatches = matchesByUni[uni.id] || [];
            const qualifying = uniMatches.filter((m) => m.meetsRequirements || m.outcome === 'waitlist');
            const bestTier = ['safety', 'match', 'reach'].find((t) =>
              qualifying.some((m) => m.choiceStrategy === t)
            );

            return (
              <Grid item xs={12} sm={6} md={4} key={uni.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">{uni.shortName}</Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {uni.name}
                    </Typography>
                    {uni.city && (
                      <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mb: 1 }}>
                        <LocationOnIcon fontSize="small" color="disabled" />
                        <Typography variant="caption" color="text.secondary">
                          {uni.city}
                        </Typography>
                      </Stack>
                    )}
                    <Typography variant="caption" color="text.secondary" display="block">
                      {uni.programmes?.length || 0} programme{uni.programmes?.length === 1 ? '' : 's'} listed
                    </Typography>

                    {apsToggle && apsByUni[uni.id] !== undefined && (
                      <Chip
                        label={`Your APS here: ${apsByUni[uni.id]}`}
                        size="small"
                        color="primary"
                        variant="outlined"
                        sx={{ mt: 1, mr: 1 }}
                      />
                    )}
                    {apsToggle && bestTier && (
                      <Chip
                        label={`Best fit: ${strategyLabel[bestTier]}`}
                        size="small"
                        color={strategyColor[bestTier]}
                        sx={{ mt: 1 }}
                      />
                    )}
                    {apsToggle && uniMatches.length > 0 && qualifying.length === 0 && (
                      <Chip label="No qualifying programmes yet" size="small" color="error" sx={{ mt: 1 }} />
                    )}
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => router.push(`/universities/${uni.id}`)}>
                      View Programmes
                    </Button>
                  </CardActions>
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
      </Container>
    </>
  );
}
