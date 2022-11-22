import { collection, addDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, firestore } from "./firebase-setup";


// export const createUserToDB = async(data) => {
//     console.log("Write User to DB in firestore.js for user ID: ", auth.currentUser.uid)
//     try {
//         await setDoc(doc(firestore, "Users", auth.currentUser.uid), {
//             username:data.username,
//             email:data.email,
//         });
//         console.log("Create User in db sucessfully. Users' data is: ", data)
//     } catch (error) {
//         console.log("Error when writing into db", error)
//     }
// }

export const createUserToDB = async (data) => {
    console.log("Write User to DB in firestore.js for user ID: ", auth.currentUser.uid)
    try {
        await setDoc(doc(firestore, "users", auth.currentUser.uid), {
            username: data.username,
            email: data.email,
            gender: "click edit to add your gender",
            location: "click edit to add your location",

        });
        // const docRef = await addDoc(collection(firestore, "Users"), {
        //     username: data.username,
        //     email: data.email,
        // });
        console.log("Create User in db sucessfully. Users' data is: ", data)
    } catch (error) {
        console.log("Error when writing into db", error)
    }
}

export async function writeUserProfileToDB(profileData) {
    try {
        const docRef = await updateDoc(doc(firestore, "users", profileData.key), {
            username:profileData.username,
            gender: profileData.gender,
            location: profileData.location

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

