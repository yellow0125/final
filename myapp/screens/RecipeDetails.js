import React from "react";
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { firestore as db } from '../firebase/firebase-setup'
import { form } from '../constants/Style';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { updateLikesRecipeToDB, updateUnLikesRecipeToDB, deleteRecipeToDB } from '../firebase/firestore';
import { collection, onSnapshot, query, where, collectionGroup } from "firebase/firestore";
import { auth } from '../firebase/firebase-setup';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import MainButton from '../components/UI/MainButton';
import Row from '../components/UI/Row';
import RecipeImage from '../components/UI/RecipeImage';
import { Entypo } from '@expo/vector-icons';
import LottieView from "lottie-react-native";
export default function RecipeDetails({ navigation, route }) {
    const [recipe, setRecipe] = useState(route.params.item)
    const [liked, setLiked] = useState(false);
    const animation = React.useRef(null);
    const isFirstRun = React.useRef(true);

    useEffect(() => {
        const unsubsribe = onSnapshot(
            query(
                collection(db, "recipes"),
                where("likedUser", "array-contains", auth.currentUser.uid)),
            (QuerySnapshot) => {
                QuerySnapshot.docs.map((snapDoc) => {
                    if (snapDoc.id == recipe.key) {
                        setLiked(true);
                        console.log(auth.currentUser.uid, "liked", recipe.key);
                    }
                })
            });
        return () => {
            unsubsribe();
        }
    }, [],);

    React.useEffect(() => {
        if (isFirstRun.current) {
            if (liked) {
                animation.current.play(66, 66);
            } else {
                animation.current.play(19, 19);
            }
            isFirstRun.current = false;
        } else if (liked) {
            animation.current.play(19, 50);
        } else {
            animation.current.play(0, 19);
        }
    }, [liked]);



    const likeOperation = async () => {
        if (liked) {
            try {
                const currentLikes = recipe.like - 1;
                await updateUnLikesRecipeToDB({
                    recipe,
                    currentLikes
                });
                setLiked(false)
                recipe.like = currentLikes
                console.log('update unlikes', currentLikes);
            } catch (err) {
                console.log("update unlikes ", err);
            }
        }
        else {
            try {
                const currentLikes = recipe.like + 1;
                await updateLikesRecipeToDB({
                    recipe,
                    currentLikes
                });
                setLiked(true)
                recipe.like = currentLikes
                console.log('update likes', currentLikes);
            } catch (err) {
                console.log("update likes ", err);
            }
        }
    };

    function DeleteHandler() {
        Alert.alert("Delete", "Are you sure to Delete your recipe? It cannot be recovered after deletion!", [
            { text: "No", style: "cancel", onPress: nothingHappenOperation },
            { text: "Yes", style: "default", onPress: deleteOperation }
        ]);
    }

    function nothingHappenOperation() {
        return;
    }

    const deleteOperation = async () => {
        if (liked) {
            likeOperation();
        }
        try {
            const key = recipe.key;
            await deleteRecipeToDB(key);
            console.log('delete recipe', key);
            navigation.goBack();

        } catch (err) {
            console.log("delete recipe ", err);
        }

    };

    return (
        <ScrollView>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{recipe.title}</Text>
                <Text >featured in <Text style={styles.redText}>5 Hearty Slow Cooker Recipes</Text></Text>
                <Row style={{ marginTop: 15 }}>
                    <AntDesign name="like2" size={22} color={Colors.Black} />
                    <Text style={styles.boldText}> {recipe.like}</Text>
                    <Text> people like this recipe</Text>
                </Row>
                <Row style={{ marginTop: 15 }}>
                    <Entypo name="back-in-time" size={22} color={Colors.Black} />
                    <Text> Ready in </Text>
                    <Text style={styles.boldText}>{recipe.selectedDiff}</Text>
                </Row>
            </View>

            <View>
                <RecipeImage uri={recipe.uri} style={form.imageInDetail} />
            </View>
            <View>
                <Row style={styles.row}>
                    <MaterialCommunityIcons name="map-marker-radius" size={24} color={Colors.Black} />
                    <Text style={styles.pickerLabel}>Cuisine: </Text>
                    <Text style={[styles.content, { paddingRight: 22 }]}>{recipe.selectedCuisine}</Text>
                </Row>
                <Row style={styles.row}>
                    <MaterialCommunityIcons name="food-turkey" size={24} color={Colors.Black} />
                    <Text style={styles.pickerLabel}>Cook Style: </Text>
                    <Text style={styles.content}>{recipe.selectedCookStyle}</Text>
                </Row>
            </View>
            <View>
                <Row style={styles.row}>
                    <MaterialCommunityIcons name="food-variant" size={24} color={Colors.Black} />
                    <Text style={styles.pickerLabel}>Prepare Step </Text>
                </Row>
                {recipe.pre1.length > 1 && <View style={styles.stepC}>
                    <Text style={styles.step}><Entypo name="dot-single" size={20} color={Colors.Black} />{recipe.pre1}</Text>
                </View>}
                {recipe.pre2.length > 1 && <View style={styles.stepC}>
                    <Text style={styles.step}><Entypo name="dot-single" size={20} color={Colors.Black} />{recipe.pre2}</Text>
                </View>}
                <Row style={styles.row}>
                    <MaterialCommunityIcons name="pot-steam-outline" size={24} color={Colors.Black} />
                    <Text style={styles.pickerLabel}>Cook Step </Text>
                </Row>
                {recipe.step1.length > 1 && <View style={styles.stepC}>
                    <Text style={styles.step}><Entypo name="dot-single" size={20} color={Colors.Black} />{recipe.step1}</Text>
                </View>}
                {recipe.step2.length > 1 && <View style={styles.stepC}>
                    <Text style={styles.step}><Entypo name="dot-single" size={20} color={Colors.Black} />{recipe.step2}</Text>
                </View>}
                {recipe.step3.length > 1 && <View style={styles.stepC}>
                    <Text style={styles.step}><Entypo name="dot-single" size={20} color={Colors.Black} />{recipe.step3}</Text>
                </View>}
            </View>
            <View style={styles.actions}>
                <TouchableOpacity onPress={likeOperation}>
                    <LottieView
                        ref={animation}
                        style={styles.heartLottie}
                        source={require("../assets/lottie/like.json")}
                        autoPlay={false}
                        loop={false}
                    />
                </TouchableOpacity>
            </View>
            <Row style={styles.buttonsContainer2}>
                <MainButton style={styles.buttons} onPress={DeleteHandler} mode='light'>Delete</MainButton>
            </Row>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flex: 1,
        padding: 20,
    },
    title: {
        color: Colors.Black,
        fontWeight: 'bold',
        fontSize: 36,
    },
    redText: {
        fontWeight: 'bold',
        color: Colors.Red
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    pickerLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    row: {
        marginVertical: 10,
        borderBottomWidth: 2,
        borderColor: Colors.LightGrey,
    },
    content: {
        marginVertical: 5,
        fontSize: 16,

    },
    step: {
        fontSize: 16,
    },
    stepC: {
        marginVertical: 5,
        marginHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: Colors.White,
        borderRadius: 5,
        elevation: 3,
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2
    },
    buttonsContainer: {
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    buttonsContainer2: {
        justifyContent: 'center',
        marginTop: 0,
        marginBottom: 100,
    },
    buttons: {
        marginHorizontal: 8,
        marginLeft: 5,
        marginRight: 5,
        minWidth: 100,
    },
    heartLottie: {
        width: 100,
        height: 100,
    },
    actions: {
        position: 'absolute',
        marginLeft: 300,
        marginTop: 110,
        flexDirection: "row",
        height: 20,
    },
    heartLottieL: {
        width: 300,
        height: 300,
    },
    actionsL: {
        position: 'absolute',
        alignSelf: 'center',
        flexDirection: "row",
        height: 20,
    },

});