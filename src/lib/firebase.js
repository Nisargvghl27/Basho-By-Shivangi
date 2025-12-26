// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyActUg8C1L2CaQwHgm5wRcQoWDw5Z4aIZE",
  authDomain: "basho-by-shivangi-cd894.firebaseapp.com",
  projectId: "basho-by-shivangi-cd894",
  storageBucket: "basho-by-shivangi-cd894.firebasestorage.app",
  messagingSenderId: "281266048510",
  appId: "1:281266048510:web:3d44983c13560f20e544af",
  measurementId: "G-FPEQJEWQZR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);