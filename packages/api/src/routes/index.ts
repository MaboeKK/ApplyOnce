// packages/api/src/routes/index.ts
// Main router - mounts all route modules

import { Router } from 'express';
import authRoutes from './auth';

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

export default router;
