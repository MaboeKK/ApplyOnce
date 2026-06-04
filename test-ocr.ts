// Quick test script for OCR parser
import { parseMatricCertificate } from './packages/api/src/utils/ocr.js';
import path from 'path';

async function test() {
  const certPath = path.join(__dirname, 'test-data/real/sample-nsc-1.jpeg');

  console.log('Testing OCR on:', certPath);
  console.log('Expected: English HL 71(6), Afrikaans FAL 60(5), Mathematics 70(6), LO 77(6), Accounting 72(6), Geography 73(6), Physical Sciences 70(6)');
  console.log('Expected APS (best 6 excl LO): 35\n');

  const result = await parseMatricCertificate(certPath);

  console.log('=== OCR RESULTS ===');
  console.log('ID Number:', result.idNumber);
  console.log('\nExtracted Subjects:');
  result.subjects.forEach((s, idx) => {
    console.log(`${idx + 1}. ${s.subject}: mark=${s.mark}, level=${s.level}, confidence=${s.confidence}`);
  });
  console.log('\nCalculated APS:', result.aps);
  console.log('Overall Confidence:', result.confidence);

  if (result.warnings.length > 0) {
    console.log('\nWarnings:');
    result.warnings.forEach(w => console.log('  -', w));
  }

  // Verify against ground truth
  console.log('\n=== VERIFICATION ===');
  const expectedAPS = 35;
  const apsMatch = result.aps === expectedAPS;
  console.log(`APS ${apsMatch ? '✓' : '✗'} (expected ${expectedAPS}, got ${result.aps})`);

  // Check if all 7 subjects found
  const subjectCount = result.subjects.length;
  console.log(`Subject count ${subjectCount === 7 ? '✓' : '✗'} (expected 7, got ${subjectCount})`);
}

test().catch(console.error);
