import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native';
import RecipeButton from './UI/RecipeButton';
import Row from './UI/Row';
import Colors from '../constants/Colors';
import RecipeImage from './UI/RecipeImage';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { container, form } from '../constants/Style';
import NoRecipePage from './UI/NoRecipePage';
import Column from './UI/Column';
import useUserName from './hook/useUserName';
import useUserLike from './hook/useUserLike';
import useRecipe from './hook/useRecipe';

export default function RecipeList(props) {
  const recipes = useRecipe();
  const userName = useUserName()
  const likedRecipes = useUserLike();

  let filteredRecipes = [];
  if (props.location && recipes.length != 0) {
     for (let i = 0; i < recipes.length; i++) {
        let recipe = recipes[i];
        if (props.location.includes(recipe.selectedCuisine) || props.location.includes(recipe.selectedDiff)) {
          filteredRecipes.push(recipe);
        }
      }
    }

  function findUserName(authid) {
    let authName = "";
    for (let i = 0; i < userName.length; i ++) {
      if (authid === userName[i][0]) {
        authName = userName[i][1]
        return authName
      }
    }
  }

  return (
  <>
    {props.location && (filteredRecipes.length === 0 && props.location.length != 0) ? (
      <>
        <NoRecipePage>
          <Text style={form.NoRecipePagetext}>
            Opps, there is no recipes in this location. Select another location or create one!
          </Text>
        </NoRecipePage>
     </>
    ):(
      <FlatList
        data={props.location && props.location.length != 0 ? filteredRecipes: recipes}
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
                        <Text numberOfLines={1} style={form.RecipeListTitle}>{item.title}</Text>
                        <Row style={{marginLeft:5, marginRight:8, justifyContent: 'space-between'}}>
                          <Row style={{marginTop: 8}}>
                          <AntDesign name="user" size={18} color={Colors.darkGrey} />
                          <Text style={{color:Colors.darkGrey, marginLeft: 3, fontSize:14}}>
                            {findUserName(item.user)}
                          </Text>
                          </Row>
                          <Row style={{marginTop: 8}}>
                          {likedRecipes.includes(item.key) ? (
                                    <AntDesign name="heart" size={18} color={Colors.Red} />) : (
                                    <AntDesign name="hearto" size={18} color={Colors.darkGrey} />
                                )}
                            <Text style={{color:Colors.darkGrey, marginLeft: 3,fontSize:13}}>{item.like}</Text>
                          </Row>
                        </Row>
                    </Column>
                </View>
            </RecipeButton>

    )}
/> )}
</>)
}