# Security Best Practices

## 🔒 Sensitive Data Protection

### Environment Variables
All sensitive credentials are stored in Netlify environment variables:
- **MERCHANT_ID**: EuPlatesc merchant ID
- **SECRET_KEY**: EuPlatesc secret key for HMAC calculation
- **ENDPOINT**: EuPlatesc API endpoint

### .env File
The `.env` file contains local development credentials and is **NEVER** committed to Git (see `.gitignore`).

### Backend Security
The Netlify function (`netlify/functions/initiate-payment.js`) uses environment variables:
```javascript
const MERCHANT_ID = process.env.MERCHANT_ID;
const SECRET_KEY = process.env.SECRET_KEY;
const ENDPOINT = process.env.ENDPOINT;
```

### Frontend Security
The frontend code (`src/pages/DonatePage.jsx`) contains **NO** sensitive credentials:
- Merchant ID is empty in frontend code
- Secret key is empty in frontend code
- All payment processing happens through the secure Netlify function

## 🛡️ Security Measures

### 1. Environment Variables
- All credentials stored in Netlify dashboard
- Never hardcoded in source files
- Accessible only to authorized team members

### 2. Git Ignore
- `.env` files are ignored by Git
- Test files with placeholder credentials are ignored
- No sensitive data can be accidentally committed

### 3. HTTPS
- All communications use HTTPS
- Payment form submits to secure EuPlatesc endpoint
- No plaintext transmission of sensitive data

### 4. Hash Calculation
- HMAC-MD5 hash calculated server-side
- Secret key never exposed to frontend
- Hash calculation follows EuPlatesc specification exactly

## 🚨 Security Checklist

### Before Deployment
- [ ] Verify Netlify environment variables are set
- [ ] Test payment flow with small amounts
- [ ] Verify hash calculation matches EuPlatesc requirements
- [ ] Check that no credentials are hardcoded

### During Development
- [ ] Use `.env` file for local testing
- [ ] Never commit `.env` file
- [ ] Use placeholder values in test files
- [ ] Test with production-like environment when possible

### After Deployment
- [ ] Monitor payment transactions
- [ ] Check for any security warnings
- [ ] Verify all payments process correctly
- [ ] Test error handling and edge cases

## 📋 Setup Instructions

### Local Development
1. Create `.env` file with your credentials:
   ```env
   MERCHANT_ID=your_merchant_id
   SECRET_KEY=your_secret_key
   ENDPOINT=https://secure.euplatesc.ro/tdsprocess/tranzactd.php
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

### Production Deployment
1. Set environment variables in Netlify dashboard:
   - `MERCHANT_ID`
   - `SECRET_KEY`
   - `ENDPOINT`

2. Deploy to Netlify:
   ```bash
   git push origin main
   ```

3. Test payment flow thoroughly

## 🔍 Security Audit

### Files to Review
- `netlify/functions/initiate-payment.js` - Backend payment processing
- `src/pages/DonatePage.jsx` - Frontend payment interface
- `.gitignore` - Ensures sensitive files are ignored
- `SECURITY.md` - This security documentation

### Security Tools
- Netlify environment variables
- Git ignore patterns
- HTTPS enforcement
- Secure hash calculation

## 📝 Notes

- **Never** commit `.env` files
- **Never** hardcode credentials in source files
- **Always** use environment variables for sensitive data
- **Test** thoroughly before deploying to production
- **Monitor** transactions after deployment