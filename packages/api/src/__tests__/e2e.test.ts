// packages/api/src/__tests__/e2e.test.ts
// End-to-end test: student registers → applies → admin decides → student sees decision
// Tests full flow + university isolation throughout

import request from 'supertest';
import app from '../app';
import { prisma } from '../utils/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config';

describe('End-to-End Flow with Isolation', () => {
  let ujAdminToken: string;
  let witsAdminToken: string;

  beforeAll(async () => {
    // Clean up test data
    await prisma.applicationEvent.deleteMany({});
    await prisma.application.deleteMany({});
    await prisma.payment.deleteMany({});
    await prisma.subjectResult.deleteMany({});
    await prisma.document.deleteMany({});
    await prisma.student.deleteMany({ where: { email: 'e2e-student@test.com' } });
    await prisma.universityAdmin.deleteMany({
      where: { email: { in: ['e2e-uj-admin@test.com', 'e2e-wits-admin@test.com'] } },
    });

    const passwordHash = await bcrypt.hash('Test@1234', 10);

    // Create UJ admin
    const ujAdmin = await prisma.universityAdmin.create({
      data: {
        email: 'e2e-uj-admin@test.com',
        passwordHash,
        name: 'UJ E2E Admin',
        universityId: 'uj',
      },
    });

    ujAdminToken = jwt.sign(
      {
        role: 'university_admin',
        adminId: ujAdmin.id,
        universityId: 'uj',
        email: ujAdmin.email,
      },
      config.jwt.accessSecret,
      { expiresIn: '15m' }
    );

    // Create Wits admin
    const witsAdmin = await prisma.universityAdmin.create({
      data: {
        email: 'e2e-wits-admin@test.com',
        passwordHash,
        name: 'Wits E2E Admin',
        universityId: 'wits',
      },
    });

    witsAdminToken = jwt.sign(
      {
        role: 'university_admin',
        adminId: witsAdmin.id,
        universityId: 'wits',
        email: witsAdmin.email,
      },
      config.jwt.accessSecret,
      { expiresIn: '15m' }
    );
  });

  afterAll(async () => {
    // Clean up test data
    await prisma.applicationEvent.deleteMany({});
    await prisma.application.deleteMany({});
    await prisma.payment.deleteMany({});
    await prisma.subjectResult.deleteMany({});
    await prisma.document.deleteMany({});
    await prisma.student.deleteMany({ where: { email: 'e2e-student@test.com' } });
    await prisma.universityAdmin.deleteMany({
      where: { email: { in: ['e2e-uj-admin@test.com', 'e2e-wits-admin@test.com'] } },
    });

    await prisma.$disconnect();
    await new Promise((resolve) => setTimeout(resolve, 100));
  });

  it('FULL FLOW: Student registers → applies → admin decides → isolation verified', async () => {
    // ============================================================
    // STEP 1: Student registers with email verification
    // ============================================================
    console.log('\n▶ STEP 1: Student registers');
    const registerResponse = await request(app).post('/v1/auth/register').send({
      email: 'e2e-student@test.com',
      password: 'Test@1234',
      firstName: 'John',
      lastName: 'Doe',
    });

    expect(registerResponse.status).toBe(201);
    expect(registerResponse.body.message).toContain('Registration successful');
    expect(registerResponse.body.studentId).toBeDefined();
    expect(registerResponse.body.email).toBe('e2e-student@test.com');
    expect(registerResponse.body.verificationCode).toBeDefined();

    // Verify email
    const verifyResponse = await request(app).post('/v1/auth/verify').send({
      email: 'e2e-student@test.com',
      code: registerResponse.body.verificationCode,
    });

    expect(verifyResponse.status).toBe(200);
    expect(verifyResponse.body.message).toContain('verified');

    // ============================================================
    // STEP 2: Student logs in
    // ============================================================
    console.log('▶ STEP 2: Student logs in');
    const loginResponse = await request(app).post('/v1/auth/login').send({
      email: 'e2e-student@test.com',
      password: 'Test@1234',
    });

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body.user.role).toBe('student');
    expect(loginResponse.body.user.emailVerified).toBe(true);

    // Extract token from cookie
    const setCookieHeader = loginResponse.headers['set-cookie'];
    expect(setCookieHeader).toBeDefined();
    const cookies = Array.isArray(setCookieHeader) ? setCookieHeader : [setCookieHeader];
    const accessTokenCookie = cookies.find((c) => c && c.startsWith('accessToken='));
    expect(accessTokenCookie).toBeDefined();

    const tokenMatch = accessTokenCookie!.match(/accessToken=([^;]+)/);
    const studentToken = tokenMatch![1];
    expect(studentToken).toBeTruthy();

    // ============================================================
    // STEP 3: Student completes profile
    // ============================================================
    console.log('▶ STEP 3: Student completes profile');
    const profileResponse = await request(app)
      .put('/v1/students/me')
      .set('Cookie', [`accessToken=${studentToken}`])
      .send({
        idNumber: '0001015009088', // Valid SA ID
        phone: '+27821234567', // Must be in +27XXXXXXXXX format
        dateOfBirth: '2000-01-01',
        gender: 'male',
        race: 'african',
        nationality: 'South African',
        homeLanguage: 'English',
        address: {
          street: '123 Main Street',
          suburb: 'Braamfontein',
          city: 'Johannesburg',
          province: 'gauteng',
          postalCode: '2000',
        },
        matricYear: 2024,
        school: 'Johannesburg High School',
      });

    expect(profileResponse.status).toBe(200);
    expect(profileResponse.body.student.phone).toBe('+27821234567');
    expect(profileResponse.body.student.idNumber).toBe('0001015009088');

    // ============================================================
    // STEP 4: Student adds subject results and gets APS
    // ============================================================
    console.log('▶ STEP 4: Student adds subject results');
    const subjectsResponse = await request(app)
      .put('/v1/students/me/subjects')
      .set('Cookie', [`accessToken=${studentToken}`])
      .send({
        results: [ // Schema expects "results", not "subjects"
          { subject: 'english_home', mark: 75, level: 6, year: 2024 },
          { subject: 'mathematics', mark: 80, level: 7, year: 2024 },
          { subject: 'accounting', mark: 82, level: 7, year: 2024 },
          { subject: 'life_sciences', mark: 70, level: 6, year: 2024 },
          { subject: 'physical_sciences', mark: 72, level: 6, year: 2024 },
          { subject: 'business_studies', mark: 65, level: 5, year: 2024 },
          { subject: 'life_orientation', mark: 80, level: 7, year: 2024 },
        ],
      });

    expect(subjectsResponse.status).toBe(200);
    expect(subjectsResponse.body.subjects).toHaveLength(7); // Response uses "subjects"

    // Calculate APS
    const apsResponse = await request(app)
      .post('/v1/aps/calculate')
      .set('Cookie', [`accessToken=${studentToken}`])
      .send({
        results: subjectsResponse.body.subjects,
        universityId: 'uj',
      });

    expect(apsResponse.status).toBe(200);
    expect(apsResponse.body.aps).toBe(37); // 7+7+6+6+6+5

    // ============================================================
    // STEP 5: Student checks qualification for UJ BCom
    // ============================================================
    console.log('▶ STEP 5: Student checks qualification');
    const universityResponse = await request(app)
      .get('/v1/universities/uj')
      .set('Cookie', [`accessToken=${studentToken}`]);

    expect(universityResponse.status).toBe(200);
    expect(universityResponse.body.university.id).toBe('uj');

    // ============================================================
    // STEP 6: Student creates application for UJ BCom
    // ============================================================
    console.log('▶ STEP 6: Student creates application');
    const applicationResponse = await request(app)
      .post('/v1/applications')
      .set('Cookie', [`accessToken=${studentToken}`])
      .send({
        universityId: 'uj',
        universityName: 'University of Johannesburg',
        programmeId: 'uj-bcom',
        programmeName: 'BCom',
        facultyName: 'Management',
      });

    expect(applicationResponse.status).toBe(201);
    expect(applicationResponse.body.application.universityId).toBe('uj');
    expect(applicationResponse.body.application.status).toBe('draft');

    const applicationId = applicationResponse.body.application.id;

    // ============================================================
    // STEP 6b: Student uploads required documents
    // ============================================================
    const fakeFile = Buffer.from('%PDF-1.4 fake content');
    const idDocResponse = await request(app)
      .post('/v1/documents/upload')
      .set('Cookie', [`accessToken=${studentToken}`])
      .field('type', 'id_document')
      .attach('file', fakeFile, { filename: 'id.pdf', contentType: 'application/pdf' });

    expect(idDocResponse.status).toBe(200);

    const matricDocResponse = await request(app)
      .post('/v1/documents/upload')
      .set('Cookie', [`accessToken=${studentToken}`])
      .field('type', 'matric_certificate')
      .attach('file', fakeFile, { filename: 'matric.pdf', contentType: 'application/pdf' });

    expect(matricDocResponse.status).toBe(200);

    // ============================================================
    // STEP 7: Student pays via mock PayGate
    // ============================================================
    console.log('▶ STEP 7: Student pays via mock PayGate');
    const paymentResponse = await request(app)
      .post('/v1/payments/initiate')
      .set('Cookie', [`accessToken=${studentToken}`])
      .send({
        applicationIds: [applicationId],
        returnUrl: 'http://localhost:3000/payment/success',
        cancelUrl: 'http://localhost:3000/payment/cancel',
      });

    expect(paymentResponse.status).toBe(200);
    expect(paymentResponse.body.payment.id).toBeDefined();

    const paymentId = paymentResponse.body.payment.id;

    // Simulate PayGate ITN callback
    const itnResponse = await request(app)
      .post('/v1/payments/notify')
      .send({
        paymentId: paymentId,
        status: 'COMPLETE',
        gatewayReference: 'MOCK-TXN-001',
      });

    expect(itnResponse.status).toBe(200);

    // ============================================================
    // STEP 8: Application is automatically submitted
    // ============================================================
    console.log('▶ STEP 8: Application automatically submitted');
    // Poll until submitted (submission runs async after payment notify)
    let submittedAppResponse: any;
    for (let i = 0; i < 15; i++) {
      submittedAppResponse = await request(app)
        .get(`/v1/applications/${applicationId}`)
        .set('Cookie', [`accessToken=${studentToken}`]);
      if (submittedAppResponse.body?.application?.status === 'submitted') break;
      await new Promise((r) => setTimeout(r, 150));
    }

    expect(submittedAppResponse.status).toBe(200);
    expect(submittedAppResponse.body.application.status).toBe('submitted');
    expect(submittedAppResponse.body.application.submittedAt).toBeDefined();

    // ============================================================
    // STEP 9: Application appears in UJ admin inbox
    // ============================================================
    console.log('▶ STEP 9: Application appears in UJ admin inbox');
    const ujInboxResponse = await request(app)
      .get('/v1/admin/applications')
      .set('Cookie', [`accessToken=${ujAdminToken}`]);

    expect(ujInboxResponse.status).toBe(200);
    const ujApp = ujInboxResponse.body.applications.find((app: any) => app.id === applicationId);
    expect(ujApp).toBeDefined();
    expect(ujApp.universityId).toBe('uj');
    expect(ujApp.studentEmail).toBe('e2e-student@test.com');

    // ============================================================
    // STEP 10: Application does NOT appear in Wits inbox (ISOLATION)
    // ============================================================
    console.log('▶ STEP 10: Application NOT in Wits inbox (isolation test)');
    const witsInboxResponse = await request(app)
      .get('/v1/admin/applications')
      .set('Cookie', [`accessToken=${witsAdminToken}`]);

    expect(witsInboxResponse.status).toBe(200);
    const witsApp = witsInboxResponse.body.applications.find((app: any) => app.id === applicationId);
    expect(witsApp).toBeUndefined();

    // ============================================================
    // STEP 11: Wits admin cannot access UJ application (403)
    // ============================================================
    console.log('▶ STEP 11: Wits admin cannot access UJ application');
    const witsAccessResponse = await request(app)
      .get(`/v1/admin/applications/${applicationId}`)
      .set('Cookie', [`accessToken=${witsAdminToken}`]);

    expect(witsAccessResponse.status).toBe(403);
    expect(witsAccessResponse.body.code).toBe('UNIVERSITY_MISMATCH');

    // ============================================================
    // STEP 12: Wits admin cannot decide on UJ application (403)
    // ============================================================
    console.log('▶ STEP 12: Wits admin cannot decide on UJ application');
    const witsDecisionResponse = await request(app)
      .patch(`/v1/admin/applications/${applicationId}/decision`)
      .set('Cookie', [`accessToken=${witsAdminToken}`])
      .send({
        decision: 'accepted',
        reason: 'Trying to accept another university\'s application',
      });

    expect(witsDecisionResponse.status).toBe(403);
    expect(witsDecisionResponse.body.code).toBe('UNIVERSITY_MISMATCH');

    // ============================================================
    // STEP 13: UJ admin accepts the application
    // ============================================================
    console.log('▶ STEP 13: UJ admin accepts the application');
    const ujDecisionResponse = await request(app)
      .patch(`/v1/admin/applications/${applicationId}/decision`)
      .set('Cookie', [`accessToken=${ujAdminToken}`])
      .send({
        decision: 'accepted',
        reason: 'Excellent academic performance. Strong APS score and well-rounded subject choices.',
      });

    expect(ujDecisionResponse.status).toBe(200);
    expect(ujDecisionResponse.body.message).toContain('Decision recorded');
    expect(ujDecisionResponse.body.application.decision).toBe('accepted');
    expect(ujDecisionResponse.body.application.status).toBe('accepted');

    // ============================================================
    // STEP 14: Student sees the acceptance decision
    // ============================================================
    console.log('▶ STEP 14: Student sees the acceptance decision');
    const decisionCheckResponse = await request(app)
      .get(`/v1/applications/${applicationId}`)
      .set('Cookie', [`accessToken=${studentToken}`]);

    expect(decisionCheckResponse.status).toBe(200);
    expect(decisionCheckResponse.body.application.status).toBe('accepted');
    expect(decisionCheckResponse.body.application.decision).toBe('accepted');
    expect(decisionCheckResponse.body.application.decisionReason).toContain('Excellent academic performance');

    // ============================================================
    // STEP 15: Student's application list reflects acceptance
    // ============================================================
    console.log('▶ STEP 15: Student application list reflects acceptance');
    const appListResponse = await request(app)
      .get('/v1/applications')
      .set('Cookie', [`accessToken=${studentToken}`]);

    expect(appListResponse.status).toBe(200);
    const acceptedApp = appListResponse.body.applications.find((app: any) => app.id === applicationId);
    expect(acceptedApp).toBeDefined();
    expect(acceptedApp.status).toBe('accepted');

    // ============================================================
    // STEP 16: UJ admin cannot change decision (ALREADY_DECIDED)
    // ============================================================
    console.log('▶ STEP 16: UJ admin cannot change decision');
    const duplicateDecisionResponse = await request(app)
      .patch(`/v1/admin/applications/${applicationId}/decision`)
      .set('Cookie', [`accessToken=${ujAdminToken}`])
      .send({
        decision: 'rejected',
        reason: 'Changed my mind',
      });

    expect(duplicateDecisionResponse.status).toBe(400);
    expect(duplicateDecisionResponse.body.code).toBe('ALREADY_DECIDED');

    console.log('\n✅ END-TO-END FLOW COMPLETE - ALL ISOLATION CHECKS PASSED\n');
  });
});
