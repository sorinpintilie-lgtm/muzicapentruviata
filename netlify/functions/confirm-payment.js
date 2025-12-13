const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');

// Firebase configuration (same as in the app)
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const body = JSON.parse(event.body);
    const { amount, name, invoiceId, status } = body;

    // Validate required fields
    if (!amount || !invoiceId || !status) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Only add donor if payment was successful
    if (status !== 'confirmed' && status !== 'success') {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Payment not confirmed' }),
      };
    }

    // Validate amount
    const parsedAmount = parseFloat(amount);
    if (!isFinite(parsedAmount) || parsedAmount <= 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid amount' }),
      };
    }

    // Add donor to Firestore
    const donorData = {
      name: name || 'Anonim',
      amount: parsedAmount,
      message: `Donație confirmată prin EuPlatesc - Invoice: ${invoiceId}`,
      created_at: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, 'donations'), donorData);

    console.log('Donation added successfully:', {
      id: docRef.id,
      amount: parsedAmount,
      name: name || 'Anonim'
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: JSON.stringify({
        success: true,
        donationId: docRef.id,
        message: 'Donation recorded successfully'
      }),
    };

  } catch (error) {
    console.error('Error confirming payment:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};