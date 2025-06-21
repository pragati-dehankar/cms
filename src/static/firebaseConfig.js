import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDRgCxUB9HDzc-nQpiwbEXwSWFgx7bUHnQ",
  authDomain: "quickping-fec5f.firebaseapp.com",
  projectId: "quickping-fec5f",
  storageBucket: "quickping-fec5f.firebasestorage.app",
  messagingSenderId: "813131532275",
  appId: "1:813131532275:web:0b217954b978cc19e33486",
  measurementId: "G-S0XN2X7E6W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage =getStorage(app);

export {storage};