// packages/api/src/index.ts
// Server entry point

import app from './app';
import { config } from './config';
import { logger } from './utils/logger';
import { connectDatabase, disconnectDatabase } from './utils/prisma';

async function start() {
  try {
    // Connect to database
    await connectDatabase();

    // Start server
    const server = app.listen(config.port, '0.0.0.0', () => {
      logger.info(
        {
          port: config.port,
          env: config.env,
          apiDocs: `http://localhost:${config.port}/v1/docs`,
        },
        'ApplyOnce API server started'
      );
    });

    // Graceful shutdown
    const shutdown = async (signal: string) => {
      logger.info({ signal }, 'Shutdown signal received');
      server.close(async () => {
        logger.info('HTTP server closed');
        await disconnectDatabase();
        process.exit(0);
      });

      // Force shutdown after 10 seconds
      setTimeout(() => {
        logger.error('Forced shutdown after timeout');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (error) {
    logger.error({ error }, 'Failed to start server');
    process.exit(1);
  }
}

start();
