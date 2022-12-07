import { View, Text, Dimensions} from 'react-native'
import React from 'react'
import { useState, useEffect } from "react";
import { firestore as db } from '../firebase/firebase-setup'
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { FlatList } from 'react-native';
import { StyleSheet } from 'react-native';
import Row from '../components/UI/Row';
import Column from '../components/UI/Column';
import RecipeButton from '../components/UI/RecipeButton';
import Colors from '../constants/Colors';
import RecipeImage from '../components/UI/RecipeImage';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { auth } from '../firebase/firebase-setup';
import MainButton from '../components/UI/MainButton';
import NoRecipePage from '../components/UI/NoRecipePage';
import { container, form } from '../constants/Style';
import useUserName from '../components/hook/useUserName';
import useUserLike from '../components/hook/useUserLike';
import { FAB } from "react-native-elements";

export default function MyRecipes({ navigation }) {
    const [recipes, setRecipes] = useState([]);
    const userName = useUserName();
    const likedRecipes = useUserLike();

    useEffect(() => {
        const unsubsribe = onSnapshot(
            query(
                collection(db, "recipes"),
                where("user", "==", auth.currentUser.uid)),
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

    function detailHandler() {
        navigation.navigate("RecipeDetails");
    }
    function addHandler() {
        navigation.navigate("AddRecipe");
    }

    function findUserName(authid) {
        let authName = "";
        for (let i = 0; i < userName.length; i++) {
            if (authid === userName[i][0]) {
                authName = userName[i][1]
                return authName
            }
        }
    }

    return (
        <>
            {recipes.length == 0 ? (
                <>
                    <NoRecipePage>
                        <Text style={styles.text}>You do not have any recipes! Create one!</Text>
                        <View style={{ marginHorizontal: 50 }}>
                            <MainButton onPress={addHandler}>Create a New Recipe</MainButton>
                        </View>
                    </NoRecipePage>
                </>
            ) : (
                <>
                    <FlatList
                        data={recipes}
                        numColumns={2}
                        keyExtractor={item => item.key}
                        renderItem={({ item }) => (
                            <View style={styles.wholeScreen}>
                                <RecipeButton
                                    style={container.wholeContainer}
                                    android_ripple={{ color: Colors.LightGrey, foreground: true }}
                                    onPress={() => navigation.navigate("RecipeDetails", { item })}
                                >
                                    <View style={{ width: Dimensions.get('window').width }}>
                                        <RecipeImage uri={item.uri} style={form.imageInPost2} />
                                    </View>
                                    <View>
                                        <Column>
                                            <Text numberOfLines={1} style={form.RecipeListTitle}>{item.title}</Text>
                                            <Row style={{ marginLeft: 5, marginRight: 8, justifyContent: 'space-between' }}>
                                                <Row style={{ marginTop: 5 }}>
                                                    <FontAwesome name="user-circle-o" size={20} color={Colors.darkGrey} />
                                                    <Text style={{ color: Colors.darkGrey, marginLeft: 3 }}>
                                                        {findUserName(item.user)}
                                                    </Text>
                                                </Row>
                                                <Row style={{ marginTop: 5 }}>
                                                    {likedRecipes.includes(item.key) ? (
                                                        <AntDesign name="heart" size={20} color={Colors.Red} />) : (
                                                        <AntDesign name="hearto" size={20} color={Colors.darkGrey} />
                                                    )}
                                                    <Text style={{ color: Colors.darkGrey, marginLeft: 2 }}>{item.like}</Text>
                                                </Row>
                                            </Row>
                                        </Column>
                                    </View>
                                </RecipeButton>
                            </View>
                        )} />
                    <View style={styles.floatingButton}>
                        <FAB
                            visible={true}
                            placement="right"
                            icon={{ name: 'add', color: Colors.White }}
                            color={Colors.Orange}
                            onPress={addHandler}
                        />
                    </View>
                </>

            )
            }
        </>
    );
}

const styles = StyleSheet.create({
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
    image: {
        width: "100%",
        height: "100%"
    },
    text: {
        fontSize: 16,
        alignSelf: 'center',
        margin: 5
    },
    wholeScreen: {
        marginBottom: 80,
    },
})