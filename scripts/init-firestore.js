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

async function initializeFirestore() {
  try {
    console.log('Initializing Firestore donations collection...');

    // Add an initialization document to create the collection
    const initDoc = await addDoc(collection(db, 'donations'), {
      name: 'Initialization',
      amount: 0,
      message: 'Collection initialization document',
      created_at: new Date().toISOString(),
      isInit: true
    });

    console.log('Firestore collection initialized with document ID:', initDoc.id);
  } catch (error) {
    console.error('Error initializing Firestore:', error);
  }
}

// Run initialization
initializeFirestore();