# Deployment Security Checklist

This document outlines critical security configurations that MUST be verified before deploying ApplyOnce to production.

## ✅ Already Implemented (Code Level)

### 1. Helmet Security Headers
- **Status:** ✅ Configured
- **File:** `packages/api/src/app.ts:32`
- **Verification:**
  ```bash
  grep -n "app.use(helmet())" packages/api/src/app.ts
  ```
- **Headers Applied:**
  - X-Content-Type-Options: nosniff
  - X-Frame-Options: SAMEORIGIN
  - X-XSS-Protection: 0 (deprecated, CSP preferred)
  - Content-Security-Policy (Helmet default)
  - Strict-Transport-Security (HSTS) - auto-enabled when secure cookies are on

### 2. Secure Cookies (Production)
- **Status:** ✅ Configured
- **File:** `packages/api/src/controllers/auth.ts:23-30`
- **Settings:**
  - `httpOnly: true` - Prevents XSS cookie theft
  - `secure: true` (production only) - HTTPS-only cookies
  - `sameSite: 'lax'` - CSRF protection
- **Verification:**
  ```typescript
  // Cookies are only set to secure=true when NODE_ENV=production
  secure: config.env === 'production'
  ```

### 3. Refresh Token Revocation on Logout
- **Status:** ✅ Implemented
- **File:** `packages/api/src/controllers/auth.ts:264-287`
- **Implementation:**
  ```typescript
  // Deletes refresh tokens from database on logout
  await prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
  await prisma.universityAdminRefreshToken.deleteMany({ where: { token: refreshToken } });

  // Clears cookies
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  ```
- **Security:** Prevents token reuse after logout

### 4. Rate Limiting
- **Status:** ✅ Configured
- **File:** `packages/api/src/app.ts:60-72`
- **Settings:** 100 requests per 15 minutes per IP
- **Configuration:**
  ```env
  RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
  RATE_LIMIT_MAX_REQUESTS=100
  ```

---

## ⚠️ Pre-Deployment Requirements (Manual Configuration)

### 5. HTTPS / TLS Certificate
- **Status:** ⚠️ **REQUIRED FOR PRODUCTION**
- **Current:** Apps run on HTTP (localhost development)
- **Production Requirement:**
  - **Obtain TLS certificate** (Let's Encrypt recommended)
  - **Configure nginx/reverse proxy** to terminate TLS
  - **Force HTTPS redirect** for all HTTP requests
  - **Enable HSTS header** (max-age=31536000; includeSubDomains)

**Recommended Setup (nginx):**
```nginx
server {
    listen 80;
    server_name applyonce.co.za admin.applyonce.co.za;
    return 301 https://$host$request_uri;  # Force HTTPS
}

server {
    listen 443 ssl http2;
    server_name applyonce.co.za;

    ssl_certificate /etc/letsencrypt/live/applyonce.co.za/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/applyonce.co.za/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    # HSTS
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    location / {
        proxy_pass http://localhost:3601;  # Student portal
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

server {
    listen 443 ssl http2;
    server_name admin.applyonce.co.za;

    # Same SSL config

    location / {
        proxy_pass http://localhost:3602;  # Admin portal
        # Same proxy headers
    }
}

server {
    listen 443 ssl http2;
    server_name api.applyonce.co.za;

    # Same SSL config

    location / {
        proxy_pass http://localhost:3600;  # API
        # Same proxy headers
    }
}
```

**Verification:**
```bash
curl -I https://applyonce.co.za
# Should return 200 + Strict-Transport-Security header
```

### 6. uploads/ Directory Protection
- **Status:** ✅ **SECURE BY DEFAULT** (not web-accessible)
- **Current Implementation:**
  - Files stored in `uploads/` directory (default: project root)
  - **NO nginx/web server route** serves this directory directly
  - Files ONLY accessible via authenticated API routes:
    - Students: `GET /v1/documents/:id` (own documents only)
    - Admins: `GET /v1/admin/documents/:id` (university isolation enforced)
- **Critical:** **NEVER add nginx location block for `/uploads`**

**WRONG (DO NOT DO THIS):**
```nginx
# ❌ NEVER add this - exposes all documents publicly
location /uploads {
    alias /home/kmaboe/applyonce/uploads;
}
```

**Verification:**
```bash
# Should return 404 (not accessible via web)
curl https://applyonce.co.za/uploads/filename.pdf

# Should work (authenticated API route)
curl -H "Cookie: accessToken=..." https://api.applyonce.co.za/v1/documents/:id
```

### 7. Environment Variables (Production)
- **Status:** ⚠️ **REQUIRED FOR PRODUCTION**
- **Critical Settings:**
  ```env
  NODE_ENV=production

  # Strong JWT secrets (64+ characters, random)
  JWT_ACCESS_SECRET=<generate-random-secret>
  JWT_REFRESH_SECRET=<generate-random-secret>

  # CORS origins (production domains only)
  CORS_ORIGINS=https://applyonce.co.za,https://admin.applyonce.co.za
  PORTAL_URL=https://applyonce.co.za
  ADMIN_URL=https://admin.applyonce.co.za

  # Email (real SMTP)
  EMAIL_MODE=production
  SMTP_HOST=smtp.gmail.com  # or SendGrid, AWS SES
  SMTP_PORT=587
  SMTP_USER=<smtp-username>
  SMTP_PASS=<smtp-password>
  SMTP_FROM=ApplyOnce <noreply@applyonce.co.za>

  # Database (production credentials)
  DATABASE_URL=postgresql://user:pass@localhost:3610/applyonce

  # Storage path (absolute path on server)
  STORAGE_LOCAL_PATH=/home/kmaboe/applyonce/uploads
  ```

**Generate secrets:**
```bash
# JWT secrets (64 random bytes as hex)
openssl rand -hex 64
```

### 8. PostgreSQL & Redis Binding
- **Status:** ✅ **CONFIGURED** (via docker-compose.yml)
- **Requirement:** Database and Redis MUST bind to `127.0.0.1` ONLY
- **Current:** Configured in `docker-compose.yml`
- **Verification:**
  ```bash
  ss -tlnp | grep 3610  # PostgreSQL should show 127.0.0.1:3610
  ss -tlnp | grep 3611  # Redis should show 127.0.0.1:3611
  ```

**NEVER expose:**
```yaml
# ❌ DO NOT DO THIS
ports:
  - "0.0.0.0:3610:5432"  # Exposes DB to internet

# ✅ CORRECT
ports:
  - "127.0.0.1:3610:5432"  # Localhost only
```

---

## 🔐 POPIA / Data Protection

### 9. Minors' Data (Age < 18)
- **Status:** ⚠️ **LEGAL REQUIREMENT PENDING**
- **Issue:** No parental consent field in Student model
- **Required:**
  - Add `parentalConsentGiven` boolean field
  - Validate age at registration (reject < 16, require consent for < 18)
  - Implement data retention policy (delete unverified accounts after 90 days)
- **Compliance:** POPIA (Protection of Personal Information Act)

### 10. ID Number Transmission
- **Status:** ⚠️ **REQUIRES HTTPS**
- **Issue:** SA ID numbers contain sensitive PII (race-coded pre-1994)
- **Requirement:** **MUST use HTTPS** (see item 5 above)
- **Verification:**
  - All student profile and admin application APIs return `idNumber`
  - These MUST be encrypted in transit (HTTPS)

---

## 🚨 Pre-Launch Checklist

Before deploying to production, verify ALL of the following:

- [ ] TLS certificate installed and HTTPS enforced
- [ ] HSTS header enabled (`Strict-Transport-Security`)
- [ ] `NODE_ENV=production` in environment
- [ ] Strong JWT secrets generated (64+ characters, random)
- [ ] Production CORS origins configured (no wildcards)
- [ ] Email SMTP configured and tested
- [ ] PostgreSQL and Redis bind to `127.0.0.1` only
- [ ] uploads/ directory NOT served by nginx
- [ ] Document download routes enforce isolation (student/admin)
- [ ] Parental consent field added (POPIA compliance)
- [ ] Data retention policy documented and scheduled
- [ ] Rate limiting tested under load
- [ ] All secrets removed from git history and .env.example
- [ ] Backup strategy operational (database + uploads)

---

## Testing Security Configuration

### Test HTTPS/HSTS
```bash
curl -I https://applyonce.co.za | grep -i strict-transport
# Should return: Strict-Transport-Security: max-age=31536000; includeSubDomains
```

### Test Secure Cookies
```bash
# Login and inspect Set-Cookie headers
curl -X POST https://api.applyonce.co.za/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}' \
  -v 2>&1 | grep Set-Cookie

# Should show: Secure; HttpOnly; SameSite=Lax
```

### Test uploads/ Protection
```bash
# Direct file access should fail (404)
curl -I https://applyonce.co.za/uploads/test-document.pdf
# Expected: 404 Not Found

# API access should work (with auth)
curl -H "Cookie: accessToken=..." https://api.applyonce.co.za/v1/documents/:id
# Expected: 200 OK (file download)
```

### Test Database Isolation
```bash
# PostgreSQL should NOT be reachable from internet
curl -v http://45.220.228.31:3610
# Expected: Connection refused or timeout

# Should work from localhost only
psql postgresql://user:pass@localhost:3610/applyonce
```

---

## Support & Questions

For security concerns or deployment assistance:
- **Founder:** MaboeKK (maboekeiketlile@gmail.com)
- **Repository:** https://github.com/MaboeKK/ApplyOnce (private)
- **Server:** 45.220.228.31 (kmaboe user, port range 3600-3699)
