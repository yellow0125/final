import { useState, useEffect } from "react";
import { firestore as db } from '../../firebase/firebase-setup'
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { auth } from '../../firebase/firebase-setup';

export default function useUserLike() {
    const [likedRecipes, setLikedRecipes] = useState([]);
    useEffect(() => {
        const unsubsribe = onSnapshot(
            query(
                collection(db, "recipes"),
                where("likedUser", "array-contains", auth.currentUser.uid)),

            (QuerySnapshot) => {
                if (QuerySnapshot.empty) {
                    setLikedRecipes([]);
                    return;
                }
                setLikedRecipes(
                    QuerySnapshot.docs.map((snapDoc) => {
                        let data = snapDoc.id;
                        return data;
                    })
                );
            });
        return () => {
            unsubsribe();
        }
    }, [],);

  return likedRecipes
}