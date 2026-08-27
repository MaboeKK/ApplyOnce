// packages/api/src/routes/index.ts
// Main router - mounts all route modules

import { Router } from 'express';
import authRoutes from './auth';
import studentsRoutes from './students';
import documentsRoutes from './documents';
import universitiesRoutes from './universities';
import apsRoutes from './aps';
import applicationsRoutes from './applications';
import paymentsRoutes from './payments';
import adminRoutes from './admin';
import { asyncHandler } from '../utils/asyncHandler';
import { prisma } from '../utils/prisma';
import { logger } from '../utils/logger';

const router = Router();

// Health check - a process manager/uptime check needs to know if the DB is
// actually reachable, not just that Express is up.
router.get(
  '/health',
  asyncHandler(async (_req, res) => {
    try {
      await prisma.$queryRaw`SELECT 1`;
    } catch (error) {
      logger.error({ error }, 'Health check: database unreachable');
      res.status(503).json({
        status: 'error',
        timestamp: new Date().toISOString(),
        service: 'applyonce-api',
        version: '0.1.0',
        database: 'unreachable',
      });
      return;
    }

    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'applyonce-api',
      version: '0.1.0',
      database: 'connected',
    });
  })
);

// Mount route modules
router.use('/auth', authRoutes);
router.use('/students', studentsRoutes);
router.use('/documents', documentsRoutes);
router.use('/universities', universitiesRoutes);
router.use('/aps', apsRoutes);
router.use('/applications', applicationsRoutes);
router.use('/payments', paymentsRoutes);
router.use('/admin', adminRoutes);

export default router;
