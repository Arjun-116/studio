import {initializeApp, getApps, getApp} from 'firebase/app';

const firebaseConfig = {
  projectId: 'studio-5617265995-f804a',
  appId: '1:719512429495:web:021e635b1c5230aa163e32',
  storageBucket: 'studio-5617265995-f804a.firebasestorage.app',
  apiKey: 'AIzaSyDwr-UYBdkc327_SgWVXFJ0gyOr52CbKio',
  authDomain: 'studio-5617265995-f804a.firebaseapp.com',
  measurementId: '',
  messagingSenderId: '719512429495',
};

// Initialize Firebase
export const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
