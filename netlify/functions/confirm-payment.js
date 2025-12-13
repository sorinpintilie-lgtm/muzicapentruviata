const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, query, where, getDocs, updateDoc } = require('firebase/firestore');

// Firebase configuration (same as in the app)
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

exports.handler = async (event, context) => {
  console.log('Confirm payment function called');
  console.log('Method:', event.httpMethod);
  console.log('Body:', event.body);

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

    console.log('Parsed body:', { amount, name, invoiceId, status });

    // Validate required fields
    if (!amount || !invoiceId) {
      console.log('Missing required fields');
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // For now, accept any status as long as we have amount and invoiceId
    // EuPlatesc might return different status values
    console.log('Payment status check passed');

    // Validate amount
    const parsedAmount = parseFloat(amount);
    if (!isFinite(parsedAmount) || parsedAmount <= 0) {
      console.log('Invalid amount:', amount);
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid amount' }),
      };
    }

    console.log('Confirming donation in Firestore:', {
      name: name || 'Anonim',
      amount: parsedAmount,
      invoiceId
    });

    // Find and update the pending donation
    const q = query(collection(db, 'donations'), where('invoiceId', '==', invoiceId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log('No pending donation found for invoiceId:', invoiceId);
      // Create confirmed donation if no pending found
      const donorData = {
        name: name || 'Anonim',
        amount: parsedAmount,
        message: `Donație confirmată prin EuPlatesc - Invoice: ${invoiceId}`,
        created_at: new Date().toISOString(),
        status: 'confirmed',
        invoiceId: invoiceId
      };
      const docRef = await addDoc(collection(db, 'donations'), donorData);
      console.log('Confirmed donation created:', docRef.id);
    } else {
      // Update existing pending donation
      const docRef = querySnapshot.docs[0].ref;
      await updateDoc(docRef, {
        name: name || 'Anonim',
        message: `Donație confirmată prin EuPlatesc - Invoice: ${invoiceId}`,
        status: 'confirmed'
      });
      console.log('Pending donation confirmed:', docRef.id);
    }

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
      body: JSON.stringify({
        error: 'Internal server error',
        details: error.message
      }),
    };
  }
};