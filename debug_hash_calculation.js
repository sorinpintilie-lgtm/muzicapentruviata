/**
 * EuPlatesc FP_HASH Debug Script
 *
 * This script helps debug the exact hash calculation to ensure it matches
 * what EuPlatesc expects. It provides detailed logging of each step.
 *
 * Usage:
 * 1. Set your actual merchant credentials in the .env file
 * 2. Run: node debug_hash_calculation.js
 * 3. Compare the output with EuPlatesc documentation
 */

const crypto = require('crypto');
require('dotenv').config();

// Configuration - should match your .env file
const MERCHANT_ID = process.env.MERCHANT_ID || 'YOUR_MERCHANT_ID';
const SECRET_KEY = process.env.SECRET_KEY || 'YOUR_SECRET_KEY';

// Test data - should match what you're sending to EuPlatesc
const testData = {
  amount: '1.00',          // Must be string with 2 decimal places
  currency: 'RON',         // Must match what you send
  invoice_id: 'TEST-12345',// Must match your invoice ID format
  order_desc: 'Test Payment', // Must match your description
  merch_id: MERCHANT_ID,   // Your merchant ID
  timestamp: '20251210101924', // Format: YYYYMMDDHHMMSS (UTC)
  nonce: 'testnonce123456789012345678901234' // Must be 32 hex chars
};

console.log('=== EuPlatesc FP_HASH Debug ===');
console.log('Configuration:', {
  MERCHANT_ID: MERCHANT_ID.substring(0, 6) + '...',
  SECRET_KEY: SECRET_KEY.substring(0, 6) + '...',
  hasMerchantId: !!MERCHANT_ID,
  hasSecretKey: !!SECRET_KEY
});

console.log('\nTest Data:', testData);

// Step 1: Build MAC source string
console.log('\n=== Step 1: Build MAC Source String ===');

const fieldsForMac = [
  testData.amount,
  testData.currency,
  testData.invoice_id,
  testData.order_desc,
  testData.merch_id,
  testData.timestamp,
  testData.nonce,
];

console.log('Fields in order:');
fieldsForMac.forEach((field, index) => {
  console.log(`  ${index + 1}. "${field}" (length: ${field.length})`);
});

let macSource = '';
fieldsForMac.forEach(value => {
  macSource += value.length.toString() + value;
});

console.log('\nMAC Source String:', macSource);
console.log('MAC Source Length:', macSource.length);

// Step 2: Convert secret key to binary
console.log('\n=== Step 2: Convert Secret Key ===');

const binaryKey = Buffer.from(SECRET_KEY, 'hex');
console.log('Secret Key (hex):', SECRET_KEY.substring(0, 6) + '...');
console.log('Secret Key (binary) length:', binaryKey.length, 'bytes');

// Step 3: Calculate HMAC-MD5
console.log('\n=== Step 3: Calculate HMAC-MD5 ===');

const fpHash = crypto.createHmac('md5', binaryKey).update(macSource, 'utf8').digest('hex');

console.log('FP_HASH:', fpHash);
console.log('FP_HASH length:', fpHash.length);

// Step 4: Verify the hash calculation
console.log('\n=== Step 4: Verification ===');

console.log('Expected FP_HASH format: 32 character hex string');
console.log('Actual FP_HASH format:', fpHash.length === 32 ? '✅ CORRECT' : '❌ INCORRECT');

console.log('\n=== Final Output ===');
console.log('Use these values in your EuPlatesc form:');
console.log({
  amount: testData.amount,
  curr: testData.currency,
  invoice_id: testData.invoice_id,
  order_desc: testData.order_desc,
  merch_id: testData.merch_id,
  timestamp: testData.timestamp,
  nonce: testData.nonce,
  fp_hash: fpHash
});

console.log('\n=== Troubleshooting ===');
console.log('If you still get FP_HASH error:');
console.log('1. Verify MERCHANT_ID and SECRET_KEY in .env file');
console.log('2. Check field order matches EuPlatesc documentation');
console.log('3. Ensure all values are strings (not numbers)');
console.log('4. Verify timestamp format: YYYYMMDDHHMMSS (UTC)');
console.log('5. Ensure nonce is exactly 32 hex characters');
console.log('6. Check that amount has exactly 2 decimal places');

console.log('\n=== Common Issues ===');
console.log('- Wrong field order');
console.log('- Using numbers instead of strings');
console.log('- Incorrect timestamp format');
console.log('- Nonce not being 32 hex chars');
console.log('- Wrong merchant credentials');
console.log('- Using wrong secret key');