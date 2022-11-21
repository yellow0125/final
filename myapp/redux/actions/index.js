//import confusion part
import { USER_STATE_CHANGE } from "../constants/index";
import { doc, getDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebase/firebase-setup";
import { async } from "@firebase/util";

//因为auth currentUser一直有warning报错，所以先注释掉，后续如果profile需要在做修改添加
//action-index.js firestore-create a user to db
// export const fetchUser =() => async(dispatch) => {
//     const docRef = doc(firestore, "Users", auth.currentUser.uid);
//     const docSnap = await getDoc(docRef)
    
//     if (docSnap.exists()) {
//         console.log("docSnap exists: ", docSnap.data())
//         dispatch({type: USER_STATE_CHANGE, currentUser: docSnap.data()})
//     } else {
//         console.log("no such document")
//     }
// }