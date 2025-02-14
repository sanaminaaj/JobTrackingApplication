// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqU79YtxLfZSmD-1iMUteYZgdY9tclzz0",
  authDomain: "jobtracker-ba97a.firebaseapp.com",
  projectId: "jobtracker-ba97a",
  storageBucket: "jobtracker-ba97a.firebasestorage.app",
  messagingSenderId: "688723953356",
  appId: "1:688723953356:web:1725e2ad0104f4ead7a469"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db = getFirestore(app);

export {auth,db};