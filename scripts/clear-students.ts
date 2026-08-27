// scripts/clear-students.ts
// Clears all student data (students, applications, payments, etc.)
// Keeps universities and university admin accounts intact

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('\n╔══════════════════════════════════════╗');
  console.log('║   Clearing Student Data              ║');
  console.log('╚══════════════════════════════════════╝\n');

  // Delete in correct order due to foreign key constraints

  console.log('▶ Deleting application events...');
  const events = await prisma.applicationEvent.deleteMany({});
  console.log(`  ✓ Deleted ${events.count} events`);

  console.log('▶ Deleting applications...');
  const apps = await prisma.application.deleteMany({});
  console.log(`  ✓ Deleted ${apps.count} applications`);

  console.log('▶ Deleting payments...');
  const payments = await prisma.payment.deleteMany({});
  console.log(`  ✓ Deleted ${payments.count} payments`);

  console.log('▶ Deleting documents...');
  const docs = await prisma.document.deleteMany({});
  console.log(`  ✓ Deleted ${docs.count} documents`);

  console.log('▶ Deleting subject results...');
  const subjects = await prisma.subjectResult.deleteMany({});
  console.log(`  ✓ Deleted ${subjects.count} subject results`);

  console.log('▶ Deleting students...');
  const students = await prisma.student.deleteMany({});
  console.log(`  ✓ Deleted ${students.count} students`);

  console.log('\n╔══════════════════════════════════════╗');
  console.log('║   Student Data Cleared ✓             ║');
  console.log('║   Universities & Admins Preserved    ║');
  console.log('╚══════════════════════════════════════╝\n');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
