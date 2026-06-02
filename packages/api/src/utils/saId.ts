// packages/api/src/utils/saId.ts
// South African ID number utilities

export interface SAIdInfo {
  dateOfBirth: Date;
  gender: 'male' | 'female';
  citizen: boolean;
}

export function parseSAIdNumber(idNumber: string): SAIdInfo {
  if (!/^\d{13}$/.test(idNumber)) {
    throw new Error('Invalid SA ID number format');
  }

  // Extract date components (YYMMDD)
  const yy = parseInt(idNumber.substring(0, 2), 10);
  const mm = parseInt(idNumber.substring(2, 4), 10);
  const dd = parseInt(idNumber.substring(4, 6), 10);

  // Determine century (assume 1900s for yy >= 50, otherwise 2000s)
  const year = yy >= 50 ? 1900 + yy : 2000 + yy;

  const dateOfBirth = new Date(year, mm - 1, dd);

  // Gender digit (position 6): 0-4 = female, 5-9 = male
  const genderDigit = parseInt(idNumber.charAt(6), 10);
  const gender = genderDigit < 5 ? 'female' : 'male';

  // Citizenship (position 10): 0 = SA citizen, 1 = permanent resident
  const citizenshipDigit = parseInt(idNumber.charAt(10), 10);
  const citizen = citizenshipDigit === 0;

  return {
    dateOfBirth,
    gender,
    citizen,
  };
}
