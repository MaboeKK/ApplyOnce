// Standalone OCR test (ESM, no config dependencies)
import Tesseract from 'tesseract.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// markToAPS helper (copied from shared)
function markToAPS(mark) {
  if (mark >= 80) return 7;
  if (mark >= 70) return 6;
  if (mark >= 60) return 5;
  if (mark >= 50) return 4;
  if (mark >= 40) return 3;
  if (mark >= 30) return 2;
  return 1;
}

// parseMatricCertificate (simplified, inline)
async function parseMatricCertificate(filePath) {
  const warnings = [];

  // Run OCR
  console.log('Running OCR...');
  const { data: { text } } = await Tesseract.recognize(filePath, 'eng');

  // Extract ID number
  const idMatch = text.match(/\b(\d{13})\b/);
  const idNumber = idMatch ? idMatch[1] : null;

  // Parse subjects
  const subjects = [];
  const lines = text.split('\n');

  const subjectPatterns = [
    /afrikaans/i,
    /english/i,
    /mathematics/i,
    /mathematical\s+literacy/i,
    /life\s+orientation/i,
    /physical\s+sciences/i,
    /life\s+sciences/i,
    /accounting/i,
    /geography/i,
    /history/i,
  ];

  for (const line of lines) {
    const matchedPattern = subjectPatterns.find(pattern => pattern.test(line));
    if (!matchedPattern) continue;

    const subjectMatch = line.match(matchedPattern);
    if (!subjectMatch) continue;
    const subjectName = subjectMatch[0];

    // Remove subject name to isolate numbers
    const numbersSection = line.substring(subjectMatch.index + subjectName.length).trim();
    const digitSequences = numbersSection.match(/\b\d+\b/g) || [];

    let mark = null;
    let level = null;

    // Find the LAST single digit 1-7 as the level
    for (let j = digitSequences.length - 1; j >= 0; j--) {
      const num = parseInt(digitSequences[j], 10);

      if (digitSequences[j].length === 1 && num >= 1 && num <= 7) {
        level = num;

        // Look backward for the percentage
        for (let k = j - 1; k >= 0; k--) {
          const markNum = parseInt(digitSequences[k], 10);
          if (markNum >= 0 && markNum <= 100) {
            mark = markNum;
            break;
          }
        }
        break;
      }
    }

    // Fallback
    if (level === null && mark !== null) {
      level = markToAPS(mark);
    }

    const confidence = (mark !== null && level !== null && Math.abs(markToAPS(mark) - level) === 0)
      ? 'high'
      : (level !== null ? 'medium' : 'low');

    subjects.push({
      subject: subjectName.toLowerCase(),
      mark,
      level,
      confidence,
    });
  }

  // Calculate APS (best 6 excluding Life Orientation)
  let aps = null;
  if (subjects.length >= 6) {
    const nonLO = subjects.filter(s =>
      !s.subject.toLowerCase().includes('life orientation') && s.level !== null
    );
    const sorted = [...nonLO].sort((a, b) => (b.level || 0) - (a.level || 0));
    const best6 = sorted.slice(0, 6);
    aps = best6.reduce((sum, s) => sum + (s.level || 0), 0);
  }

  return {
    extractedText: text,
    idNumber,
    subjects,
    aps,
    warnings,
  };
}

// Test
async function test() {
  const certPath = join(__dirname, 'test-data/real/sample-nsc-1.jpeg');

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

  // Verify
  console.log('\n=== VERIFICATION ===');
  const expectedAPS = 35;
  const apsMatch = result.aps === expectedAPS;
  console.log(`APS ${apsMatch ? '✓' : '✗'} (expected ${expectedAPS}, got ${result.aps})`);
  console.log(`Subject count ${result.subjects.length === 7 ? '✓' : '✗'} (expected 7, got ${result.subjects.length})`);
}

test().catch(console.error);
