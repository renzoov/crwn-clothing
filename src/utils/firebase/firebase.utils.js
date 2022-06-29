import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZsxs_8rmeOXUF8Fn-p57QYfcOGPHs18U",
  authDomain: "crwn-clothing-db-c0eda.firebaseapp.com",
  projectId: "crwn-clothing-db-c0eda",
  storageBucket: "crwn-clothing-db-c0eda.appspot.com",
  messagingSenderId: "163739454140",
  appId: "1:163739454140:web:35123f4c77609898045eb9",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapchot = await getDoc(userDocRef);

  if (!userSnapchot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }

  return userDocRef;
};
