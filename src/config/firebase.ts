import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBHVciI2nDlmI205-lo5qoC-XJl89BVu-I",
  authDomain: "academic-staff-8aa67.firebaseapp.com",
  projectId: "academic-staff-8aa67",
  storageBucket: "academic-staff-8aa67.firebasestorage.app",
  messagingSenderId: "182066541287",
  appId: "1:182066541287:web:195ae77afe27c1686ba842"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);