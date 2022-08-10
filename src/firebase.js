import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { getStorage } from "firebase/storage";

// import { useEffect } from 'react';
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useNavigate } from "react-router-dom";
// import {SignInWithGoogle} from 'firebase';
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxoH_5bpB2GyoWB7KSG8I5xTu6P2l1_Uo",
  authDomain: "digiclassroom-312a3.firebaseapp.com",
  projectId: "digiclassroom-312a3",
  storageBucket: "digiclassroom-312a3.appspot.com",
  messagingSenderId: "409663092273",
  appId: "1:409663092273:web:37c8c227115786c6d28710"
};


// Initialize Firebase


const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
const storage=getStorage(app)



const googleProvider = new firebase.auth.GoogleAuthProvider();

// Sign in and check or create account in firestore
const SignInWithGoogle = async () => {
  try {
    const response = await auth.signInWithPopup(googleProvider);
    console.log(response.user);
    const user = response.user;
    console.log(`User ID - ${user.uid}`);
    const querySnapshot = await db
      .collection("users")
      .where("uid", "==", user.uid)
      .get();
    if (querySnapshot.docs.length === 0) {
      // create a new user
      await db.collection("users").add({
        uid: user.uid,
        creatorName: user.displayName,
        enrolledClassrooms: [],
      });
    }
  } catch (err) {
    alert(err.message);
  }
};
 

const Logout = () => {
  auth.signOut();
};
export { app, auth, db, storage, SignInWithGoogle, Logout};