-- Enforce "only one application per (student, university)" at the database
-- level, closing a TOCTOU race where two concurrent createApplication
-- requests could both pass the in-app check and create duplicate rows.
-- CreateIndex
CREATE UNIQUE INDEX "applications_studentId_universityId_key" ON "applications"("studentId", "universityId");
