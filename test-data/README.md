# Test Data — Sample Matric Certificates

Put your sample matric certificate files here to test the OCR → APS flow.

## How to use
1. Drop sample matric certificate images or PDFs in this folder
   (e.g. `sample-matric-1.jpg`, `sample-matric-2.pdf`)
2. When testing Phase 3 (OCR endpoint) and Phase 6 (portal upload),
   use these files as the upload.
3. Confirm the extracted marks and calculated APS match the certificate.

## Notes
- Real certificates with real personal info go in `test-data/real/`
  (this subfolder is gitignored and is NOT backed up to Drive — keep personal data out of the repo).
- For shareable/dummy samples, keep them directly in `test-data/`.
- OCR accuracy depends on image quality — clear, straight, well-lit scans read best.
- The confirmation screen lets you fix any misread value, so OCR doesn't need to be perfect.
