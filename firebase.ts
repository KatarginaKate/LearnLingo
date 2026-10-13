import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  
  apiKey: "AIzaSyDutNP28xmLduKWF4ItZBUhQlAeCLpPFGM",
  authDomain: "learnlingo-2bc64.firebaseapp.com",
  databaseURL: "https://learnlingo-2bc64-default-rtdb.firebaseio.com",
  projectId: "learnlingo-2bc64",
  storageBucket: "learnlingo-2bc64.firebasestorage.app",
  messagingSenderId: "696559010801",
  appId: "1:696559010801:web:1ac383832eb2a5daeefa50",
  measurementId: "G-25N3M6D7SL"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
