// packages/api/src/__tests__/admin.test.ts
// Tests for university admin API (isolation, inbox, decision)

import request from 'supertest';
import app from '../app';
import { prisma } from '../utils/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config';

describe('University Admin API', () => {
  let ujAdminToken: string;
  let witsAdminToken: string;
  let ujAdminId: string;
  let witsAdminId: string;
  let demoStudentId: string;
  let ujApplicationId: string;
  let witsApplicationId: string;

  beforeAll(async () => {
    // Clean up test data
    await prisma.applicationEvent.deleteMany({});
    await prisma.application.deleteMany({});
    await prisma.subjectResult.deleteMany({});
    await prisma.document.deleteMany({});
    await prisma.student.deleteMany({ where: { email: { contains: 'test-admin' } } });
    await prisma.universityAdmin.deleteMany({ where: { email: { contains: 'test-admin' } } });

    const passwordHash = await bcrypt.hash('Test@1234', 10);

    // Create UJ admin
    const ujAdmin = await prisma.universityAdmin.create({
      data: {
        email: 'test-admin-uj@test.com',
        passwordHash,
        name: 'UJ Test Admin',
        universityId: 'uj',
      },
    });
    ujAdminId = ujAdmin.id;

    // Create Wits admin
    const witsAdmin = await prisma.universityAdmin.create({
      data: {
        email: 'test-admin-wits@test.com',
        passwordHash,
        name: 'Wits Test Admin',
        universityId: 'wits',
      },
    });
    witsAdminId = witsAdmin.id;

    // Generate admin tokens
    ujAdminToken = jwt.sign(
      {
        role: 'university_admin',
        adminId: ujAdminId,
        universityId: 'uj',
        email: ujAdmin.email,
      },
      config.jwt.accessSecret,
      { expiresIn: '15m' }
    );

    witsAdminToken = jwt.sign(
      {
        role: 'university_admin',
        adminId: witsAdminId,
        universityId: 'wits',
        email: witsAdmin.email,
      },
      config.jwt.accessSecret,
      { expiresIn: '15m' }
    );

    // Create demo student
    const student = await prisma.student.create({
      data: {
        email: 'test-admin-student@test.com',
        passwordHash,
        firstName: 'Test',
        lastName: 'Student',
        emailVerified: true,
        idNumber: '0001015009088',
        phone: '0821234568',
        dateOfBirth: new Date('2000-01-01'),
        gender: 'male',
        race: 'african',
        nationality: 'South African',
        homeLanguage: 'english',
        matricYear: 2024,
        school: 'Test High School',
        address: {
          street: '1 Test Street',
          city: 'Johannesburg',
          province: 'gauteng',
          postalCode: '2000',
        },
      },
    });
    demoStudentId = student.id;

    // Add subject results
    await prisma.subjectResult.createMany({
      data: [
        { studentId: demoStudentId, subject: 'english_home', mark: 75, level: 6, year: 2024 },
        { studentId: demoStudentId, subject: 'mathematics', mark: 72, level: 6, year: 2024 },
        { studentId: demoStudentId, subject: 'accounting', mark: 82, level: 7, year: 2024 },
        { studentId: demoStudentId, subject: 'life_sciences', mark: 70, level: 6, year: 2024 },
        { studentId: demoStudentId, subject: 'physical_sciences', mark: 70, level: 6, year: 2024 },
        { studentId: demoStudentId, subject: 'business_studies', mark: 65, level: 5, year: 2024 },
        { studentId: demoStudentId, subject: 'life_orientation', mark: 75, level: 6, year: 2024 },
      ],
    });

    // Create submitted application for UJ
    const ujApp = await prisma.application.create({
      data: {
        studentId: demoStudentId,
        universityId: 'uj',
        universityName: 'University of Johannesburg',
        programmeId: 'uj-bcom',
        programmeName: 'BCom',
        facultyName: 'Management',
        status: 'submitted',
        universityReference: 'UJ-TEST-001',
        submittedAt: new Date(),
      },
    });
    ujApplicationId = ujApp.id;

    // Create submitted application for Wits
    const witsApp = await prisma.application.create({
      data: {
        studentId: demoStudentId,
        universityId: 'wits',
        universityName: 'University of the Witwatersrand',
        programmeId: 'wits-bcom',
        programmeName: 'Bachelor of Commerce',
        facultyName: 'Commerce, Law & Management',
        status: 'submitted',
        universityReference: 'WITS-TEST-001',
        submittedAt: new Date(),
      },
    });
    witsApplicationId = witsApp.id;
  });

  afterAll(async () => {
    // Clean up test data
    await prisma.applicationEvent.deleteMany({});
    await prisma.application.deleteMany({});
    await prisma.subjectResult.deleteMany({});
    await prisma.document.deleteMany({});
    await prisma.student.deleteMany({ where: { email: { contains: 'test-admin' } } });
    await prisma.universityAdmin.deleteMany({ where: { email: { contains: 'test-admin' } } });

    // Disconnect Prisma to close all database connections
    await prisma.$disconnect();

    // Give a small delay for any pending operations to complete
    await new Promise(resolve => setTimeout(resolve, 100));
  });

  describe('GET /v1/admin/applications', () => {
    it('should return 401 without authentication', async () => {
      const response = await request(app).get('/v1/admin/applications');

      expect(response.status).toBe(401);
    });

    it('should return only UJ applications for UJ admin', async () => {
      const response = await request(app)
        .get('/v1/admin/applications')
        .set('Cookie', [`accessToken=${ujAdminToken}`]);

      expect(response.status).toBe(200);
      expect(response.body.applications).toBeInstanceOf(Array);

      // Should only have UJ application
      expect(response.body.applications.length).toBeGreaterThanOrEqual(1);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      response.body.applications.forEach((app: any) => {
        expect(app.universityId).toBe('uj');
      });
    });

    it('should return only Wits applications for Wits admin', async () => {
      const response = await request(app)
        .get('/v1/admin/applications')
        .set('Cookie', [`accessToken=${witsAdminToken}`]);

      expect(response.status).toBe(200);
      expect(response.body.applications).toBeInstanceOf(Array);

      // Should only have Wits application
      expect(response.body.applications.length).toBeGreaterThanOrEqual(1);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      response.body.applications.forEach((app: any) => {
        expect(app.universityId).toBe('wits');
      });
    });
  });

  describe('GET /v1/admin/applications/:id', () => {
    it('should return 401 without authentication', async () => {
      const response = await request(app).get(`/v1/admin/applications/${ujApplicationId}`);

      expect(response.status).toBe(401);
    });

    it('should allow UJ admin to view their own application', async () => {
      const response = await request(app)
        .get(`/v1/admin/applications/${ujApplicationId}`)
        .set('Cookie', [`accessToken=${ujAdminToken}`]);

      expect(response.status).toBe(200);
      expect(response.body.application).toBeDefined();
      expect(response.body.application.universityId).toBe('uj');
      expect(response.body.application.student).toBeDefined();
    });

    it('should return 403 when UJ admin tries to view Wits application', async () => {
      const response = await request(app)
        .get(`/v1/admin/applications/${witsApplicationId}`)
        .set('Cookie', [`accessToken=${ujAdminToken}`]);

      expect(response.status).toBe(403);
      expect(response.body.code).toBe('UNIVERSITY_MISMATCH');
    });

    it('should return 403 when Wits admin tries to view UJ application', async () => {
      const response = await request(app)
        .get(`/v1/admin/applications/${ujApplicationId}`)
        .set('Cookie', [`accessToken=${witsAdminToken}`]);

      expect(response.status).toBe(403);
      expect(response.body.code).toBe('UNIVERSITY_MISMATCH');
    });
  });

  describe('PATCH /v1/admin/applications/:id/decision', () => {
    it('should return 401 without authentication', async () => {
      const response = await request(app)
        .patch(`/v1/admin/applications/${ujApplicationId}/decision`)
        .send({ decision: 'accepted', reason: 'Test' });

      expect(response.status).toBe(401);
    });

    it('should return 400 without required fields', async () => {
      const response = await request(app)
        .patch(`/v1/admin/applications/${ujApplicationId}/decision`)
        .set('Cookie', [`accessToken=${ujAdminToken}`])
        .send({ decision: 'accepted' }); // missing reason

      expect(response.status).toBe(400);
    });

    it('should return 403 when UJ admin tries to decide on Wits application', async () => {
      const response = await request(app)
        .patch(`/v1/admin/applications/${witsApplicationId}/decision`)
        .set('Cookie', [`accessToken=${ujAdminToken}`])
        .send({ decision: 'accepted', reason: 'Excellent performance' });

      expect(response.status).toBe(403);
      expect(response.body.code).toBe('UNIVERSITY_MISMATCH');
    });

    it('should allow UJ admin to accept their own application', async () => {
      const response = await request(app)
        .patch(`/v1/admin/applications/${ujApplicationId}/decision`)
        .set('Cookie', [`accessToken=${ujAdminToken}`])
        .send({
          decision: 'accepted',
          reason: 'Excellent academic performance and strong motivation',
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toContain('Decision recorded');
      expect(response.body.application.decision).toBe('accepted');
      expect(response.body.application.status).toBe('accepted');
      expect(response.body.application.decisionAt).toBeDefined();
    });

    it('should allow Wits admin to reject their own application', async () => {
      const response = await request(app)
        .patch(`/v1/admin/applications/${witsApplicationId}/decision`)
        .set('Cookie', [`accessToken=${witsAdminToken}`])
        .send({
          decision: 'rejected',
          reason: 'Programme full - consider applying to alternative programmes',
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toContain('Decision recorded');
      expect(response.body.application.decision).toBe('rejected');
      expect(response.body.application.status).toBe('rejected');
    });

    it('should return 400 when trying to decide on an already-decided application', async () => {
      const response = await request(app)
        .patch(`/v1/admin/applications/${ujApplicationId}/decision`)
        .set('Cookie', [`accessToken=${ujAdminToken}`])
        .send({
          decision: 'rejected',
          reason: 'Changed mind',
        });

      expect(response.status).toBe(400);
      expect(response.body.code).toBe('ALREADY_DECIDED');
    });
  });
});
