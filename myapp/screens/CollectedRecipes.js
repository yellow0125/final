import { View, Text, Dimensions, Pressable } from 'react-native'
import React from 'react'
import { useState, useEffect } from "react";
import { firestore as db } from '../firebase/firebase-setup'
import { collection, onSnapshot, query, where, collectionGroup } from "firebase/firestore"
import { FlatList } from 'react-native';
import { StyleSheet } from 'react-native';
import { form } from '../constants/Style';
import Row from '../components/UI/Row';
import RecipeButton from '../components/UI/RecipeButton';
import Colors from '../constants/Colors';
import RecipeImage from '../components/UI/RecipeImage';
import { AntDesign } from '@expo/vector-icons';
import { auth } from '../firebase/firebase-setup';
import MainButton from '../components/UI/MainButton';

export default function MyRecipes({ navigation }) {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const unsubsribe = onSnapshot(
            query(
                collection(db, "recipes"),
                where("likedUser", "array-contains", auth.currentUser.uid)),
                
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
            {recipes.length == 0 ? (
                <MainButton onPress={() => navigation.navigate("AddRecipe")}>Collect a New Recipe</MainButton>
            ) : (<FlatList
                data={recipes}
                numColumns={2}
                keyExtractor={item => item.key}
                renderItem={({ item }) => (
                    <RecipeButton
                        style={styles.wholeContainer}
                        android_ripple={{ color: Colors.LightGrey, foreground: true }}
                        onPress={() => navigation.navigate("RecipeDetails", { item })}
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
            )}
        </>
    );
}

const styles = StyleSheet.create({
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
})