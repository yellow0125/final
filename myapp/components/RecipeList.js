import { View, Text, Dimensions, Pressable } from 'react-native'
import React from 'react'
import { useState, useEffect } from "react";
import { firestore as db } from '../firebase/firebase-setup'
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { FlatList } from 'react-native';
import RecipeButton from './UI/RecipeButton';
import { StyleSheet } from 'react-native';
import Row from './UI/Row';
import Colors from '../constants/Colors';
import RecipeImage from './UI/RecipeImage';
import { AntDesign } from '@expo/vector-icons';
import { form } from '../constants/Style';
export default function RecipeList(props) {
  const [recipes, setRecipes] = useState([]);
  
  let filteredRecipes = [];
  if (props.location && recipes.length != 0) {
     for (let i = 0; i < recipes.length; i++) {
        let recipe = recipes[i];
        if (props.location.includes(recipe.selectedCuisine)) {
          filteredRecipes.push(recipe);
        }
      }
    }

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
  return (
    <FlatList
    data={props.location? filteredRecipes: recipes}
    numColumns={2}
    keyExtractor={item => item.key}
    renderItem={({ item }) => (
        <RecipeButton
            style={styles.wholeContainer}
            android_ripple={{ color: Colors.LightGrey, foreground: true }}
            onPress={() => props.navigation.navigate("RecipeDetails", { item })}
        >

            <View style={styles.imgcontainer}>
                <RecipeImage uri={item.uri} style={form.imageInPost2} />
            </View>
            <View>
                <Row>
                    <Text style={styles.titleText}>{item.title}</Text>
                    <AntDesign name="like2" size={20} color={Colors.Black} />
                    <Text>{item.like}</Text>
                </Row>
            </View>
        </RecipeButton>

    )}
/>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: Colors.White,
      alignItems: 'center',
  },
  imgcontainer: {
      width: Dimensions.get('window').width,
  },
  wholeContainer: {
      flex: 1,
      height: 230,
      borderRadius: 5,
      marginTop: 4,
      marginRight: 6,
  },
  titleText: {
      color: Colors.DescriptionText,
      marginLeft: 12,
      width: 140,
      fontWeight: 'bold',
  },
});