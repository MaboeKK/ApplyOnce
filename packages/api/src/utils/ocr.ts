// packages/api/src/utils/ocr.ts
// NSC Matric Certificate OCR Parser using Tesseract.js

import Tesseract from 'tesseract.js';
import { markToAPS } from '@applyonce/shared';
import { logger } from './logger';

export interface ExtractedSubject {
  subject: string;
  mark: number | null;
  level: number | null;
  confidence: 'high' | 'medium' | 'low';
}

export interface OCRResult {
  extractedText: string;
  idNumber: string | null;
  subjects: ExtractedSubject[];
  aps: number | null;
  confidence: 'high' | 'medium' | 'low';
  warnings: string[];
}

/**
 * Parse NSC matric certificate using OCR
 * Reads the Achievement Level column (1-7) directly as APS points
 */
export async function parseMatricCertificate(filePath: string): Promise<OCRResult> {
  const warnings: string[] = [];

  try {
    // Run OCR
    logger.info({ filePath }, 'Starting OCR on matric certificate');
    const { data: { text } } = await Tesseract.recognize(filePath, 'eng', {
      logger: (m) => {
        if (m.status === 'recognizing text') {
          logger.debug({ progress: m.progress }, 'OCR progress');
        }
      },
    });

    logger.info('OCR complete, parsing results');

    // Extract ID number (13 digits)
    const idMatch = text.match(/\b(\d{13})\b/);
    const idNumber = idMatch ? idMatch[1] : null;
    if (!idNumber) {
      warnings.push('Could not extract ID number');
    }

    // Parse subjects
    const subjects = parseSubjects(text, warnings);

    // Calculate APS from extracted subjects
    let aps: number | null = null;
    if (subjects.length >= 6) {
      // Filter out Life Orientation and take best 6 subjects based on level
      const nonLO = subjects.filter(
        (s) => s.subject !== 'life_orientation' && s.level !== null
      );
      const sorted = [...nonLO].sort((a, b) => (b.level || 0) - (a.level || 0));
      const best6 = sorted.slice(0, 6);
      aps = best6.reduce((sum, s) => sum + (s.level || 0), 0);
    } else {
      warnings.push(`Only ${subjects.length} subjects extracted. Need at least 6.`);
    }

    // Determine overall confidence
    const avgConfidence = subjects.length > 0
      ? subjects.filter((s) => s.confidence === 'high').length / subjects.length
      : 0;
    const confidence: 'high' | 'medium' | 'low' =
      avgConfidence > 0.7 ? 'high' : avgConfidence > 0.4 ? 'medium' : 'low';

    return {
      extractedText: text,
      idNumber,
      subjects,
      aps,
      confidence,
      warnings,
    };
  } catch (error) {
    logger.error({ error, filePath }, 'OCR failed');
    throw new Error('OCR processing failed');
  }
}

/**
 * Parse subjects from OCR text
 * NSC format: Subject name | Percentage | Achievement Level (1-7)
 */
function parseSubjects(text: string, warnings: string[]): ExtractedSubject[] {
  const subjects: ExtractedSubject[] = [];
  const lines = text.split('\n');

  // Common NSC subject patterns (flexible to handle OCR errors)
  const subjectPatterns = [
    /afrikaans/i,
    /english/i,
    /mathematics/i,
    /mathematical\s+literacy/i,
    /math\s+lit/i,
    /life\s+orientation/i,
    /physical\s+sciences/i,
    /life\s+sciences/i,
    /accounting/i,
    /geography/i,
    /history/i,
    /business\s+studies/i,
    /economics/i,
    /consumer\s+studies/i,
    /dance\s+studies/i,
    /music/i,
    /visual\s+arts/i,
    /dramatic\s+arts/i,
    /information\s+technology/i,
    /tourism/i,
  ];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Check if line contains a subject
    const matchedPattern = subjectPatterns.find((pattern) => pattern.test(line));
    if (!matchedPattern) continue;

    // Extract subject name
    const subjectMatch = line.match(matchedPattern);
    if (!subjectMatch) continue;
    const subjectName = subjectMatch[0];

    // Parse line positionally: Subject name | Percentage | Achievement Level
    // Example: "English First Additional Language    71     6"
    // Strategy: Take the LAST single digit (1-7) as the level,
    // then look backward for the percentage (1-3 digits, 0-100)

    // Remove the subject name from the line to isolate the numbers
    const numbersSection = line.substring(subjectMatch.index! + subjectName.length).trim();

    // Extract all digit sequences from the numbers section
    const digitSequences = numbersSection.match(/\b\d+\b/g) || [];

    let mark: number | null = null;
    let level: number | null = null;

    // Find the LAST single digit 1-7 in the line — this is the achievement level
    for (let j = digitSequences.length - 1; j >= 0; j--) {
      const num = parseInt(digitSequences[j], 10);

      if (digitSequences[j].length === 1 && num >= 1 && num <= 7) {
        level = num;

        // Now look backward from the level for the percentage
        for (let k = j - 1; k >= 0; k--) {
          const markNum = parseInt(digitSequences[k], 10);
          if (markNum >= 0 && markNum <= 100) {
            mark = markNum;
            break;
          }
        }
        break; // Found the level, stop searching
      }
    }

    // Fallback: if no level extracted, try to derive from percentage
    if (level === null && mark !== null) {
      level = markToAPS(mark);
    }

    // Determine confidence
    let confidence: 'high' | 'medium' | 'low' = 'low';
    if (mark !== null && level !== null && Math.abs(markToAPS(mark) - level) === 0) {
      confidence = 'high'; // Mark and level match
    } else if (level !== null) {
      confidence = 'medium'; // Have level but no mark or mismatch
    }

    subjects.push({
      subject: normalizeSubjectName(subjectName),
      mark: mark !== null && mark >= 0 && mark <= 100 ? mark : null,
      level,
      confidence,
    });
  }

  if (subjects.length === 0) {
    warnings.push('No subjects could be extracted from the certificate');
  }

  return subjects;
}

/**
 * Normalize subject name to match our NSCSubject types
 */
function normalizeSubjectName(raw: string): string {
  const normalized = raw.toLowerCase().trim();

  // Common mappings
  if (normalized.includes('math lit')) return 'mathematical_literacy';
  if (normalized.includes('mathematics')) return 'mathematics';
  if (normalized.includes('life orientation')) return 'life_orientation';
  if (normalized.includes('physical sciences')) return 'physical_sciences';
  if (normalized.includes('life sciences')) return 'life_sciences';
  if (normalized.includes('afrikaans')) return 'afrikaans_fal'; // Default to FAL
  if (normalized.includes('english')) return 'english_fal'; // Default to FAL
  if (normalized.includes('accounting')) return 'accounting';
  if (normalized.includes('geography')) return 'geography';
  if (normalized.includes('history')) return 'history';
  if (normalized.includes('business')) return 'business_studies';
  if (normalized.includes('economics')) return 'economics';
  if (normalized.includes('consumer')) return 'consumer_studies';
  if (normalized.includes('dance')) return 'dramatic_arts'; // Close enough
  if (normalized.includes('music')) return 'music';
  if (normalized.includes('visual')) return 'visual_arts';
  if (normalized.includes('dramatic')) return 'dramatic_arts';
  if (normalized.includes('information')) return 'information_technology';
  if (normalized.includes('tourism')) return 'tourism';

  // Return as-is if no mapping
  return normalized.replace(/\s+/g, '_');
}

/**
 * Parse SA ID document to extract ID number
 */
export async function parseIdDocument(filePath: string): Promise<{ idNumber: string | null; confidence: 'high' | 'medium' | 'low'; warnings: string[] }> {
  const warnings: string[] = [];

  try {
    logger.info({ filePath }, 'Starting OCR on ID document');
    const { data: { text } } = await Tesseract.recognize(filePath, 'eng', {
      logger: (m) => {
        if (m.status === 'recognizing text') {
          logger.debug({ progress: m.progress }, 'OCR progress');
        }
      },
    });

    logger.info('OCR complete, extracting ID number');

    // Extract ID number (13 digits)
    const idMatch = text.match(/\b(\d{13})\b/);
    const idNumber = idMatch ? idMatch[1] : null;

    if (!idNumber) {
      warnings.push('Could not extract ID number from ID document');
      return { idNumber: null, confidence: 'low', warnings };
    }

    // Basic validation: check if it looks like a valid SA ID
    const yy = parseInt(idNumber.substring(0, 2));
    const mm = parseInt(idNumber.substring(2, 4));
    const dd = parseInt(idNumber.substring(4, 6));

    const isValidDate = mm >= 1 && mm <= 12 && dd >= 1 && dd <= 31;
    const confidence: 'high' | 'medium' | 'low' = isValidDate ? 'high' : 'medium';

    return { idNumber, confidence, warnings };
  } catch (error) {
    logger.error({ error, filePath }, 'ID document OCR failed');
    throw new Error('ID document OCR processing failed');
  }
}
