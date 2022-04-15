import { initializeApp } from "firebase/app";

import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCKbAJiazvOQQl55cKts04k5_aBFJrU9WE",
  authDomain: "chipotle-ef37c.firebaseapp.com",
  projectId: "chipotle-ef37c",
  storageBucket: "chipotle-ef37c.appspot.com",
  messagingSenderId: "592746585826",
  appId: "1:592746585826:web:bd26f5541c5afc612508bb",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
