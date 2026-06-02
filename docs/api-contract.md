# ApplyOnce — API Contract

Base URL: `https://api.applyonce.co.za/v1` (production) | `http://localhost:3001/v1` (dev)

All responses follow the envelope format:
```json
{ "success": true, "data": { ... } }
{ "success": false, "error": { "code": "ERROR_CODE", "message": "Human-readable message" } }
```

Authentication: `Authorization: Bearer <access_token>` on all protected routes.

---

## Auth

### POST /auth/register
Register a new student account.

**Body:**
```json
{
  "idNumber": "9001015009087",
  "email": "student@example.com",
  "phone": "0821234567",
  "password": "SecurePassword123!",
  "firstName": "Thabo",
  "lastName": "Mokoena",
  "dateOfBirth": "1990-01-01"
}
```

**Response 201:**
```json
{
  "success": true,
  "data": {
    "student": { "id": "clxxx", "email": "student@example.com", "firstName": "Thabo" },
    "accessToken": "eyJ...",
    "refreshToken": "eyJ..."
  }
}
```

---

### POST /auth/login
```json
{ "email": "student@example.com", "password": "SecurePassword123!" }
```
**Response 200:** Same as register response.

---

### POST /auth/refresh
```json
{ "refreshToken": "eyJ..." }
```
**Response 200:**
```json
{ "success": true, "data": { "accessToken": "eyJ...", "refreshToken": "eyJ..." } }
```

---

### POST /auth/logout  🔒
Invalidates the refresh token.
```json
{ "refreshToken": "eyJ..." }
```
**Response 200:** `{ "success": true, "data": null }`

---

## Student Profile

### GET /students/me  🔒
Returns the authenticated student's full profile.

**Response 200:**
```json
{
  "success": true,
  "data": {
    "id": "clxxx",
    "firstName": "Thabo",
    "lastName": "Mokoena",
    "email": "student@example.com",
    "phone": "0821234567",
    "idNumber": "9001015009087",
    "profileComplete": true,
    "subjectResults": [...],
    "documents": [...]
  }
}
```

---

### PUT /students/me  🔒
Update student profile details.

**Body:** Any subset of student fields (partial update).

---

### PUT /students/me/subjects  🔒
Save/replace matric subject results.

**Body:**
```json
{
  "matricYear": 2024,
  "school": "Soweto High School",
  "subjects": [
    { "subject": "english_home", "mark": 72 },
    { "subject": "mathematics", "mark": 65 },
    { "subject": "physical_sciences", "mark": 58 },
    { "subject": "life_sciences", "mark": 71 },
    { "subject": "accounting", "mark": 80 },
    { "subject": "history", "mark": 68 },
    { "subject": "life_orientation", "mark": 75 }
  ]
}
```

---

## APS

### POST /aps/calculate  🔒
Calculate APS from current subject results.

**Response 200:**
```json
{
  "success": true,
  "data": {
    "totalAPS": 34,
    "totalAPSWithLO": 38,
    "totalAPSWithLOCapped": 37,
    "subjects": [
      { "subject": "mathematics", "mark": 65, "apsPoints": 5, "included": true }
    ],
    "isValid": true
  }
}
```

---

### GET /aps/matches  🔒
Returns all programmes the student qualifies for (or nearly qualifies for).

**Query params:**
- `?qualified=true` — only programmes they meet all requirements for
- `?province=gauteng` — filter by province
- `?type=traditional` — filter by university type

**Response 200:**
```json
{
  "success": true,
  "data": {
    "studentAPS": 34,
    "matches": [
      {
        "universityId": "uj",
        "universityName": "University of Johannesburg",
        "programmeId": "uj-bcom",
        "programmeName": "BCom",
        "apsMinimum": 28,
        "meetsRequirements": true,
        "missingRequirements": [],
        "applicationFeeZAR": 200,
        "applyOnceFeeZAR": 5
      }
    ]
  }
}
```

---

## Documents

### POST /documents  🔒
Upload a document. `multipart/form-data`.

**Fields:**
- `file` — the document file (PDF, JPG, PNG; max 5MB)
- `type` — `id_document` | `matric_certificate` | `proof_of_residence`

**Response 201:**
```json
{
  "success": true,
  "data": {
    "id": "doc_xxx",
    "type": "matric_certificate",
    "fileName": "matric_results.pdf",
    "uploadedAt": "2026-05-01T10:00:00Z"
  }
}
```

---

### GET /documents  🔒
List all uploaded documents for the authenticated student.

---

### DELETE /documents/:id  🔒
Delete a document.

---

### POST /documents/scan-matric  🔒
Upload a matric result image/PDF. Server runs OCR and returns extracted subject marks.

**Fields:** `file` — image or PDF of matric result

**Response 200:**
```json
{
  "success": true,
  "data": {
    "extractedSubjects": [
      { "subject": "Mathematics", "mark": 65, "confidence": 0.97 }
    ],
    "rawText": "...",
    "documentId": "doc_xxx"
  }
}
```

---

## Universities

### GET /universities
List all universities. No auth required.

**Query params:**
- `?province=gauteng`
- `?type=traditional|university_of_technology|comprehensive`
- `?integrated=true` — only those with ApplyOnce integration

---

### GET /universities/:id
Full university detail including all programmes and requirements. No auth required.

---

### GET /universities/:id/programmes
All programmes at a specific university, with APS requirements. No auth required.

---

## Applications

### POST /applications  🔒
Create one or more draft applications.

**Body:**
```json
{
  "selections": [
    { "universityId": "uj", "programmeId": "uj-bcom" },
    { "universityId": "wits", "programmeId": "wits-bcom" }
  ]
}
```

**Response 201:**
```json
{
  "success": true,
  "data": {
    "applications": [
      { "id": "app_xxx", "universityId": "uj", "status": "draft" }
    ]
  }
}
```

---

### GET /applications  🔒
List all applications for the authenticated student.

**Query params:**
- `?status=draft|submitted|accepted` — filter by status

---

### GET /applications/:id  🔒
Get a single application with full detail.

---

### DELETE /applications/:id  🔒
Delete a draft application. Cannot delete submitted applications.

---

## Payments

### POST /payments/initiate  🔒
Create a payment for one or more draft applications.

**Body:**
```json
{
  "applicationIds": ["app_xxx", "app_yyy"],
  "returnUrl": "applyonce://payment-complete",
  "cancelUrl": "applyonce://payment-cancelled"
}
```

**Response 201:**
```json
{
  "success": true,
  "data": {
    "paymentId": "pay_xxx",
    "paymentUrl": "https://payfast.co.za/...",
    "totalAmountZAR": 415,
    "breakdown": [
      {
        "universityId": "uj",
        "universityName": "University of Johannesburg",
        "applicationFeeZAR": 200,
        "serviceFeeZAR": 5,
        "totalZAR": 205
      },
      {
        "universityId": "wits",
        "universityName": "Wits University",
        "applicationFeeZAR": 100,
        "serviceFeeZAR": 5,
        "totalZAR": 105
      }
    ]
  }
}
```

---

### POST /payments/notify
PayFast ITN webhook. Called by PayFast after payment. **Not authenticated by JWT** — verified by PayFast signature.

**Body:** PayFast ITN payload (form-encoded)

---

### GET /payments/:id  🔒
Get payment status and breakdown.

---

## Error Codes

| Code | HTTP | Meaning |
|---|---|---|
| `INVALID_CREDENTIALS` | 401 | Wrong email/password |
| `TOKEN_EXPIRED` | 401 | JWT expired |
| `TOKEN_INVALID` | 401 | Bad token |
| `NOT_FOUND` | 404 | Resource not found |
| `DUPLICATE_EMAIL` | 409 | Email already registered |
| `DUPLICATE_ID_NUMBER` | 409 | ID number already registered |
| `VALIDATION_ERROR` | 422 | Request body failed validation |
| `PROFILE_INCOMPLETE` | 422 | Student profile missing required fields |
| `APPLICATION_NOT_DRAFT` | 409 | Cannot modify non-draft application |
| `PAYMENT_FAILED` | 402 | Payment was not successful |
| `UNIVERSITY_UNAVAILABLE` | 503 | University API temporarily unavailable |
| `INTERNAL_ERROR` | 500 | Something went wrong on our end |
