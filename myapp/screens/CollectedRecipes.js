import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { useState, useEffect } from "react";
import { firestore as db } from '../firebase/firebase-setup'
import { collection, onSnapshot, query, where } from "firebase/firestore"
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
import NoRecipePage from '../components/UI/NoRecipePage';

export default function MyRecipes({ navigation }) {
    const [recipes, setRecipes] = useState([]);
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
                <>
                    <NoRecipePage>
                        <Text style={styles.text}>You do not have any collected recipes! Find one!</Text>
                        <View style={{ marginHorizontal: 50 }}>
                            <MainButton onPress={() => navigation.navigate("All")}>Find More Recipes</MainButton>
                        </View>
                    </NoRecipePage>
                </>
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
                                <Text numberOfLines={1} style={styles.titleText}>{item.title}</Text>
                                <AntDesign name="heart" size={18} color={Colors.Red} />
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
    wholeContainer: {
        flex: 1,
        height: 230,
        borderRadius: 5,
        marginTop: 4,
        marginRight: 6,
    },
    imgcontainer: {
        width: Dimensions.get('window').width,
    },
    titleText: {
        color: Colors.DescriptionText,
        marginLeft: 12,
        width: 140,
        fontWeight: 'bold',
        marginRight:11,
    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        borderRadius: Dimensions.get('window').width * 0.7 / 2,
        borderWidth: 2,
        borderColor: Colors.BgDarkGreen,
        overflow: "hidden",
        marginVertical: Dimensions.get('window').height / 30,
        alignSelf: 'center'

    },
    image: {
        width: "100%",
        height: "100%"
    },
    text: {
        fontSize: 16,
        alignSelf: 'center',
        margin: 5
    }
})