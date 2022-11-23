import { View, Text } from 'react-native'
import React from 'react'
import { useState, useEffect } from "react";
import { firestore as db} from '../firebase/firebase-setup'
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native';
import { Image } from 'react-native';
import RecipeButton from './UI/RecipeButton';
import { StyleSheet } from 'react-native';
import { container, form } from '../constants/Style';
import Row from './UI/Row';
import Colors from '../constants/Colors';
import RecipeImage from './UI/RecipeImage';
import Column from './UI/Column';
import { Entypo, Ionicons, AntDesign, EvilIcons } from '@expo/vector-icons';

export default function RecipeList() {
    const [recipes, setRecipes] = useState();
    const [imageURL, setImageURL] = useState("");

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
      <FlatList
        data={recipes}
        keyExtractor={item=>item.key}
        
        renderItem={({item})=>(

            <RecipeButton style={container.post} 
                        // onPress={()=>props.navigate('Edit', {itemID: item.key, important: item.important})}
                        onPress={()=>console.log("navigate to detailRecipe Screen")}
            >
            <Column>
            <RecipeImage source={item} />

                <Row>
                    
                  <Text style={styles.titleText}>{item.title}</Text>
                  <View style={styles.iconContainer}>
                            <Row style={styles.icon}>
                                <AntDesign name="like2" size={20} color="black" />
                                <Text>{item.like}</Text>
                            </Row>
                        </View>
              </Row>
              </Column>
            </RecipeButton>
        )}
      />
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
      marginLeft:10,
      width:210,
    },
    likeText:{
      textAlign: 'center',
      backgroundColor: Colors.AmountBackground,
      color: Colors.AmountText,
      width:105,
      borderRadius:5,
    }
  })