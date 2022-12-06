import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { useState, useEffect } from "react";
import { firestore as db } from '../firebase/firebase-setup'
import { collection, onSnapshot} from "firebase/firestore"
import { FlatList } from 'react-native';
import RecipeButton from './UI/RecipeButton';
import { StyleSheet } from 'react-native';
import Row from './UI/Row';
import Colors from '../constants/Colors';
import RecipeImage from './UI/RecipeImage';
import { AntDesign } from '@expo/vector-icons';
import { container, form } from '../constants/Style';
import { Image } from 'react-native';
import NoRecipePage from './UI/NoRecipePage';
import Column from './UI/Column';
import useUserName from './Hook/useUserName';
import useUserLike from './Hook/useUserLike';

export default function RecipeList(props) {
  const [recipes, setRecipes] = useState([]);
  const userName = useUserName();
  const likedRecipes = useUserLike();
  
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
  <>
    {props.location && filteredRecipes.length === 0 ? (
      <>
        <NoRecipePage>
          <Text style={styles.text}>
            Opps, there is no recipes in this location. Select another location or create one!
          </Text>
        </NoRecipePage>
     </>
    ):(
      <FlatList
        data={props.location? filteredRecipes: recipes}
        numColumns={2}
        keyExtractor={item => item.key}
        renderItem={({item}) => (
            <RecipeButton
                style={container.wholeContainer}
                android_ripple={{ color: Colors.LightGrey, foreground: true }}
                onPress={() => props.navigation.navigate("RecipeDetails", {item})}
            >
                <View style={{width: Dimensions.get('window').width}}>
                    <RecipeImage uri={item.uri} style={form.imageInPost2} />
                </View>
                <View>
                    <Column>
                        <Text style={form.RecipeListTitle}>{item.title}</Text>
                        <Row style={{marginLeft:5, marginRight:8, justifyContent: 'space-between'}}>
                          <Text>
                            {userName.length == 0 ? "":userName.find(element=>element[0] == item.user )[1]}
                          </Text>
                          <Row>
                          {likedRecipes.includes(item.key) ? (
                                    <AntDesign name="like1" size={20} color={Colors.Black} />) : (
                                    <AntDesign name="like2" size={20} color={Colors.Black} />
                                )}
                            <Text>{item.like}</Text>
                          </Row>
                        </Row>
                    </Column>
                </View>
            </RecipeButton>

    )}
/> )}
</>)
}

const styles = StyleSheet.create({
text: {
    fontSize: 16,
    alignSelf: 'center',
    margin: 5
}
});