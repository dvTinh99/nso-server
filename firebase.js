// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOk5TN3ZUZiznLBrHG1w1End6VH5Dbs7Q",
  authDomain: "nso-gamble.firebaseapp.com",
  projectId: "nso-gamble",
  storageBucket: "nso-gamble.appspot.com",
  messagingSenderId: "493256230648",
  appId: "1:493256230648:web:ce9d3890a30cc276581d0d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export default app;