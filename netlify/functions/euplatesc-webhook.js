const { initializeApp } = require('firebase/app');
const { getFirestore, doc, updateDoc } = require('firebase/firestore');
const crypto = require('crypto');

// Initialize Firebase (only once)
let db;
const getDB = () => {
  if (!db) {
    const firebaseConfig = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID
    };

    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  }
  return db;
};

exports.handler = async (event, context) => {
  console.log('🔔 WEBHOOK CALLED!');
  console.log('Method:', event.httpMethod);

  // Only accept POST requests
  if (event.httpMethod !== 'POST') {
    console.log('❌ Wrong method');
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    // Parse the form data from EuPlătesc
    const params = new URLSearchParams(event.body);
    const data = {};
    for (const [key, value] of params) {
      data[key] = value;
    }

    console.log('📦 Received webhook data:', JSON.stringify(data, null, 2));

    // Validate the hash from EuPlătesc to prevent fraud
    const receivedHash = data.fp_hash;
    const merchantKey = process.env.SECRET_KEY;

    console.log('🔐 Received hash:', receivedHash);
    console.log('🔑 Merchant key exists:', !!merchantKey);

    // Build hash string according to EuPlătesc documentation
    const hashString = `${data.amount}${data.curr}${data.invoice_id}${data.ep_id}${data.merch_id}${data.action}${data.message}${data.approval}${data.timestamp}${data.nonce}${merchantKey}`;

    console.log('📝 Hash string:', hashString);

    const calculatedHash = crypto.createHash('md5').update(hashString).digest('hex').toUpperCase();

    console.log('🔐 Calculated hash:', calculatedHash);
    console.log('✅ Hash match:', receivedHash === calculatedHash);

    // Verify hash matches
    if (receivedHash !== calculatedHash) {
      console.error('❌ Invalid hash');
      console.error('Expected:', calculatedHash);
      console.error('Received:', receivedHash);
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid hash' })
      };
    }

    // Get Firestore instance
    const firestore = getDB();
    const donationDocId = data.invoice_id;
    const donationRef = doc(firestore, 'donations', donationDocId);

    console.log('📄 Updating document ID:', donationDocId);
    console.log('💳 Action code:', data.action);

    // Update donation status based on payment result
    if (data.action === '0') {
      // Payment successful (action code 0 = success)
      console.log('✅ Payment successful - updating to confirmed');

      await updateDoc(donationRef, {
        status: 'confirmed',
        invoiceId: data.ep_id,
        message: data.message || 'Payment confirmed successfully'
      });

      console.log('✅ Document updated successfully');
    } else {
      // Payment failed
      console.log('❌ Payment failed - updating to failed');

      await updateDoc(donationRef, {
        status: 'failed',
        invoiceId: data.ep_id || '',
        message: data.message || 'Payment failed'
      });

      console.log('✅ Document updated to failed');
    }

    return {
      statusCode: 200,
      body: 'OK'
    };

  } catch (error) {
    console.error('💥 Webhook error:', error);
    console.error('Error stack:', error.stack);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error', message: error.message })
    };
  }
};