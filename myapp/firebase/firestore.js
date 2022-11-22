import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { auth, firestore } from "./firebase-setup";


export const createUserToDB = async(data) => {
    console.log("Write User to DB in firestore.js for user ID: ", auth.currentUser.uid)
    try {
        await setDoc(doc(firestore, "Users", auth.currentUser.uid), {
            username:data.username,
            email:data.email,
        });
        console.log("Create User in db sucessfully. Users' data is: ", data)
    } catch (error) {
        console.log("Error when writing into db", error)
    }
}

export async function writeToDB(goal) {
    try {
        const docRef = await addDoc(collection(firestore, "goals"), {
            ...goal,
            user: auth.currentUser.uid,
        });
    } catch (err) {
        console.log(err);
    }
}

export async function deleteFromDB(key) {
    try {
        await deleteDoc(doc(firestore, "goals", key));
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

