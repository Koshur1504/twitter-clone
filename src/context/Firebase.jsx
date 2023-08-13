import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";

import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  setDoc,
  doc,
  getFirestore,
  addDoc,
  collection,
  getDocs,
} from "firebase/firestore";

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

export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);

const FirebaseContext = createContext(null);

export const firebaseAuth = getAuth(firebaseApp);

export const database = getFirestore(firebaseApp);

const googleAuth = new GoogleAuthProvider();

const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);
      } else setUser(null);
    });
  }, []);

  const getUsers = async () => {
    try {
      const usersRef = await getDocs(collection(database, "users"));
      const data = usersRef.docs.map((doc) => doc.data());
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [user]);

  const isLoggedIn = user ? true : false;

  // Login methods

  const signupUserWithEmailAndPassword = async ({ user }) => {
    await createUserWithEmailAndPassword(
      firebaseAuth,
      user.email,
      user.password
    ).then(async (result) => {
      const ref = doc(database, "users", result.user.uid);
      await setDoc(ref, { ...user, id: result.user.uid });
      await updateProfile(firebaseAuth.currentUser, {
        displayName: user.displayName,
        photoURL: user.photoURL,
        tenantId: user.userName,
      });
    });
  };

  async function signInWithGoogle() {
    await signInWithPopup(firebaseAuth, googleAuth).then(async (result) => {
      const ref = doc(database, "users", result.user.uid);
      await setDoc(ref, {
        displayName: `${result.user.displayName}`,
        birth: "",
        userName: `${result.user.email.substring(
          0,
          result.user.email.indexOf(`@`)
        )}`,
        email: `${result.user.email}`,
        password: ``,
        id: result.user.uid,
      });
    });
  }

  const handleSignIn = async ({ values }) => {
    await signInWithEmailAndPassword(
      firebaseAuth,
      values.email,
      values.password
    );
  };

  //Logout
  const Logout = () => {
    return signOut(firebaseAuth);
  };

  // reset Password
  const resetPassword = async ({ values }) => {
    await sendPasswordResetEmail(firebaseAuth, values.email);
  };
  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        handleSignIn,
        firebaseAuth,
        isLoggedIn,
        user,
        users,
        Logout,
        signInWithGoogle,
        resetPassword,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};

export { FirebaseProvider };
