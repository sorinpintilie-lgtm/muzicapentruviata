const { initializeApp } = require('firebase/app');
const { getFirestore, doc, updateDoc } = require('firebase/firestore');

exports.handler = async (event, context) => {
  console.log('🔔 PAYMENT CALLBACK CALLED!');
  console.log('Method:', event.httpMethod);

  if (event.httpMethod !== 'POST') {
    console.log('❌ Wrong method');
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Initialize Firebase
    const firebaseConfig = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // Parse the form data from EuPlătesc
    const params = new URLSearchParams(event.body || '');
    const data = {};
    for (const [key, value] of params) {
      data[key] = value;
    }

    console.log('📦 Received callback data:', JSON.stringify(data, null, 2));

    // Extract key parameters
    const amount = data.amount;
    const currency = data.curr;
    const invoiceId = data.invoice_id;
    const epId = data.ep_id;
    const merchId = data.merch_id;
    const action = data.action;
    const message = data.message;
    const approval = data.approval;
    const timestamp = data.timestamp;
    const nonce = data.nonce;

    console.log('💳 Payment details:', { amount, currency, invoiceId, epId, action });

    // Get Firestore document reference
    const donationRef = doc(db, 'donations', invoiceId);

    // Update donation status based on payment result
    if (action === '0') {
      // Payment successful (action code 0 = success)
      console.log('✅ Payment successful - updating to confirmed');

      await updateDoc(donationRef, {
        status: 'confirmed',
        invoiceId: epId,
        message: message || 'Payment confirmed successfully',
        euplatescData: {
          amount,
          currency,
          epId,
          merchId,
          action,
          approval,
          timestamp,
          nonce
        }
      });

      console.log('✅ Document updated successfully');
      
      // Redirect to success page with parameters
      return {
        statusCode: 302,
        headers: {
          'Location': `/?euplatesc_return=success&amount=${amount}&invoice_id=${invoiceId}`,
          'Cache-Control': 'no-cache'
        },
        body: ''
      };

    } else {
      // Payment failed
      console.log('❌ Payment failed - updating to failed');

      await updateDoc(donationRef, {
        status: 'failed',
        invoiceId: epId || '',
        message: message || 'Payment failed',
        euplatescData: {
          amount,
          currency,
          epId,
          merchId,
          action,
          approval,
          timestamp,
          nonce
        }
      });

      console.log('✅ Document updated to failed');
      
      // Redirect to failed page with parameters
      return {
        statusCode: 302,
        headers: {
          'Location': `/?euplatesc_return=failed&amount=${amount}&invoice_id=${invoiceId}`,
          'Cache-Control': 'no-cache'
        },
        body: ''
      };
    }

  } catch (error) {
    console.error('💥 Callback error:', error);
    console.error('Error stack:', error.stack);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error', message: error.message })
    };
  }
};