import { View, Text, Dimensions, Pressable, StyleSheet, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { firestore as db } from '../firebase/firebase-setup'
import { collection, onSnapshot, query, where, limit } from "firebase/firestore"
import { form } from '../constants/Style';
import Colors from '../constants/Colors';
import Row from '../components/UI/Row';
import RecipeButton from '../components/UI/RecipeButton';
import RecipeImage from '../components/UI/RecipeImage';
import { AntDesign } from '@expo/vector-icons';
import Banner from '../components/UI/Banner';
import { auth } from '../firebase/firebase-setup';
export default function AllRecipes({ navigation }) {
    const [recipes, setRecipes] = useState([]);
    const [imageURL, setImageURL] = useState("");
    const [likedRecipes, setLikedRecipes] = useState([]);
    const [weeklyRecipes, setWeeklyRecipes] = useState([]);

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

    useEffect(() => {
        const unsubsribe = onSnapshot(
            query(
                collection(db, "recipes"),
                limit(6)),
            (QuerySnapshot) => {
                if (QuerySnapshot.empty) {
                    setWeeklyRecipes([]);
                    return;
                }
                setWeeklyRecipes(
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
            <View>
                <Banner />
            </View>

            <View>
                <Row style={styles.headContainer}>
                    <AntDesign name="staro" size={20} color="black" />
                    <Text style={styles.headtext}> Weekly Recommend</Text>
                </Row>

                <FlatList
                    data={weeklyRecipes}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.key}
                    renderItem={({ item }) => (
                        <Pressable
                            android_ripple={{ color: Colors.LightGrey, foreground: true }}
                            onPress={() => navigation.navigate("RecipeDetails", { item })}
                        >
                            <View style={styles.weekImg}>
                                <RecipeImage uri={item.uri} />
                            </View>
                            <View style={styles.weekTextC}>
                                <Text style={styles.weekText}>{item.selectedCuisine}: {item.title}</Text>
                            </View>
                        </Pressable>

                    )}
                />
            </View>
            <View>
                <Row style={styles.headContainer}>
                    <AntDesign name="staro" size={20} color="black" />
                    <Text style={styles.headtext}> All Recipes</Text>
                </Row>

                <FlatList
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
                                    {likedRecipes.includes(item.key) ? (
                                        <AntDesign name="like1" size={20} color={Colors.Black} />) : (
                                        <AntDesign name="like2" size={20} color={Colors.Black} />
                                    )}
                                    <Text>{item.like}</Text>
                                </Row>
                            </View>
                        </RecipeButton>

                    )}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White,
        alignItems: 'center',
    },
    headtext: {
        fontSize: 18,

    },
    headContainer: {
        justifyContent: 'center',
        padding: 5,
        margin: 5,

    },
    imgcontainer: {
        width: Dimensions.get('window').width,
    },
    weekImg: {
        width: Dimensions.get('window').width * 0.6,
        height: Dimensions.get('window').height * 0.25,
        borderWidth: 0.5,
        borderRadius: 2,
        borderColor: Colors.BgDarkGreen,
        marginHorizontal: 5,

    },
    weekTextC: {
        alignItems: 'center'
    },
    weekText: {
        fontSize: 16,
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
        width: 140,
        marginLeft: 12,
        fontWeight: 'bold',
    },
});