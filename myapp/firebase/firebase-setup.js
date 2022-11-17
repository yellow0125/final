import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId
} from "react-native-dotenv"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: apiKey,
//   authDomain: authDomain,
//   projectId: projectId,
//   storageBucket: storageBucket,
//   messagingSenderId: messagingSenderId,
//   appId: appId,
// };

const firebaseConfig = {
  apiKey: "AIzaSyAccitAphJm637huwnPR9eDE_V_UIsj4xY",
authDomain : "project-1100779858743235788.firebaseapp.com",
projectId : "project-1100779858743235788",
storageBucket : "project-1100779858743235788.appspot.com",
messagingSenderId : "926625345465",
appId : "1:926625345465:web:a9a2b9d42e3e7882779068",
measurementId : "G-8W81QC9GCW",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const storage = getStorage();