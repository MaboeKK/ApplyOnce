-- CreateIndex
CREATE INDEX "application_events_applicationId_idx" ON "application_events"("applicationId");

-- CreateIndex
CREATE INDEX "applications_studentId_idx" ON "applications"("studentId");

-- CreateIndex
CREATE INDEX "applications_universityId_idx" ON "applications"("universityId");

-- CreateIndex
CREATE INDEX "applications_status_idx" ON "applications"("status");

-- CreateIndex
CREATE INDEX "applications_universityId_status_idx" ON "applications"("universityId", "status");

-- CreateIndex
CREATE INDEX "documents_studentId_idx" ON "documents"("studentId");

-- CreateIndex
CREATE INDEX "documents_type_idx" ON "documents"("type");

-- CreateIndex
CREATE INDEX "documents_studentId_type_idx" ON "documents"("studentId", "type");

-- CreateIndex
CREATE INDEX "payments_studentId_idx" ON "payments"("studentId");

-- CreateIndex
CREATE INDEX "refresh_tokens_studentId_idx" ON "refresh_tokens"("studentId");

-- CreateIndex
CREATE INDEX "university_admin_refresh_tokens_adminId_idx" ON "university_admin_refresh_tokens"("adminId");

-- CreateIndex
CREATE INDEX "university_admins_universityId_idx" ON "university_admins"("universityId");
