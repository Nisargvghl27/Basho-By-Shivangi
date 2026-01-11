import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyActUg8C1L2CaQwHgm5wRcQoWDw5Z4aIZE",
  authDomain: "basho-by-shivangi-cd894.firebaseapp.com",
  projectId: "basho-by-shivangi-cd894",
  storageBucket: "basho-by-shivangi-cd894.firebasestorage.app",
  messagingSenderId: "281266048510",
  appId: "1:281266048510:web:3d44983c13560f20e544af",
  measurementId: "G-FPEQJEWQZR"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
