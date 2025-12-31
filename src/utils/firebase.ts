// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvaMzABRwl7Mk4kF9h2RqQV7Q-7x6m-oc",
  authDomain: "chiptalk-poker-prod.firebaseapp.com",
  projectId: "chiptalk-poker-prod",
  storageBucket: "chiptalk-poker-prod.firebasestorage.app",
  messagingSenderId: "666255988426",
  appId: "1:666255988426:web:2a2384b4ff3b6be7ca0633",
  measurementId: "G-TRG30GVFS4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Optional: analytics (only works in browser)
export const analytics = getAnalytics(app);