// packages/portal/src/pages/documents.tsx
// Document vault - view and manage uploaded documents

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  IconButton,
  Chip,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DescriptionIcon from '@mui/icons-material/Description';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import api from '@/config/api';
import PortalNav from '@/components/Layout/PortalNav';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { getErrorMessage } from '@/utils/error-message';
import type { PortalDocument } from '@/types';

const documentTypeLabels: Record<string, string> = {
  matric_certificate: 'Matric certificate',
  id_document: 'ID document',
  proof_of_residence: 'Proof of residence',
};

export default function DocumentsPage() {
  return (
    <ProtectedRoute>
      <DocumentsContent />
    </ProtectedRoute>
  );
}

function DocumentsContent() {
  const router = useRouter();
  const [documents, setDocuments] = useState<PortalDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    fetchDocuments();
    return () => {
      mountedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await api.get('/documents');
      if (!mountedRef.current) return;
      setDocuments(response.data.documents || []);
    } catch (err) {
      if (mountedRef.current) setError(getErrorMessage(err, 'Failed to load documents'));
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  };

  const handleUpload = async (type: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    try {
      await api.post('/documents/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      await fetchDocuments();
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to upload document'));
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this document?')) return;

    try {
      await api.delete(`/documents/${id}`);
      await fetchDocuments();
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to delete document'));
    }
  };

  const handleDownload = async (id: string, fileName: string) => {
    try {
      const response = await api.get(`/documents/${id}`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to download document'));
    }
  };

  const getDocumentByType = (type: string) => {
    return documents.find((doc) => doc.type === type);
  };

  const requiredTypes = ['matric_certificate', 'id_document'];

  if (loading) {
    return (
      <>
        <PortalNav />
        <Container maxWidth="lg" sx={{ py: 6, textAlign: 'center' }}>
          <CircularProgress />
        </Container>
      </>
    );
  }

  return (
    <>
      <PortalNav />
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Document vault
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Your uploaded documents. You need your matric certificate and ID to apply.
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        <Grid container spacing={2}>
          {requiredTypes.map((type) => {
            const doc = getDocumentByType(type);

            return (
              <Grid item xs={12} md={6} key={type}>
                <Card>
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 2,
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <DescriptionIcon color="primary" />
                        <Typography variant="h6">{documentTypeLabels[type]}</Typography>
                      </Box>
                      <Chip
                        label={doc ? 'Uploaded' : 'Required'}
                        color={doc ? 'success' : 'warning'}
                        size="small"
                      />
                    </Box>

                    {doc ? (
                      <Box>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {doc.fileName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                          <Button
                            size="small"
                            startIcon={<DownloadIcon />}
                            onClick={() => handleDownload(doc.id, doc.fileName)}
                          >
                            Download
                          </Button>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDelete(doc.id)}
                            aria-label={`Delete ${doc.fileName}`}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>

                        <Box sx={{ mt: 2 }}>
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => handleUpload(type, e)}
                            style={{ display: 'none' }}
                            id={`replace-${type}`}
                            disabled={uploading}
                          />
                          <label htmlFor={`replace-${type}`}>
                            <Button
                              component="span"
                              size="small"
                              variant="outlined"
                              disabled={uploading}
                            >
                              Replace
                            </Button>
                          </label>
                        </Box>
                      </Box>
                    ) : (
                      <Box>
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => handleUpload(type, e)}
                          style={{ display: 'none' }}
                          id={`upload-${type}`}
                          disabled={uploading}
                        />
                        <label htmlFor={`upload-${type}`}>
                          <Button
                            component="span"
                            variant="contained"
                            startIcon={<CloudUploadIcon />}
                            disabled={uploading}
                            fullWidth
                          >
                            {uploading ? 'Uploading...' : 'Upload'}
                          </Button>
                        </label>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            );
          })}

          {/* Proof of residence - optional */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 2,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DescriptionIcon color="primary" />
                    <Typography variant="h6">Proof of residence</Typography>
                  </Box>
                  <Chip label="Optional" size="small" />
                </Box>

                {(() => {
                  const doc = getDocumentByType('proof_of_residence');
                  return doc ? (
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {doc.fileName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}
                      </Typography>

                      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                        <Button
                          size="small"
                          startIcon={<DownloadIcon />}
                          onClick={() => handleDownload(doc.id, doc.fileName)}
                        >
                          Download
                        </Button>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(doc.id)}
                          aria-label={`Delete ${doc.fileName}`}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  ) : (
                    <Box>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleUpload('proof_of_residence', e)}
                        style={{ display: 'none' }}
                        id="upload-proof_of_residence"
                        disabled={uploading}
                      />
                      <label htmlFor="upload-proof_of_residence">
                        <Button
                          component="span"
                          variant="outlined"
                          startIcon={<CloudUploadIcon />}
                          disabled={uploading}
                          fullWidth
                        >
                          {uploading ? 'Uploading...' : 'Upload'}
                        </Button>
                      </label>
                    </Box>
                  );
                })()}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Button variant="outlined" onClick={() => router.push('/dashboard')}>
            Back to dashboard
          </Button>
        </Box>
      </Container>
    </>
  );
}
