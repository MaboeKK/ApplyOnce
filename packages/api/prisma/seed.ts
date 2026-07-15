// packages/api/prisma/seed.ts
// Runs once on setup: npx prisma db seed
// Creates all 26 SA public universities + one admin account per university.
// Also creates a demo student account for testing.

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// ─── CREDENTIALS ─────────────────────────────────────────────────────────────
// Default password for all seeded university admin accounts.
// Change these in production.

const ADMIN_DEFAULT_PASSWORD = 'Admin@ApplyOnce1';
const DEMO_STUDENT_PASSWORD  = 'Student@ApplyOnce1';

// ─── UNIVERSITY DATA ─────────────────────────────────────────────────────────

const universities = [
  // Traditional Universities
  { id: 'uct',     name: 'University of Cape Town',              abbreviation: 'UCT',     type: 'traditional',              city: 'Cape Town',       province: 'western_cape',   website: 'https://www.uct.ac.za',       applicationPortal: 'https://www.uct.ac.za/apply',           applicationFeeZAR: 100,  applicationOpenDate: '04-01', applicationCloseDate: '09-30' },
  { id: 'wits',    name: 'University of the Witwatersrand',       abbreviation: 'Wits',    type: 'traditional',              city: 'Johannesburg',    province: 'gauteng',         website: 'https://www.wits.ac.za',      applicationPortal: 'https://www.wits.ac.za/apply-online',   applicationFeeZAR: 100,  applicationOpenDate: '04-01', applicationCloseDate: '09-30' },
  { id: 'up',      name: 'University of Pretoria',                abbreviation: 'UP',      type: 'traditional',              city: 'Pretoria',        province: 'gauteng',         website: 'https://www.up.ac.za',        applicationPortal: 'https://www.up.ac.za/apply',             applicationFeeZAR: 300,  applicationOpenDate: '04-01', applicationCloseDate: '06-30' },
  { id: 'su',      name: 'Stellenbosch University',               abbreviation: 'SU',      type: 'traditional',              city: 'Stellenbosch',    province: 'western_cape',   website: 'https://www.sun.ac.za',       applicationPortal: 'https://www.maties.com/application',    applicationFeeZAR: 100,  applicationOpenDate: '04-01', applicationCloseDate: '06-30' },
  { id: 'uj',      name: 'University of Johannesburg',            abbreviation: 'UJ',      type: 'comprehensive',            city: 'Johannesburg',    province: 'gauteng',         website: 'https://www.uj.ac.za',        applicationPortal: 'https://www.uj.ac.za/apply',             applicationFeeZAR: 200,  applicationOpenDate: '04-01', applicationCloseDate: '09-30' },
  { id: 'ukzn',    name: 'University of KwaZulu-Natal',           abbreviation: 'UKZN',    type: 'traditional',              city: 'Durban',          province: 'kwazulu_natal',   website: 'https://www.ukzn.ac.za',      applicationPortal: 'https://cao.ac.za',                      applicationFeeZAR: 270,  applicationOpenDate: '04-01', applicationCloseDate: '09-30' },
  { id: 'ufs',     name: 'University of the Free State',          abbreviation: 'UFS',     type: 'traditional',              city: 'Bloemfontein',    province: 'free_state',      website: 'https://www.ufs.ac.za',       applicationPortal: 'https://www.ufs.ac.za/apply',            applicationFeeZAR: 150,  applicationOpenDate: '04-01', applicationCloseDate: '09-30' },
  { id: 'nwu',     name: 'North-West University',                 abbreviation: 'NWU',     type: 'traditional',              city: 'Potchefstroom',   province: 'north_west',      website: 'https://www.nwu.ac.za',       applicationPortal: 'https://www.nwu.ac.za/apply',            applicationFeeZAR: 150,  applicationOpenDate: '04-01', applicationCloseDate: '09-30' },
  { id: 'nmu',     name: 'Nelson Mandela University',             abbreviation: 'NMU',     type: 'comprehensive',            city: 'Gqeberha',        province: 'eastern_cape',    website: 'https://www.mandela.ac.za',   applicationPortal: 'https://www.mandela.ac.za/apply',        applicationFeeZAR: 200,  applicationOpenDate: '04-01', applicationCloseDate: '09-30' },
  { id: 'uwc',     name: 'University of the Western Cape',        abbreviation: 'UWC',     type: 'traditional',              city: 'Bellville',       province: 'western_cape',   website: 'https://www.uwc.ac.za',       applicationPortal: 'https://www.uwc.ac.za/apply',            applicationFeeZAR: 100,  applicationOpenDate: '04-01', applicationCloseDate: '09-30' },
  { id: 'rhodes',  name: 'Rhodes University',                     abbreviation: 'Rhodes',  type: 'traditional',              city: 'Makhanda',        province: 'eastern_cape',    website: 'https://www.ru.ac.za',        applicationPortal: 'https://www.ru.ac.za/apply',             applicationFeeZAR: 100,  applicationOpenDate: '04-01', applicationCloseDate: '09-30' },
  { id: 'unisa',   name: 'University of South Africa',            abbreviation: 'UNISA',   type: 'traditional',              city: 'Pretoria',        province: 'gauteng',         website: 'https://www.unisa.ac.za',     applicationPortal: 'https://my.unisa.ac.za/portal',          applicationFeeZAR: 115,  applicationOpenDate: '08-01', applicationCloseDate: '10-31' },
  // Universities of Technology
  { id: 'tut',     name: 'Tshwane University of Technology',      abbreviation: 'TUT',     type: 'university_of_technology', city: 'Pretoria',        province: 'gauteng',         website: 'https://www.tut.ac.za',       applicationPortal: 'https://www.tut.ac.za/apply',            applicationFeeZAR: 240,  applicationOpenDate: '04-01', applicationCloseDate: '09-30' },
  { id: 'dut',     name: 'Durban University of Technology',       abbreviation: 'DUT',     type: 'university_of_technology', city: 'Durban',          province: 'kwazulu_natal',   website: 'https://www.dut.ac.za',       applicationPortal: 'https://cao.ac.za',                      applicationFeeZAR: 270,  applicationOpenDate: '04-01', applicationCloseDate: '09-30' },
  { id: 'cput',    name: 'Cape Peninsula University of Technology',abbreviation: 'CPUT',    type: 'university_of_technology', city: 'Cape Town',       province: 'western_cape',   website: 'https://www.cput.ac.za',      applicationPortal: 'https://www.cput.ac.za/apply',           applicationFeeZAR: 100,  applicationOpenDate: '04-01', applicationCloseDate: '07-31' },
  { id: 'vut',     name: 'Vaal University of Technology',         abbreviation: 'VUT',     type: 'university_of_technology', city: 'Vanderbijlpark',  province: 'gauteng',         website: 'https://www.vut.ac.za',       applicationPortal: 'https://www.vut.ac.za/apply',            applicationFeeZAR: 200,  applicationOpenDate: '04-01', applicationCloseDate: '09-30' },
  { id: 'cut',     name: 'Central University of Technology',      abbreviation: 'CUT',     type: 'university_of_technology', city: 'Bloemfontein',    province: 'free_state',      website: 'https://www.cut.ac.za',       applicationPortal: 'https://www.cut.ac.za/apply',            applicationFeeZAR: 180,  applicationOpenDate: '04-01', applicationCloseDate: '09-30' },
  { id: 'mut',     name: 'Mangosuthu University of Technology',   abbreviation: 'MUT',     type: 'university_of_technology', city: 'Umlazi',          province: 'kwazulu_natal',   website: 'https://www.mut.ac.za',       applicationPortal: 'https://cao.ac.za',                      applicationFeeZAR: 270,  applicationOpenDate: '04-01', applicationCloseDate: '09-30' },
  // Historically Disadvantaged Universities
  { id: 'unizulu', name: 'University of Zululand',                abbreviation: 'UniZulu', type: 'traditional',              city: 'Richards Bay',    province: 'kwazulu_natal',   website: 'https://www.unizulu.ac.za',   applicationPortal: 'https://www.unizulu.ac.za/apply',        applicationFeeZAR: 150,  applicationOpenDate: '04-01', applicationCloseDate: '09-30' },
  { id: 'ufh',     name: 'University of Fort Hare',               abbreviation: 'UFH',     type: 'traditional',              city: 'Alice',           province: 'eastern_cape',    website: 'https://www.ufh.ac.za',       applicationPortal: 'https://www.ufh.ac.za/apply',            applicationFeeZAR: 150,  applicationOpenDate: '04-01', applicationCloseDate: '09-30' },
  { id: 'wsu',     name: 'Walter Sisulu University',              abbreviation: 'WSU',     type: 'comprehensive',            city: 'Mthatha',         province: 'eastern_cape',    website: 'https://www.wsu.ac.za',       applicationPortal: 'https://www.wsu.ac.za/apply',            applicationFeeZAR: 150,  applicationOpenDate: '04-01', applicationCloseDate: '09-30' },
  { id: 'smu',     name: 'Sefako Makgatho Health Sciences Uni',   abbreviation: 'SMU',     type: 'traditional',              city: 'Ga-Rankuwa',      province: 'gauteng',         website: 'https://www.smu.ac.za',       applicationPortal: 'https://www.smu.ac.za/apply',            applicationFeeZAR: 200,  applicationOpenDate: '04-01', applicationCloseDate: '09-30' },
  { id: 'spu',     name: 'Sol Plaatje University',                abbreviation: 'SPU',     type: 'traditional',              city: 'Kimberley',       province: 'northern_cape',   website: 'https://www.spu.ac.za',       applicationPortal: 'https://www.spu.ac.za/apply',            applicationFeeZAR: 100,  applicationOpenDate: '04-01', applicationCloseDate: '09-30' },
  { id: 'ump',     name: 'University of Mpumalanga',              abbreviation: 'UMP',     type: 'traditional',              city: 'Mbombela',        province: 'mpumalanga',      website: 'https://www.ump.ac.za',       applicationPortal: 'https://www.ump.ac.za/apply',            applicationFeeZAR: 100,  applicationOpenDate: '04-01', applicationCloseDate: '09-30' },
  { id: 'ul',      name: 'University of Limpopo',                 abbreviation: 'UL',      type: 'traditional',              city: 'Mankweng',        province: 'limpopo',         website: 'https://www.ul.ac.za',        applicationPortal: 'https://www.ul.ac.za/apply',             applicationFeeZAR: 200,  applicationOpenDate: '04-01', applicationCloseDate: '09-30' },
  { id: 'univen',  name: 'University of Venda',                   abbreviation: 'UNIVEN',  type: 'traditional',              city: 'Thohoyandou',     province: 'limpopo',         website: 'https://www.univen.ac.za',    applicationPortal: 'https://www.univen.ac.za/apply',         applicationFeeZAR: 150,  applicationOpenDate: '04-01', applicationCloseDate: '09-30' },
];

async function main() {
  console.log('\n╔══════════════════════════════════════╗');
  console.log('║   ApplyOnce — Database Seed           ║');
  console.log('╚══════════════════════════════════════╝\n');

  const adminHash  = await bcrypt.hash(ADMIN_DEFAULT_PASSWORD, 12);
  const studentHash = await bcrypt.hash(DEMO_STUDENT_PASSWORD, 12);

  // ─── Seed universities ───────────────────────────────────────────────────
  console.log('▶ Seeding universities...');
  for (const uni of universities) {
    await prisma.university.upsert({
      where: { id: uni.id },
      update: uni,
      create: uni,
    });
  }
  console.log(`✓ ${universities.length} universities seeded\n`);

  // ─── Seed university admin accounts ─────────────────────────────────────
  console.log('▶ Creating university admin accounts...');
  for (const uni of universities) {
    const email = `admin@${uni.id}.applyonce.co.za`;
    await prisma.universityAdmin.upsert({
      where: { email },
      update: { passwordHash: adminHash, name: `${uni.abbreviation} Admin`, universityId: uni.id },
      create: {
        email,
        passwordHash: adminHash,
        name: `${uni.abbreviation} Admin`,
        universityId: uni.id,
      },
    });
  }
  console.log(`✓ ${universities.length} university admin accounts created\n`);

  // ─── Seed demo student account ───────────────────────────────────────────
  console.log('▶ Creating demo student account...');
  await prisma.student.upsert({
    where: { email: 'demo@applyonce.co.za' },
    update: { emailVerified: true },
    create: {
      idNumber:     '0001015009087',
      email:        'demo@applyonce.co.za',
      emailVerified: true,
      phone:        '0821234567',
      passwordHash: studentHash,
      firstName:    'Demo',
      lastName:     'Student',
      dateOfBirth:  new Date('2000-01-01'),
      gender:       'male',
      race:         'african',
      nationality:  'South African',
      homeLanguage: 'english',
      address: {
        street:     '1 Demo Street',
        suburb:     'Sandton',
        city:       'Johannesburg',
        province:   'gauteng',
        postalCode: '2196',
      },
      matricYear: 2024,
      school:     'Demo High School',
    },
  });
  console.log('✓ Demo student account created\n');

  // ─── Seed demo student's matric results (APS ~36) ──────────────────────────
  console.log('▶ Seeding demo student matric results...');
  const demoStudent = await prisma.student.findUnique({ where: { email: 'demo@applyonce.co.za' } });
  if (demoStudent) {
    const subjects = [
      { subject: 'english_home',      mark: 75, level: 6 },
      { subject: 'mathematics',       mark: 72, level: 6 },
      { subject: 'accounting',        mark: 82, level: 7 },
      { subject: 'life_sciences',     mark: 70, level: 6 },
      { subject: 'physical_sciences', mark: 70, level: 6 },
      { subject: 'business_studies',  mark: 65, level: 5 },
      { subject: 'life_orientation',  mark: 75, level: 6 },
    ];
    for (const subj of subjects) {
      await prisma.subjectResult.upsert({
        where: { studentId_subject: { studentId: demoStudent.id, subject: subj.subject } },
        update: { mark: subj.mark, level: subj.level, year: 2024 },
        create: { studentId: demoStudent.id, year: 2024, ...subj },
      });
    }
    console.log('  ✓ Demo student results seeded (APS ~36)');

    // ─── Seed sample SUBMITTED applications (so admin inboxes are not empty) ──
    console.log('▶ Seeding sample applications...');
    const samples = [
      { universityId: 'uj',   universityName: 'University of Johannesburg', programmeId: 'uj-bcom',   programmeName: 'BCom', facultyName: 'Management', ref: 'UJ-2026-481922' },
      { universityId: 'wits', universityName: 'University of the Witwatersrand', programmeId: 'wits-bcom', programmeName: 'Bachelor of Commerce', facultyName: 'Commerce, Law & Management', ref: 'WITS-2026-203847' },
    ];
    for (const a of samples) {
      const exists = await prisma.application.findFirst({
        where: { studentId: demoStudent.id, universityId: a.universityId },
      });
      if (!exists) {
        await prisma.application.create({
          data: {
            studentId: demoStudent.id,
            universityId: a.universityId,
            universityName: a.universityName,
            programmeId: a.programmeId,
            programmeName: a.programmeName,
            facultyName: a.facultyName,
            status: 'submitted',
            universityReference: a.ref,
            submittedAt: new Date(),
          },
        });
      }
    }
    console.log('  ✓ Sample applications seeded (UJ + Wits, submitted)');
  }

  // ─── Print credentials summary ───────────────────────────────────────────
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║   SEEDED CREDENTIALS — SAVE THESE                           ║');
  console.log('╠══════════════════════════════════════════════════════════════╣');
  console.log('║                                                              ║');
  console.log('║  DEMO STUDENT                                                ║');
  console.log('║  Email:    demo@applyonce.co.za                             ║');
  console.log(`║  Password: ${DEMO_STUDENT_PASSWORD}                       ║`);
  console.log('║                                                              ║');
  console.log('║  UNIVERSITY ADMINS (all 26)                                 ║');
  console.log('║  Email format:  admin@{universityId}.applyonce.co.za        ║');
  console.log(`║  Password:      ${ADMIN_DEFAULT_PASSWORD}                  ║`);
  console.log('║                                                              ║');
  console.log('║  Examples:                                                   ║');
  console.log('║  admin@uct.applyonce.co.za                                  ║');
  console.log('║  admin@wits.applyonce.co.za                                 ║');
  console.log('║  admin@uj.applyonce.co.za                                   ║');
  console.log('║  admin@tut.applyonce.co.za                                  ║');
  console.log('║  (see docs/university-credentials.md for full list)         ║');
  console.log('║                                                              ║');
  console.log('╚══════════════════════════════════════════════════════════════╝\n');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
