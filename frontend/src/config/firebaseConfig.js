// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyA6F5l_JSpK1y5MzAkwlSZqOUGenQPpoZw",
  authDomain: "expofirebaseauth-c542d.firebaseapp.com",
  projectId: "expofirebaseauth-c542d",
  storageBucket: "expofirebaseauth-c542d.appspot.com",
  messagingSenderId: "58887019757",
  appId: "1:58887019757:web:daf7b4b5862245a00e80e4",
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);

// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// 288112794267-ihf6jj574b0ah6m3dupq4qek114e5c50.apps.googleusercontent.com
