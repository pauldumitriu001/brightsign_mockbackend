// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "brightsignmockup.firebaseapp.com",
  databaseURL: "https://brightsignmockup-default-rtdb.firebaseio.com",
  projectId: "brightsignmockup",
  storageBucket: "brightsignmockup.firebasestorage.app",
  messagingSenderId: "575434037521",
  appId: "1:575434037521:web:f9dad3b5fecea4a4b794b0",
  measurementId: "G-N6FGSLGDC6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);

export default app;
