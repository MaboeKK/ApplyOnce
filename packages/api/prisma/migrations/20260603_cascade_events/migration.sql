-- DropForeignKey
ALTER TABLE "application_events" DROP CONSTRAINT "application_events_applicationId_fkey";

-- AddForeignKey
ALTER TABLE "application_events" ADD CONSTRAINT "application_events_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;
