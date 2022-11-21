import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { auth, firestore } from "./firebase-setup";


export async function createUserToDB(data) {
  try {
    const docRef = await addDoc(collection(firestore, "users"), {...data, user:auth.currentUser.uid});
  } catch (err) {
    console.log(err);
  }
}

export async function getUser() {
  try {
    const docRef = doc(firestore, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    console.log("Cached document data:", docSnap.data());
  } catch (err) {
    console.log(err);
  }
}
