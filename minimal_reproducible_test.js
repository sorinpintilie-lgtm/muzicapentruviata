/**
 * Minimal Reproducible Test for EuPlatesc FP_HASH
 *
 * This script provides a minimal test case with hardcoded values to verify
 * that our hash calculation matches the expected output.
 *
 * Usage:
 * 1. Run: node minimal_reproducible_test.js
 * 2. Compare output with EuPlatesc documentation examples
 * 3. Verify the exact MAC source string and FP_HASH
 */

const crypto = require('crypto');

// HARDCODED TEST VALUES (as suggested)
const TEST_VALUES = {
  amount: '1.00',                    // Simple amount without diacritics
  currency: 'RON',                   // Standard currency
  invoice_id: 'TEST-1234567890',     // Simple invoice ID
  order_desc: 'Donatie Muzica pentru Viata', // No diacritics, no dynamic mode
  merch_id: '44840998571',          // From working PHP
  timestamp: '20251210110000',      // HARDCODED: YYYYMMDDHHMMSS (UTC)
  nonce: '1234567890abcdef1234567890abcdef' // HARDCODED: 32 hex chars
};

// HARDCODED SECRET KEY (from working PHP)
const SECRET_KEY = 'EF094CE436BB597815AE00BFD681F9899A18B087';

console.log('=== MINIMAL REPRODUCIBLE TEST ===');
console.log('Using HARDCODED values for exact reproducibility');
console.log('Test Values:', TEST_VALUES);
console.log('Secret Key (first 6 chars):', SECRET_KEY.substring(0, 6) + '...');
console.log('');

/**
 * Calculate FP_HASH using the exact same algorithm as our Netlify function
 */
function calculateFPHash(amount, currency, invoiceId, orderDesc, merchId, timestamp, nonce) {
  // Fields for MAC calculation (in exact order as per EuPlatesc docs)
  const fieldsForMac = [
    amount,
    currency,
    invoiceId,
    orderDesc,
    merchId,
    timestamp,
    nonce,
  ];

  // Build MAC source string: length(value) + value for each field
  let macSource = '';
  fieldsForMac.forEach(value => {
    macSource += value.length.toString() + value;
  });

  // Compute HMAC-MD5 with hex key
  const binaryKey = Buffer.from(SECRET_KEY, 'hex');
  const fpHash = crypto.createHmac('md5', binaryKey).update(macSource, 'utf8').digest('hex');

  return { macSource, fpHash };
}

// Calculate the hash
const result = calculateFPHash(
  TEST_VALUES.amount,
  TEST_VALUES.currency,
  TEST_VALUES.invoice_id,
  TEST_VALUES.order_desc,
  TEST_VALUES.merch_id,
  TEST_VALUES.timestamp,
  TEST_VALUES.nonce
);

console.log('=== CALCULATION RESULTS ===');
console.log('MAC Source String:', result.macSource);
console.log('MAC Source Length:', result.macSource.length);
console.log('');
console.log('FP_HASH:', result.fpHash);
console.log('FP_HASH Length:', result.fpHash.length);
console.log('');

console.log('=== FIELD BREAKDOWN ===');
console.log('Field values with lengths:');
console.log('  amount:', TEST_VALUES.amount, '| length:', TEST_VALUES.amount.length);
console.log('  currency:', TEST_VALUES.currency, '| length:', TEST_VALUES.currency.length);
console.log('  invoice_id:', TEST_VALUES.invoice_id, '| length:', TEST_VALUES.invoice_id.length);
console.log('  order_desc:', TEST_VALUES.order_desc, '| length:', TEST_VALUES.order_desc.length);
console.log('  merch_id:', TEST_VALUES.merch_id, '| length:', TEST_VALUES.merch_id.length);
console.log('  timestamp:', TEST_VALUES.timestamp, '| length:', TEST_VALUES.timestamp.length);
console.log('  nonce:', TEST_VALUES.nonce, '| length:', TEST_VALUES.nonce.length);
console.log('');

console.log('=== EXPECTED MAC SOURCE ===');
console.log('The MAC source should be:');
console.log('21.004RON15TEST-123456789024Donatie Muzica pentru Viata11448409985711420251210110000321234567890abcdef1234567890abcdef');
console.log('');
console.log('Actual MAC Source:', result.macSource);
console.log('Match:', result.macSource === '21.004RON15TEST-123456789024Donatie Muzica pentru Viata11448409985711420251210110000321234567890abcdef1234567890abcdef' ? '✅' : '❌');
console.log('');

console.log('=== HOW TO USE THIS TEST ===');
console.log('1. Run this script: node minimal_reproducible_test.js');
console.log('2. Compare the MAC source and FP_HASH with EuPlatesc documentation');
console.log('3. Use these exact same hardcoded values in your PHP test script');
console.log('4. Verify that both scripts produce the same FP_HASH');
console.log('5. If they match, the algorithm is correct');
console.log('6. If they don\'t match, there\'s a discrepancy to investigate');
console.log('');

console.log('=== PHP EQUIVALENT TEST ===');
console.log('Create a PHP script with these exact values:');
console.log('<?php');
console.log('$amount = "1.00";');
console.log('$currency = "RON";');
console.log('$invoiceId = "TEST-1234567890";');
console.log('$orderDesc = "Donatie Muzica pentru Viata";');
console.log('$merchId = "44840998571";');
console.log('$timestamp = "20251210110000";');
console.log('$nonce = "1234567890abcdef1234567890abcdef";');
console.log('$secretKey = "EF094CE436BB597815AE00BFD681F9899A18B087";');
console.log('');
console.log('$fieldsForMac = [$amount, $currency, $invoiceId, $orderDesc, $merchId, $timestamp, $nonce];');
console.log('$macSource = "";');
console.log('foreach ($fieldsForMac as $value) {');
console.log('    $macSource .= strlen($value) . $value;');
console.log('}');
console.log('$binaryKey = pack("H*", $secretKey);');
console.log('$fp_hash = hash_hmac("md5", $macSource, $binaryKey);');
console.log('echo "FP_HASH: " . $fp_hash;');
console.log('?>');
console.log('');

console.log('=== TROUBLESHOOTING ===');
console.log('If the FP_HASH doesn\'t match EuPlatesc expectations:');
console.log('1. Verify the field order matches EuPlatesc documentation');
console.log('2. Check that all values are strings (not numbers)');
console.log('3. Ensure the timestamp format is exactly YYYYMMDDHHMMSS');
console.log('4. Verify the nonce is exactly 32 hex characters');
console.log('5. Confirm the secret key is correct');
console.log('6. Check that the MAC source string construction is correct');