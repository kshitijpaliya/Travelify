// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Correct import for Firestore
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLhS4NKMQXukzZ5u3DZ6hORHTIciu0OsY",
  authDomain: "travelify-a379c.firebaseapp.com",
  projectId: "travelify-a379c",
  storageBucket: "travelify-a379c.firebasestorage.app",
  messagingSenderId: "436232417433",
  appId: "1:436232417433:web:f871ff01137a88ccfd0808",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
