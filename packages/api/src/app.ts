// packages/api/src/app.ts
// Express app with middleware stack

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import pinoHttp from 'pino-http';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { config } from './config';
import { logger } from './utils/logger';
import { errorHandler } from './middleware/errorHandler';
import router from './routes';
import { registerAllMockAdapters } from '@applyonce/shared';

// Register university adapters (mocks in dev/test, none in production until MOU signed)
if (process.env.NODE_ENV !== 'production') {
  registerAllMockAdapters();
  logger.info('Mock university adapters registered (non-production environment)');
} else {
  logger.warn('No real university adapters registered - production submissions will fail until MOU signed');
}

const app = express();

// Trust proxy (for rate limiting, IP detection)
app.set('trust proxy', 1);

// Security headers
app.use(helmet());

// CORS (allow portal + admin origins)
app.use(
  cors({
    origin: config.corsOrigins,
    credentials: true,
  })
);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Cookie parsing
app.use(cookieParser());

// HTTP request logging
app.use(
  pinoHttp({
    logger,
    autoLogging: {
      ignore: (req) => req.url === '/v1/health',
    },
  })
);

// Rate limiting (production only — dev/test traffic, especially React StrictMode's
// doubled effect calls, exhausts a per-IP budget meant to deter abuse, not browsing)
if (config.env === 'production') {
  const limiter = rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.maxRequests,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (_req, res) => {
      res.status(429).json({
        message: 'Too many requests, please try again later',
        code: 'RATE_LIMIT_EXCEEDED',
      });
    },
  });
  app.use(limiter);
} else {
  logger.info('Rate limiting disabled (non-production environment)');
}

// Swagger documentation
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ApplyOnce API',
      version: '0.1.0',
      description:
        'Backend API for ApplyOnce - Apply to all SA universities in one go',
    },
    servers: [
      {
        url: `http://localhost:${config.port}/v1`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'accessToken',
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Mount API routes
app.use('/v1', router);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    message: 'Route not found',
    code: 'NOT_FOUND',
  });
});

// Global error handler (must be last)
app.use(errorHandler);

export default app;
