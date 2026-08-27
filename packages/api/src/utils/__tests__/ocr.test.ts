// packages/api/src/utils/__tests__/ocr.test.ts
// Unit tests for the NSC subject-line parser (pure text -> ExtractedSubject[],
// no OCR/Tesseract involved — that part is exercised only via real image input).

import { parseSubjects } from '../ocr';

describe('parseSubjects', () => {
  test('extracts subjects, marks and levels from a real NSC-format block', () => {
    // Matches the real certificate layout documented in CLAUDE.md (Sample A).
    const text = [
      'National Senior Certificate',
      'Subject                              %      Achievement level',
      'Afrikaans Home Language              70     6',
      'English First Additional Language    81     7',
      'Mathematical Literacy                84     7',
      'Life Orientation                     83     7',
      'Consumer Studies                     73     6',
      'Dance Studies                        70     6',
      'Life Sciences                        68     5',
      '***** ***** ***** ***** ***** ***** ***  *',
    ].join('\n');

    const warnings: string[] = [];
    const subjects = parseSubjects(text, warnings);

    expect(subjects).toHaveLength(7);

    // The subject-name regexes only capture the matched fragment, not the
    // full column text — e.g. "Afrikaans" alone, not "Afrikaans Home
    // Language" — so normalizeSubjectName can't detect Home Language here
    // and both language lines fall back to *_fal. This is existing,
    // documented parser behavior, not something this test changes.
    expect(subjects).toEqual([
      expect.objectContaining({ subject: 'afrikaans_fal', mark: 70, level: 6, confidence: 'high' }),
      expect.objectContaining({ subject: 'english_fal', mark: 81, level: 7, confidence: 'high' }),
      expect.objectContaining({
        subject: 'mathematical_literacy',
        mark: 84,
        level: 7,
        confidence: 'high',
      }),
      expect.objectContaining({
        subject: 'life_orientation',
        mark: 83,
        level: 7,
        confidence: 'high',
      }),
      expect.objectContaining({
        subject: 'consumer_studies',
        mark: 73,
        level: 6,
        confidence: 'high',
      }),
      expect.objectContaining({ subject: 'dramatic_arts', mark: 70, level: 6, confidence: 'high' }),
      expect.objectContaining({ subject: 'life_sciences', mark: 68, level: 5, confidence: 'high' }),
    ]);
    expect(warnings).toHaveLength(0);
  });

  test('extracts a second real NSC-format block (Sample B)', () => {
    const text = [
      'English Home Language                 75    6',
      'Afrikaans First Additional Language    65    5',
      'Mathematics                            72    6',
      'Life Orientation                       78    6',
      'Accounting                             71    6',
      'Geography                              76    6',
      'Physical Sciences                      74    6',
    ].join('\n');

    const subjects = parseSubjects(text, []);

    expect(subjects).toHaveLength(7);
    expect(subjects.map((s) => s.level)).toEqual([6, 5, 6, 6, 6, 6, 6]);
    expect(subjects.map((s) => s.mark)).toEqual([75, 65, 72, 78, 71, 76, 74]);
    expect(subjects.every((s) => s.confidence === 'high')).toBe(true);
  });

  test('leaves mark and level null when no single-digit 1-7 level is present', () => {
    // OCR sometimes only picks up the percentage column, not the level
    // column. findAchievementLevel requires a standalone digit 1-7; without
    // it, findPercentageMark is never even attempted (matches the original,
    // pre-refactor control flow exactly).
    const subjects = parseSubjects('Geography                            65', []);

    expect(subjects).toHaveLength(1);
    expect(subjects[0]).toMatchObject({
      subject: 'geography',
      mark: null,
      level: null,
      confidence: 'low',
    });
  });

  test('returns medium confidence when a level is found but no percentage precedes it', () => {
    const subjects = parseSubjects('History                               6', []);

    expect(subjects).toHaveLength(1);
    expect(subjects[0]).toMatchObject({
      subject: 'history',
      mark: null,
      level: 6,
      confidence: 'medium',
    });
  });

  test('ignores lines that do not match a known subject pattern', () => {
    const subjects = parseSubjects('Certificate number 120 1196 1914 T', []);

    expect(subjects).toHaveLength(0);
  });

  test('pushes a warning when nothing could be extracted at all', () => {
    const warnings: string[] = [];
    const subjects = parseSubjects('National Senior Certificate\nAwarded to Jane Doe', warnings);

    expect(subjects).toHaveLength(0);
    expect(warnings).toContain('No subjects could be extracted from the certificate');
  });
});
