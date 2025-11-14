import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAGHtx7sP5ROtxFbPrtAyX2In_jIERlRpQ",
  authDomain: "code-archive-f7f9d.firebaseapp.com",
  projectId: "code-archive-f7f9d",
  storageBucket: "code-archive-f7f9d.firebasestorage.app",
  messagingSenderId: "722103492468",
  appId: "1:722103492468:web:860018de03f4036d179621"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);