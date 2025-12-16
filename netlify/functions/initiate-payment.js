const crypto = require('crypto');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID || process.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Note: In Netlify functions, environment variables are automatically available
// via process.env - no need for dotenv.config()
// EuPlatesc configuration from environment variables
// NOTE: These MUST be set in Netlify environment variables
// No fallback values to ensure we catch missing configurationa
const MERCHANT_ID = process.env.MERCHANT_ID;
const SECRET_KEY = process.env.SECRET_KEY;
const ENDPOINT = process.env.ENDPOINT || 'https://secure.euplatesc.ro/tdsprocess/tranzactd.php';

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  // Validate that required environment variables are set
  if (!MERCHANT_ID || !SECRET_KEY || !ENDPOINT) {
    console.error('Missing required environment variables:', {
      MERCHANT_ID: !!MERCHANT_ID,
      SECRET_KEY: !!SECRET_KEY,
      ENDPOINT: !!ENDPOINT
    });
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server configuration error - missing environment variables' }),
    };
  }

  try {
    const body = JSON.parse(event.body);
    let { amount, currency = 'RON', orderDesc = 'Donație Muzică pentru Viață', email = '' } = body;

    // Validate and format amount (exact PHP match: number_format((float)$amount, 2, '.', ''))
    if (!amount || !isFinite(amount) || amount <= 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid amount' }),
      };
    }
    amount = parseFloat(amount).toFixed(2);

    // Generate invoice ID (use provided one or create new)
    const invoiceId = body.invoiceId || ('MPV-' + Date.now());

    // Generate timestamp and nonce (exact PHP match)
    // PHP: gmdate('YmdHis') - GMT timestamp in YYYYMMDDHHMMSS format
    const now = new Date();
    const timestamp = now.getUTCFullYear().toString() +
                      (now.getUTCMonth() + 1).toString().padStart(2, '0') +
                      now.getUTCDate().toString().padStart(2, '0') +
                      now.getUTCHours().toString().padStart(2, '0') +
                      now.getUTCMinutes().toString().padStart(2, '0') +
                      now.getUTCSeconds().toString().padStart(2, '0');
    // PHP: bin2hex(random_bytes(16)) - 32 hex chars
    const nonce = crypto.randomBytes(16).toString('hex'); // 32 hex chars

    // Fields for MAC calculation (in exact order as per EuPlatesc docs)
    const fieldsForMac = [
      amount,
      currency,
      invoiceId,
      orderDesc,
      MERCHANT_ID,
      timestamp,
      nonce,
    ];

    // Build MAC source string: byteLength(value) + value for each field (exact PHP match)
    // CRITICAL: Use Buffer.byteLength() to match PHP's strlen() behavior with UTF-8 strings
    // JavaScript's .length counts code units, but PHP's strlen() counts bytes in UTF-8
    // For strings with diacritics (ă, ț, î, ș), this makes a difference!
    let macSource = '';
    fieldsForMac.forEach(value => {
      const v = String(value);
      const len = Buffer.byteLength(v, 'utf8'); // Match PHP's strlen() behavior
      macSource += len.toString() + v;
    });

    // Enhanced debug logging
    console.log('=== BACKEND FP_HASH DEBUG INFO ===');
    console.log('Field values (with types, char lengths, and byte lengths):');
    console.log('  amount:', amount, '| type:', typeof amount, '| chars:', amount.length, '| bytes:', Buffer.byteLength(amount, 'utf8'));
    console.log('  currency:', currency, '| type:', typeof currency, '| chars:', currency.length, '| bytes:', Buffer.byteLength(currency, 'utf8'));
    console.log('  invoiceId:', invoiceId, '| type:', typeof invoiceId, '| chars:', invoiceId.length, '| bytes:', Buffer.byteLength(invoiceId, 'utf8'));
    console.log('  orderDesc:', orderDesc, '| type:', typeof orderDesc, '| chars:', orderDesc.length, '| bytes:', Buffer.byteLength(orderDesc, 'utf8'));
    console.log('  merch_id:', MERCHANT_ID, '| type:', typeof MERCHANT_ID, '| chars:', MERCHANT_ID.length, '| bytes:', Buffer.byteLength(MERCHANT_ID, 'utf8'));
    console.log('  timestamp:', timestamp, '| type:', typeof timestamp, '| chars:', timestamp.length, '| bytes:', Buffer.byteLength(timestamp, 'utf8'));
    console.log('  nonce:', nonce, '| type:', typeof nonce, '| chars:', nonce.length, '| bytes:', Buffer.byteLength(nonce, 'utf8'));

    console.log('\nMAC Source String:', macSource);
    console.log('MAC Source String length:', macSource.length);

    console.log('\nSecret Key info:');
    console.log('  First 6 chars:', SECRET_KEY.substring(0, 6) + '...');
    console.log('  Total length:', SECRET_KEY.length);
    console.log('  Binary key length:', Buffer.from(SECRET_KEY, 'hex').length, 'bytes');

    // Compute HMAC-MD5 with hex key (exact PHP match: pack('H*', $secretKey))
    const binaryKey = Buffer.from(SECRET_KEY, 'hex');
    const fpHash = crypto.createHmac('md5', binaryKey).update(macSource, 'utf8').digest('hex');

    console.log('Calculated FP_HASH:', fpHash);
    console.log('===============================');

    // Return the payment data (using EXACT field names from working PHP form submission)
    // Note: The hash calculation uses the internal variable names, but the form field names
    // must match exactly what EuPlatesc expects (lowercase with underscores)
    const paymentData = {
      amount: amount,      // Form field name (lowercase)
      curr: currency,      // Form field name (lowercase)
      invoice_id: invoiceId, // Form field name (lowercase with underscore)
      order_desc: orderDesc, // Form field name (lowercase with underscore)
      merch_id: MERCHANT_ID, // Form field name (lowercase with underscore)
      timestamp: timestamp,  // Form field name (lowercase)
      nonce: nonce,        // Form field name (lowercase)
      fp_hash: fpHash,      // Form field name (lowercase with underscore)
      email: email,
      endpoint: ENDPOINT,
    };

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: JSON.stringify(paymentData),
    };

  } catch (error) {
    console.error('Payment initiation error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};