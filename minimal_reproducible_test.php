<?php
/**
 * Minimal Reproducible Test for EuPlatesc FP_HASH (PHP Version)
 *
 * This script provides a minimal test case with hardcoded values to verify
 * that our hash calculation matches the expected output.
 *
 * Usage:
 * 1. Run: php minimal_reproducible_test.php
 * 2. Compare output with Node.js version
 * 3. Verify the exact MAC source string and FP_HASH
 */

// HARDCODED TEST VALUES (as suggested)
$amount = '1.00';                    // Simple amount without diacritics
$currency = 'RON';                   // Standard currency
$invoiceId = 'TEST-1234567890';     // Simple invoice ID
$orderDesc = 'Donatie Muzica pentru Viata'; // No diacritics, no dynamic mode
$merchId = '44840998571';          // From working PHP
$timestamp = '20251210110000';      // HARDCODED: YYYYMMDDHHMMSS (UTC)
$nonce = '1234567890abcdef1234567890abcdef'; // HARDCODED: 32 hex chars

// HARDCODED SECRET KEY (from working PHP)
$secretKey = 'EF094CE436BB597815AE00BFD681F9899A18B087';

echo "=== MINIMAL REPRODUCIBLE TEST (PHP) ===\n";
echo "Using HARDCODED values for exact reproducibility\n";
echo "Test Values:\n";
echo json_encode([
    'amount' => $amount,
    'currency' => $currency,
    'invoice_id' => $invoiceId,
    'order_desc' => $orderDesc,
    'merch_id' => $merchId,
    'timestamp' => $timestamp,
    'nonce' => $nonce
], JSON_PRETTY_PRINT);
echo "\n";
echo "Secret Key (first 6 chars): " . substr($secretKey, 0, 6) . "...\n";
echo "\n";

// Calculate FP_HASH using the exact same algorithm as our working PHP
$fieldsForMac = [
    $amount,
    $currency,
    $invoiceId,
    $orderDesc,
    $merchId,
    $timestamp,
    $nonce,
];

$macSource = '';
foreach ($fieldsForMac as $value) {
    $macSource .= strlen($value) . $value;
}

$binaryKey = pack('H*', $secretKey);
$fp_hash = hash_hmac('md5', $macSource, $binaryKey);

echo "=== CALCULATION RESULTS ===\n";
echo "MAC Source String: " . $macSource . "\n";
echo "MAC Source Length: " . strlen($macSource) . "\n";
echo "\n";
echo "FP_HASH: " . $fp_hash . "\n";
echo "FP_HASH Length: " . strlen($fp_hash) . "\n";
echo "\n";

echo "=== FIELD BREAKDOWN ===\n";
echo "Field values with lengths:\n";
echo "  amount: " . $amount . " | length: " . strlen($amount) . "\n";
echo "  currency: " . $currency . " | length: " . strlen($currency) . "\n";
echo "  invoice_id: " . $invoiceId . " | length: " . strlen($invoiceId) . "\n";
echo "  order_desc: " . $orderDesc . " | length: " . strlen($orderDesc) . "\n";
echo "  merch_id: " . $merchId . " | length: " . strlen($merchId) . "\n";
echo "  timestamp: " . $timestamp . " | length: " . strlen($timestamp) . "\n";
echo "  nonce: " . $nonce . " | length: " . strlen($nonce) . "\n";
echo "\n";

echo "=== EXPECTED MAC SOURCE ===\n";
echo "The MAC source should be:\n";
echo "21.004RON15TEST-123456789024Donatie Muzica pentru Viata11448409985711420251210110000321234567890abcdef1234567890abcdef\n";
echo "\n";
echo "Actual MAC Source: " . $macSource . "\n";
echo "Match: " . ($macSource === '21.004RON15TEST-123456789024Donatie Muzica pentru Viata11448409985711420251210110000321234567890abcdef1234567890abcdef' ? '✅' : '❌') . "\n";
echo "\n";

echo "=== HOW TO USE THIS TEST ===\n";
echo "1. Run this script: php minimal_reproducible_test.php\n";
echo "2. Compare the MAC source and FP_HASH with Node.js version\n";
echo "3. Run: node minimal_reproducible_test.js\n";
echo "4. Verify that both scripts produce the same FP_HASH\n";
echo "5. If they match, the algorithm is correct\n";
echo "6. If they don't match, there's a discrepancy to investigate\n";
echo "\n";

echo "=== COMPARISON WITH NODE.JS ===\n";
echo "Expected FP_HASH from Node.js: (run node minimal_reproducible_test.js to get this value)\n";
echo "Actual FP_HASH from PHP: " . $fp_hash . "\n";
echo "\n";

echo "=== TROUBLESHOOTING ===\n";
echo "If the FP_HASH doesn't match between PHP and Node.js:\n";
echo "1. Verify the field order is identical\n";
echo "2. Check that all values are strings (not numbers)\n";
echo "3. Ensure the timestamp format is exactly YYYYMMDDHHMMSS\n";
echo "4. Verify the nonce is exactly 32 hex characters\n";
echo "5. Confirm the secret key is identical\n";
echo "6. Check that the MAC source string construction is identical\n";
?>