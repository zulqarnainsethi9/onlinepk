import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCk21D-CrSwbmHTqJ5sAu7sATWKj3vakpM",
  authDomain: "online-accessories-452ea.firebaseapp.com",
  projectId: "online-accessories-452ea",
  storageBucket: "online-accessories-452ea.firebasestorage.app",
  messagingSenderId: "988184155944",
  appId: "1:988184155944:web:b5e32e18d91949617d621d",
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const db = getFirestore(app);
