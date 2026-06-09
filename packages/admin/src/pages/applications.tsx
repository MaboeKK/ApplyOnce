// packages/admin/src/pages/applications.tsx
// Applications inbox - table of all applications for this university

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Typography,
  Paper,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { useAuthStore } from '@/store/auth';
import api from '@/config/api';

interface Application {
  id: string;
  studentName: string;
  studentEmail: string;
  studentIdNumber: string;
  universityId: string;
  universityName: string;
  programmeId: string;
  programmeName: string;
  facultyName: string;
  status: string;
  decision: string | null;
  submittedAt: string;
  createdAt: string;
}

export default function ApplicationsPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Auth guard - redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, router]);

  // Fetch applications
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchApplications = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get('/admin/applications');
        setApplications(response.data.applications);
      } catch (err: any) {
        console.error('Error fetching applications:', err);
        setError(err.response?.data?.message || 'Failed to load applications');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [isAuthenticated]);

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

  const columns: GridColDef[] = [
    {
      field: 'studentName',
      headerName: 'Student Name',
      width: 200,
      sortable: true,
    },
    {
      field: 'studentIdNumber',
      headerName: 'ID Number',
      width: 150,
      sortable: true,
    },
    {
      field: 'programmeName',
      headerName: 'Programme',
      width: 300,
      sortable: true,
    },
    {
      field: 'facultyName',
      headerName: 'Faculty',
      width: 180,
      sortable: true,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      sortable: true,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getStatusColor(params.value)}
          size="small"
          sx={{ textTransform: 'capitalize' }}
        />
      ),
    },
    {
      field: 'submittedAt',
      headerName: 'Submitted',
      width: 150,
      sortable: true,
      valueFormatter: (params) => {
        if (!params) return 'N/A';
        return new Date(params).toLocaleDateString('en-ZA', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
      },
    },
  ];

  if (!isAuthenticated || !user) {
    return null; // Will redirect via useEffect
  }

  return (
    <DashboardLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
          Applications
        </Typography>
        <Typography variant="body1" color="text.secondary">
          All applications submitted to {user.universityName}
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ width: '100%', mb: 2 }}>
        {loading ? (
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
        ) : (
          <DataGrid
            rows={applications}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 25, page: 0 },
              },
              sorting: {
                sortModel: [{ field: 'submittedAt', sort: 'desc' }],
              },
            }}
            pageSizeOptions={[10, 25, 50, 100]}
            checkboxSelection={false}
            disableRowSelectionOnClick
            autoHeight
            sx={{
              '& .MuiDataGrid-cell:focus': {
                outline: 'none',
              },
              '& .MuiDataGrid-row': {
                cursor: 'pointer',
              },
            }}
          />
        )}
      </Paper>

      {!loading && applications.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No applications yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Applications submitted to {user.universityName} will appear here
          </Typography>
        </Box>
      )}
    </DashboardLayout>
  );
}
