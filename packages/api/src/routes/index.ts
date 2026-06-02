// packages/api/src/routes/index.ts
// Main router - mounts all route modules

import { Router } from 'express';
import authRoutes from './auth';
import studentsRoutes from './students';
import documentsRoutes from './documents';
import universitiesRoutes from './universities';
import apsRoutes from './aps';

const router = Router();

// Health check
router.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'applyonce-api',
    version: '0.1.0',
  });
});

// Mount route modules
router.use('/auth', authRoutes);
router.use('/students', studentsRoutes);
router.use('/documents', documentsRoutes);
router.use('/universities', universitiesRoutes);
router.use('/aps', apsRoutes);

export default router;
