import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

console.log('Firebase config loaded:', {
  apiKey: firebaseConfig.apiKey ? 'Present' : 'Missing',
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
  storageBucket: firebaseConfig.storageBucket,
  messagingSenderId: firebaseConfig.messagingSenderId ? 'Present' : 'Missing',
  appId: firebaseConfig.appId ? 'Present' : 'Missing'
});

// Additional production debugging
console.log('Environment details:', {
  mode: import.meta.env.MODE,
  prod: import.meta.env.PROD,
  dev: import.meta.env.DEV,
  baseUrl: import.meta.env.BASE_URL,
  currentUrl: typeof window !== 'undefined' ? window.location.href : 'Server-side'
});

// Validate critical config values
if (!firebaseConfig.apiKey) {
  console.error('CRITICAL: Firebase API key is missing!');
}
if (!firebaseConfig.authDomain) {
  console.error('CRITICAL: Firebase auth domain is missing!');
}
if (!firebaseConfig.projectId) {
  console.error('CRITICAL: Firebase project ID is missing!');
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

console.log('Firebase services initialized:', {
  auth: !!auth,
  db: !!db,
  storage: !!storage
});

// Test Firebase connection
if (typeof window !== 'undefined') {
  auth.onAuthStateChanged((user) => {
    console.log('Auth state changed:', {
      isAuthenticated: !!user,
      uid: user?.uid,
      email: user?.email,
      emailVerified: user?.emailVerified,
      timestamp: new Date().toISOString()
    });
  });
}

export default app;
