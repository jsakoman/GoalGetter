// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCAdAP_vk0HDD6EgA92Wa9l1A63hnSAsp8",
  authDomain: "goalgetter-db6c3.firebaseapp.com",
  projectId: "goalgetter-db6c3",
  storageBucket: "goalgetter-db6c3.firebasestorage.app",
  messagingSenderId: "460195931048",
  appId: "1:460195931048:web:b5c68eef8513af7247339d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };