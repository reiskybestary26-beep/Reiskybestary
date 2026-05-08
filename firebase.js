import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getStorage
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

const firebaseConfig = {

  apiKey: "AIzaSyByz0C48NqWRBKqbk8g7AaAiA1PSNr4xyI",

  authDomain: "blog-reiskybestari.firebaseapp.com",

  projectId: "blog-reiskybestari",

  storageBucket: "blog-reiskybestari.firebasestorage.app",

  messagingSenderId: "178032367616",

  appId: "1:178032367616:web:284bec5c533ba0e28ea0e5",

  measurementId: "G-76ZP4VNSM5"

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

const storage = getStorage(app);

export {
  db,
  auth,
  provider,
  signInWithPopup,
  storage
};