// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);