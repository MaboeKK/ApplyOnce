// packages/api/src/__tests__/application-retry.test.ts
// POST /v1/applications/:id/retry-submission

import request from 'supertest';
import app from '../app';
import { prisma } from '../utils/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config';

describe('POST /v1/applications/:id/retry-submission', () => {
  let studentToken: string;
  let studentId: string;
  let failedApplicationId: string;
  let draftApplicationId: string;
  let otherStudentToken: string;

  beforeAll(async () => {
    // Full-table wipe — safe only because src/__tests__/jest.setup.ts has
    // already aborted the whole run if DATABASE_URL isn't a dedicated test DB.
    await prisma.applicationEvent.deleteMany({});
    await prisma.application.deleteMany({});
    await prisma.student.deleteMany({ where: { email: { contains: 'test-retry' } } });

    const passwordHash = await bcrypt.hash('Test@1234', 10);

    // Deliberately missing phone/idNumber/dateOfBirth/etc so submitApplication's
    // own field validation fails deterministically, regardless of the mock
    // adapter's random failureRate.
    const student = await prisma.student.create({
      data: {
        email: 'test-retry-student@test.com',
        passwordHash,
        firstName: 'Test',
        lastName: 'Student',
        emailVerified: true,
      },
    });
    studentId = student.id;
    studentToken = jwt.sign({ role: 'student', studentId: student.id }, config.jwt.accessSecret, {
      expiresIn: '15m',
    });

    const otherStudent = await prisma.student.create({
      data: {
        email: 'test-retry-other@test.com',
        passwordHash,
        firstName: 'Other',
        lastName: 'Student',
        emailVerified: true,
      },
    });
    otherStudentToken = jwt.sign(
      { role: 'student', studentId: otherStudent.id },
      config.jwt.accessSecret,
      { expiresIn: '15m' }
    );

    const failedApp = await prisma.application.create({
      data: {
        studentId,
        universityId: 'uj',
        universityName: 'University of Johannesburg',
        programmeId: 'uj-bcom',
        programmeName: 'BCom',
        facultyName: 'Management',
        status: 'submission_failed',
        notes: 'Submission failed: original attempt',
      },
    });
    failedApplicationId = failedApp.id;

    const draftApp = await prisma.application.create({
      data: {
        studentId,
        universityId: 'wits',
        universityName: 'University of the Witwatersrand',
        programmeId: 'wits-bcom',
        programmeName: 'Bachelor of Commerce',
        facultyName: 'Commerce, Law & Management',
        status: 'draft',
      },
    });
    draftApplicationId = draftApp.id;
  });

  afterAll(async () => {
    await prisma.applicationEvent.deleteMany({});
    await prisma.application.deleteMany({});
    await prisma.student.deleteMany({ where: { email: { contains: 'test-retry' } } });
    await prisma.$disconnect();
  });

  it('returns 401 without authentication', async () => {
    const response = await request(app).post(
      `/v1/applications/${failedApplicationId}/retry-submission`
    );
    expect(response.status).toBe(401);
  });

  it('returns 404 for an unknown application', async () => {
    const response = await request(app)
      .post('/v1/applications/does-not-exist/retry-submission')
      .set('Cookie', [`accessToken=${studentToken}`]);
    expect(response.status).toBe(404);
  });

  it("returns 403 for another student's application", async () => {
    const response = await request(app)
      .post(`/v1/applications/${failedApplicationId}/retry-submission`)
      .set('Cookie', [`accessToken=${otherStudentToken}`]);
    expect(response.status).toBe(403);
  });

  it('returns 400 when the application is not in submission_failed state', async () => {
    const response = await request(app)
      .post(`/v1/applications/${draftApplicationId}/retry-submission`)
      .set('Cookie', [`accessToken=${studentToken}`]);
    expect(response.status).toBe(400);
  });

  it('actually re-attempts submission rather than silently no-op-ing (the bug this fixes)', async () => {
    const eventsBefore = await prisma.applicationEvent.count({
      where: { applicationId: failedApplicationId },
    });

    const response = await request(app)
      .post(`/v1/applications/${failedApplicationId}/retry-submission`)
      .set('Cookie', [`accessToken=${studentToken}`]);

    // Always 200 - the retry ran, even though it failed validation again
    // (the student fixture is deliberately incomplete). The client reads
    // application.status to see the outcome, rather than getting a 500.
    expect(response.status).toBe(200);
    expect(response.body.application.status).toBe('submission_failed');
    expect(response.body.application.notes).toContain('Missing');

    // Before the guard fix, workflows/submission.ts's status check treated
    // submission_failed as "already submitted" and returned immediately
    // without creating a new event or updating notes at all.
    const eventsAfter = await prisma.applicationEvent.count({
      where: { applicationId: failedApplicationId },
    });
    expect(eventsAfter).toBeGreaterThan(eventsBefore);

    const updated = await prisma.applicationEvent.findFirst({
      where: { applicationId: failedApplicationId },
      orderBy: { createdAt: 'desc' },
    });
    expect(updated?.fromStatus).toBe('submission_failed');
    expect(updated?.toStatus).toBe('submission_failed');
  });
});
