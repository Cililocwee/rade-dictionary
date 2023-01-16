import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCyacVoqU0hcV23jw6ml9p6UFpdvams8Es",
  authDomain: "rade-dictionary.firebaseapp.com",
  projectId: "rade-dictionary",
  storageBucket: "rade-dictionary.appspot.com",
  messagingSenderId: "600569145539",
  appId: "1:600569145539:web:5d32794c975bda893e1a76",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
