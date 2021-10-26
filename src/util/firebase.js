// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB9G2R1Ngv8AxoW5fzWgbQOxauL9Tr52Uc",
  authDomain: "social-b5043.firebaseapp.com",
  projectId: "social-b5043",
  storageBucket: "social-b5043.appspot.com",
  messagingSenderId: "345951915675",
  appId: "1:345951915675:web:17f954507d6ff874d3c03e",
  measurementId: "G-6V72C9429C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseStorage = getStorage(app)
