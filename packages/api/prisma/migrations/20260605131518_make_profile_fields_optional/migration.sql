-- AlterTable
-- Make profile fields optional (collected in profile wizard, not at registration)
ALTER TABLE "students" ALTER COLUMN "idNumber" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "dateOfBirth" DROP NOT NULL,
ALTER COLUMN "gender" DROP NOT NULL,
ALTER COLUMN "race" DROP NOT NULL,
ALTER COLUMN "nationality" DROP NOT NULL,
ALTER COLUMN "homeLanguage" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "matricYear" DROP NOT NULL,
ALTER COLUMN "school" DROP NOT NULL;
