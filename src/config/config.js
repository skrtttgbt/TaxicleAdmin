// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfx_T4WDJB4411wPLS9BrHjcM59fXNkJQ",
  authDomain: "taxicle-img.firebaseapp.com",
  projectId: "taxicle-img",
  storageBucket: "taxicle-img.appspot.com",
  messagingSenderId: "999134669505",
  appId: "1:999134669505:web:8d4789449f1c71fbb2c240",
  measurementId: "G-ERN066LXB1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDB = getStorage(app)