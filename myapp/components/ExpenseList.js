import { View, Text } from 'react-native'
import React from 'react'
import { useState, useEffect } from "react";
import { firestore as db} from '../firebase/firebase-setup'
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native';
import RecipeButton from './UI/RecipeButton';
import { StyleSheet } from 'react-native';
import { container, form } from '../constants/Style';
import Row from './UI/Row';
import Colors from '../constants/Colors';

export default function ExpenseList() {
    const [recipes, setRecipes] = useState();

    useEffect(()=>{
        const unsubsribe = onSnapshot(
          collection(db, "recipes"), 
          (QuerySnapshot)=>{
            if (QuerySnapshot.empty) {
                setRecipes([]);
              return;
            }
            setRecipes(
              QuerySnapshot.docs.map((snapDoc) =>{
                let data = snapDoc.data();
                data = {...data, key:snapDoc.id};
                return data;
              })
            );
        });
        return () => {
          unsubsribe();
        }
      }, [],);
  return (
    // <SafeAreaView style={{height: 300}} keyboardShouldPersistTaps='handled'>
      <FlatList
        data={recipes}
        keyExtractor={item=>item.key}
        
        renderItem={({item})=>(

            <RecipeButton style={styles.listItem} 
                        // onPress={()=>props.navigate('Edit', {itemID: item.key, important: item.important})}
                        onPress={()=>console.log("navigate to detailRecipe Screen")}
            >
                <Row>
                    
                  <Text style={styles.titleText}>{item.title}</Text>
                  <Text style={styles.likeText}>{item.like}</Text>
              </Row>
            </RecipeButton>
        )}
      />
    // </SafeAreaView>
  )
}

const styles=StyleSheet.create({
    listItem: {
      flex:1,
      backgroundColor: Colors.BgLightGreen,
      flexDirection: 'row',
      width:300,
      margin:10,
      padding: 20,
      borderRadius:8,
    },
    titleText: {
      color: Colors.DescriptionText,
      width:200,
    },
    likeText:{
      textAlign: 'center',
      backgroundColor: Colors.AmountBackground,
      color: Colors.AmountText,
      width:65,
      borderRadius:5,
    }
  })