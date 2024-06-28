// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyD0y1GPU1ZHGU0YwXE0nyOzbQZObpyvkaA",
  authDomain: "smartexia.firebaseapp.com",
  projectId: "smartexia",
  storageBucket: "smartexia.appspot.com",
  messagingSenderId: "637938020233",
  appId: "1:637938020233:web:12533b7f3d788d103f3b58",
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);

// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Android: 637938020233-1od1uuejvf85md6p03iakober8g4m7a9.apps.googleusercontent.com
