// Firebase 설정 파일
// TODO: Firebase Console에서 본인의 설정값으로 교체해야 합니다
// https://console.firebase.google.com 에서 프로젝트 생성 후 설정값 복사

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase 프로젝트 설정 (나중에 본인 값으로 교체하세요!)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Authentication과 Firestore 인스턴스 export
export const auth = getAuth(app);
export const db = getFirestore(app);
