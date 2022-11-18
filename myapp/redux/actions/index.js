//import confusion part
import { USER_STATE_CHANGE } from "../constants/index";
import { doc, getDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebase/firebase-setup";
import { async } from "@firebase/util";

export const fetchUser =() => async(dispatch) => {
    const docRef = doc(firestore, "Users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        console.log("docSnap exists: ", docSnap.data())
        dispatch({type: USER_STATE_CHANGE, currentUser: docSnap.data()})
    } else {
        console.log("no such document")
    }
}