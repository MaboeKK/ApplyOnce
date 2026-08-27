// packages/api/src/__tests__/jest.setup.ts
// Hard safety gate, run before every test file (see jest.config.js -> setupFiles).
// The suite does unfiltered `deleteMany({})` calls against real tables — this
// must abort immediately if there is any chance it's pointed at a real database.
//
// This must load .env.test itself (rather than relying on src/config, which
// isn't imported yet at this point) so the DATABASE_URL check below actually
// has something to check.
import dotenv from 'dotenv';

dotenv.config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });

if (process.env.NODE_ENV !== 'test') {
  throw new Error(
    `Refusing to run tests: NODE_ENV must be "test" (got ${JSON.stringify(
      process.env.NODE_ENV
    )}). This suite performs destructive bulk deletes and must never run against a dev/prod database.`
  );
}

const databaseUrl = process.env.DATABASE_URL || '';
const databaseName = databaseUrl.split('/').pop()?.split('?')[0] || '';

if (!/test/i.test(databaseName)) {
  const redacted = databaseUrl.replace(/:\/\/[^@]+@/, '://<redacted>@');
  throw new Error(
    `Refusing to run tests: DATABASE_URL does not point at a test database ` +
      `(the database name must contain "test", got "${databaseName}"). URL: ${redacted}. ` +
      `Copy packages/api/.env.test.example to packages/api/.env.test and point it at a dedicated test database.`
  );
}
