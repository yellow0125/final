import { useState, useEffect } from "react";
import { firestore as db } from '../../firebase/firebase-setup'
import { collection, onSnapshot} from "firebase/firestore"

export default function useRecipe() {
    const [recipes, setRecipes] = useState([]);
    useEffect(() => {
        const unsubsribe = onSnapshot(
          collection(db, "recipes"),
          (QuerySnapshot) => {
            if (QuerySnapshot.empty) {
              setRecipes([]);
              return;
            }
            
            setRecipes(
              QuerySnapshot.docs.map((snapDoc) => {
                let data = snapDoc.data();
                data = { ...data, key: snapDoc.id };
                return data;
              })
            );
          });
        return () => {
          unsubsribe();
        }
      }, [],);

  return recipes
}