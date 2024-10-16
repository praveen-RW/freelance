// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database"; // Import Realtime Database functions

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqmi3dOFtXUIRlM0EtMlnBgr0iHgwlsqY",
  authDomain: "noise-9f90c.firebaseapp.com",
  databaseURL: "https://noise-9f90c-default-rtdb.firebaseio.com",
  projectId: "noise-9f90c",
  storageBucket: "noise-9f90c.appspot.com",
  messagingSenderId: "236585409226",
  appId: "1:236585409226:web:f556826a15b659295e3233",
  measurementId: "G-FS7S0FP1FV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app); // Initialize Realtime Database

export { db };
