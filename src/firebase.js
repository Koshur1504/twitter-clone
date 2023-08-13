import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import { addDoc,} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCzmWl6MjeBJeUa4rCf_IlxHmUGjIhltrQ",
  authDomain: "twitter-clone-76cbd.firebaseapp.com",
  databaseURL: "https://twitter-clone-76cbd-default-rtdb.firebaseio.com",
  projectId: "twitter-clone-76cbd",
  storageBucket: "twitter-clone-76cbd.appspot.com",
  messagingSenderId: "125807506112",
  appId: "1:125807506112:web:1f69f3f6a876402e75f325",
  measurementId: "G-VGLJ3GN25N",
};

const app = initializeApp(firebaseConfig);

export const auth =getAuth(app)
export const googleProvider = new GoogleAuthProvider()

export const db = getFirestore(app);
