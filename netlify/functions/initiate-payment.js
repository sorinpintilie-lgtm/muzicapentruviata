const crypto = require('crypto');

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

    // Generate invoice ID
    const invoiceId = 'MPV-' + Date.now();

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

    // Build MAC source string: length(value) + value for each field (exact PHP match)
    let macSource = '';
    fieldsForMac.forEach(value => {
      macSource += value.length.toString() + value;
    });

    // Enhanced debug logging
    console.log('=== BACKEND FP_HASH DEBUG INFO ===');
    console.log('Field values (with types and lengths):');
    console.log('  amount:', amount, '| type:', typeof amount, '| length:', amount.length);
    console.log('  currency:', currency, '| type:', typeof currency, '| length:', currency.length);
    console.log('  invoiceId:', invoiceId, '| type:', typeof invoiceId, '| length:', invoiceId.length);
    console.log('  orderDesc:', orderDesc, '| type:', typeof orderDesc, '| length:', orderDesc.length);
    console.log('  merch_id:', MERCHANT_ID, '| type:', typeof MERCHANT_ID, '| length:', MERCHANT_ID.length);
    console.log('  timestamp:', timestamp, '| type:', typeof timestamp, '| length:', timestamp.length);
    console.log('  nonce:', nonce, '| type:', typeof nonce, '| length:', nonce.length);

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

    // Return the payment data (using EXACT field names from working PHP)
    const paymentData = {
      Ammount: amount,
      Currency: currency,
      InvoiceID: invoiceId,
      OrderDesc: orderDesc,
      MerchantID: MERCHANT_ID,
      TranTimeStamp: timestamp,
      Nonce: nonce,
      FP_HASH: fpHash,
      email,
      back_to_site: `${process.env.URL || 'https://muzicapentruviata.netlify.app'}/`, // Return URL
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