import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA0cFHRG830h30AaKmGyVkMzfvUMb41y_I",
  authDomain: "mckay-3a0dc.firebaseapp.com",
  projectId: "mckay-3a0dc",
  storageBucket: "mckay-3a0dc.firebasestorage.app",
  messagingSenderId: "118416315610",
  appId: "1:118416315610:web:8d4e2282eda018617841e3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);