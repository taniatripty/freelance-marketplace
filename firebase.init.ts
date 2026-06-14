
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAB0kqdleaCESGMocagHqZxWsYw7T0Qlls",
  authDomain: "freelance-auth-cd39a.firebaseapp.com",
  projectId: "freelance-auth-cd39a",
  storageBucket: "freelance-auth-cd39a.firebasestorage.app",
  messagingSenderId: "970779777023",
  appId: "1:970779777023:web:98f5277b0df91fbb3e79ca",
  measurementId: "G-HM8VEXDL1H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);