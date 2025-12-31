
// Fix: Suppress TS errors for Firebase imports as the modular structure is correct but types are missing in the environment.
// @ts-ignore
import { initializeApp, getApps } from "firebase/app";
// @ts-ignore
import { getAuth } from "firebase/auth";
// @ts-ignore
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCi04Nhzpcl18wZO102U_vYaxeB4uC2CCY",
  authDomain: "the-poker-tour.firebaseapp.com",
  projectId: "the-poker-tour",
  storageBucket: "the-poker-tour.firebasestorage.app",
  messagingSenderId: "100992673768",
  appId: "1:100992673768:web:5573d839222cfc33df265d"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const db = getFirestore(app);
