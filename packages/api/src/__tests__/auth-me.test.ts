// packages/api/src/__tests__/auth-me.test.ts
// GET /v1/auth/me - lightweight session check used by the frontend's
// ProtectedRoute components to detect an expired session before rendering.

import request from 'supertest';
import app from '../app';
import { prisma } from '../utils/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config';

describe('GET /v1/auth/me', () => {
  let studentToken: string;
  let adminToken: string;

  beforeAll(async () => {
    await prisma.student.deleteMany({ where: { email: { contains: 'test-authme' } } });
    await prisma.universityAdmin.deleteMany({ where: { email: { contains: 'test-authme' } } });

    const passwordHash = await bcrypt.hash('Test@1234', 10);

    const student = await prisma.student.create({
      data: {
        email: 'test-authme-student@test.com',
        passwordHash,
        firstName: 'Test',
        lastName: 'Student',
        emailVerified: true,
      },
    });
    studentToken = jwt.sign(
      { role: 'student', studentId: student.id, email: student.email },
      config.jwt.accessSecret,
      { expiresIn: '15m' }
    );

    const admin = await prisma.universityAdmin.create({
      data: {
        email: 'test-authme-admin@test.com',
        passwordHash,
        name: 'Test Admin',
        universityId: 'uj',
      },
    });
    adminToken = jwt.sign(
      {
        role: 'university_admin',
        adminId: admin.id,
        universityId: admin.universityId,
        email: admin.email,
      },
      config.jwt.accessSecret,
      { expiresIn: '15m' }
    );
  });

  afterAll(async () => {
    await prisma.student.deleteMany({ where: { email: { contains: 'test-authme' } } });
    await prisma.universityAdmin.deleteMany({ where: { email: { contains: 'test-authme' } } });
    await prisma.$disconnect();
  });

  it('returns 401 with no cookie at all', async () => {
    const response = await request(app).get('/v1/auth/me');
    expect(response.status).toBe(401);
  });

  it('returns 401 with a garbage token', async () => {
    const response = await request(app)
      .get('/v1/auth/me')
      .set('Cookie', ['accessToken=not-a-real-jwt']);
    expect(response.status).toBe(401);
  });

  it('returns 401 with an expired token', async () => {
    const expiredToken = jwt.sign(
      { role: 'student', studentId: 'x', email: 'x@test.com' },
      config.jwt.accessSecret,
      { expiresIn: '-1s' }
    );
    const response = await request(app)
      .get('/v1/auth/me')
      .set('Cookie', [`accessToken=${expiredToken}`]);
    expect(response.status).toBe(401);
  });

  it('returns 200 with the role for a valid student token', async () => {
    const response = await request(app)
      .get('/v1/auth/me')
      .set('Cookie', [`accessToken=${studentToken}`]);
    expect(response.status).toBe(200);
    expect(response.body.user.role).toBe('student');
  });

  it('returns 200 with the role for a valid university_admin token', async () => {
    const response = await request(app)
      .get('/v1/auth/me')
      .set('Cookie', [`accessToken=${adminToken}`]);
    expect(response.status).toBe(200);
    expect(response.body.user.role).toBe('university_admin');
  });
});
