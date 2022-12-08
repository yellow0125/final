import { View, Text, Dimensions, StyleSheet, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { firestore as db } from '../firebase/firebase-setup'
import { collection, onSnapshot, query, where, limit, orderBy } from "firebase/firestore"
import Colors from '../constants/Colors';
import Row from '../components/UI/Row';
import RecipeButton from '../components/UI/RecipeButton';
import RecipeImage from '../components/UI/RecipeImage';
import { AntDesign } from '@expo/vector-icons';
import Banner from '../components/UI/Banner';
import { FontAwesome5 } from '@expo/vector-icons';

export default function AllRecipes({ navigation }) {
    const [recipes, setRecipes] = useState([]);
    const [weeklyRecipes, setWeeklyRecipes] = useState([]);
    const [drinkRecipes, setDrinkRecipes] = useState([]);
    const [japanRecipes, setJapanRecipes] = useState([]);
    const [easyRecipes, setEasyRecipes] = useState([]);

    useEffect(() => {
        const unsubsribe = onSnapshot(
            query(
                collection(db, "recipes"),
                orderBy("like", "desc"),
                limit(6)),
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

    useEffect(() => {
        const unsubsribe = onSnapshot(
            query(
                collection(db, "recipes"),
                where("selectedCookStyle", "==", "Drinks/Dessert")),
            (QuerySnapshot) => {
                if (QuerySnapshot.empty) {
                    setDrinkRecipes([]);
                    return;
                }
                setDrinkRecipes(
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
                where("selectedCuisine", "==", "Japanese")),
            (QuerySnapshot) => {
                if (QuerySnapshot.empty) {
                    setJapanRecipes([]);
                    return;
                }
                setJapanRecipes(
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
                where("selectedDiff", "==", "Under 15 minutes")),
            (QuerySnapshot) => {
                if (QuerySnapshot.empty) {
                    setEasyRecipes([]);
                    return;
                }
                setEasyRecipes(
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
        <ScrollView>
            <Banner navigation={navigation} />
            <View style={styles.recipesContainer}>
                <Row style={styles.headContainer}>
                    <AntDesign name="staro" size={20} color={Colors.Orange} />
                    <Text style={styles.headtext}> Most Popular</Text>
                </Row>
                <FlatList
                    data={recipes}
                    horizontal={true}
                    keyExtractor={item => item.key}
                    renderItem={({ item }) => (
                        <RecipeButton
                            style={styles.container}
                            android_ripple={{ color: Colors.LightGrey, foreground: true }}
                            onPress={() => navigation.navigate("RecipeDetails", { item })}
                        >
                            <Row>
                                <View style={styles.popularImg}>
                                    <RecipeImage uri={item.uri} />
                                </View>

                                <View>
                                    <Text style={styles.popularText1}>{item.title}</Text>
                                    <Text style={styles.popularText2}>{item.selectedCuisine}</Text>
                                    <Row style={styles.popularText2}>
                                        <AntDesign name="heart" size={20} color={Colors.Red} />
                                        <Text style={styles.likeText}>{item.like}</Text>
                                    </Row>
                                </View>
                            </Row>
                        </RecipeButton>
                    )}
                />
            </View>

            <View style={styles.recipesContainer}>
                <Row style={styles.headContainer}>
                    <AntDesign name="staro" size={20} color={Colors.Orange} />
                    <Text style={styles.headtext}> Recommended For You</Text>
                </Row>
                <FlatList
                    data={weeklyRecipes}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.key}
                    renderItem={({ item }) => (
                        <RecipeButton
                            android_ripple={{ color: Colors.LightGrey, foreground: true }}
                            onPress={() => navigation.navigate("RecipeDetails", { item })}
                        >
                            <View style={styles.weekImg}>
                                <RecipeImage uri={item.uri} />
                            </View>
                            <View style={styles.weekTextContainer}>
                                <Text style={styles.weekText}>{item.title}</Text>
                            </View>
                        </RecipeButton>
                    )}
                />
            </View>

            <View style={styles.recipesContainer}>
                <Row style={styles.headContainer}>
                    <AntDesign name="staro" size={20} color={Colors.Orange} />
                    <Text style={styles.headtext}> Drinks and Dessert Bars</Text>
                </Row>
                <FlatList
                    data={drinkRecipes}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.key}
                    renderItem={({ item }) => (
                        <RecipeButton
                            android_ripple={{ color: Colors.LightGrey, foreground: true }}
                            onPress={() => navigation.navigate("RecipeDetails", { item })}
                        >
                            <View style={styles.weekImg}>
                                <RecipeImage uri={item.uri} />
                            </View>
                            <View style={styles.weekTextContainer}>
                                <Text style={styles.weekText}>{item.title}</Text>
                            </View>
                        </RecipeButton>
                    )}
                />
            </View>

            <View style={styles.recipesContainer}>
                <Row style={styles.headContainer}>
                    <AntDesign name="staro" size={20} color={Colors.Orange} />
                    <Text style={styles.headtext}> Trending</Text>
                </Row>
                <FlatList
                    data={japanRecipes}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.key}
                    renderItem={({ item }) => (
                        <RecipeButton
                            android_ripple={{ color: Colors.LightGrey, foreground: true }}
                            onPress={() => navigation.navigate("RecipeDetails", { item })}
                        >
                            <View style={styles.weekImg}>
                                <RecipeImage uri={item.uri} />
                            </View>
                            <View style={styles.weekTextContainer}>
                                <Text style={styles.weekText}>{item.title}</Text>
                            </View>
                        </RecipeButton>
                    )}
                />
            </View>

            <View style={styles.recipesContainer}>
                <Row style={styles.headContainer}>
                    <AntDesign name="staro" size={20} color={Colors.Orange} />
                    <Text style={styles.headtext}> Easy Meals to Start Cooking</Text>
                </Row>
                <FlatList
                    data={easyRecipes}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.key}
                    renderItem={({ item }) => (
                        <RecipeButton
                            android_ripple={{ color: Colors.LightGrey, foreground: true }}
                            onPress={() => navigation.navigate("RecipeDetails", { item })}
                        >
                            <View style={styles.weekImg}>
                                <RecipeImage uri={item.uri} />

                            </View>
                            <View style={styles.weekTextContainer}>
                                <Text style={styles.weekText}>{item.title}</Text>
                            </View>


                        </RecipeButton>
                    )}
                />
            </View>

            <TouchableOpacity style={styles.buttonC} onPress={() => navigation.navigate("Discover")}>
                <Row>
                    <Text style={styles.button}>-View More-</Text>
                    <FontAwesome5 name="hand-point-left" size={24} color={Colors.Orange} />
                </Row>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White,
        marginBottom: 10,

    },
    rank:{
        position:'absolute',
        fontSize:30,
        color:'red',
    },
    headtext: {
        fontSize: 20,
        color: Colors.Black,
        fontWeight: 'bold',
    },
    headContainer: {
        padding: 5,
        margin: 10,
        borderRadius: 5,
    },
    imgcontainer: {
        width: Dimensions.get('window').width,
    },
    weekImg: {
        width: Dimensions.get('window').width * 0.43,
        height: Dimensions.get('window').height * 0.23,
        borderWidth: 0.5,
        borderRadius: 2,
        borderColor: Colors.BgDarkGreen,
        marginHorizontal: 5,

    },
    popularImg: {
        width: Dimensions.get('window').width * 0.4,
        height: Dimensions.get('window').height * 0.25,
        borderWidth: 0.5,
        borderRadius: 2,
        borderColor: Colors.BgDarkGreen,
        marginHorizontal: 5,
    },
    weekText: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    weekTextContainer:{
        width: Dimensions.get('window').width * 0.43,
    },
    popularText1: {
        color: Colors.DescriptionText,
        width: 120,
        marginLeft: 12,
        fontSize: 14,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    popularText2: {
        color: Colors.DescriptionText,
        width: 120,
        marginLeft: 12,
        fontSize: 14,
        marginBottom: 5,
    },
    likeText: {
        color: Colors.Red,
        marginLeft: 5,
        fontSize: 16,
        fontWeight: 'bold'

    },
    button: {
        color: Colors.Orange,
    },
    buttonC: {
        alignItems: 'center',
        padding: 5,
    },
    recipesContainer: {
        marginVertical: 10,
    },
});