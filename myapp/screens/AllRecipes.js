import { View, Text, Dimensions, Pressable, StyleSheet, FlatList, ScrollView, TouchableOpacity } from 'react-native'
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
import NotificationManager from '../components/NotificationManager';

export default function AllRecipes({ navigation }) {
    const [recipes, setRecipes] = useState([]);
    const [imageURL, setImageURL] = useState("");
    const [weeklyRecipes, setWeeklyRecipes] = useState([]);
    

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
    return (
        <ScrollView>
            <View>
                <Banner navigation={navigation}/>
            </View>
            <NotificationManager />
            <View>
                <Row style={styles.headContainer}>
                    <AntDesign name="staro" size={20} color={Colors.Orange} />
                    <Text style={styles.headtext}> Weekly Recommend</Text>
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
                        </RecipeButton>
                    )}
                />
            </View>
            <View>
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
            <TouchableOpacity style={styles.buttonC} onPress={() => navigation.navigate("Locations")}>
                <Row>
                    <Text style={styles.button}>View More Recipes</Text>
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
    headtext: {
        fontSize: 18,
        color: Colors.Orange,
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
        width: Dimensions.get('window').width * 0.6,
        height: Dimensions.get('window').height * 0.25,
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
    weekTextC: {
        alignItems: 'center'
    },
    weekText: {
        fontSize: 16,
    },
    popularText1: {
        color: Colors.DescriptionText,
        width: 120,
        marginLeft: 12,
        fontSize: 18,
        marginBottom:5,
    },
    popularText2: {
        color: Colors.DescriptionText,
        width: 120,
        marginLeft: 12,
        fontSize: 14,
        marginBottom:5,
    },
    likeText: {
        color: Colors.Red,
        marginLeft: 5,
        fontSize: 16,
        fontWeight:'bold'

    },
    button: {
        color: Colors.Orange,
    },
    buttonC: {
        alignItems: 'center',
        padding: 5,
    },
});