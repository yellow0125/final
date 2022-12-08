import React from "react";
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert, Dimensions, TouchableHighlight } from 'react-native';
import { firestore as db } from '../firebase/firebase-setup'
import { form } from '../constants/Style';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { updateLikesRecipeToDB, updateUnLikesRecipeToDB, deleteRecipeToDB } from '../firebase/firestore';
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth } from '../firebase/firebase-setup';
import Colors from '../constants/Colors';
import Row from '../components/UI/Row';
import RecipeImage from '../components/UI/RecipeImage';
import { Entypo } from '@expo/vector-icons';
import LottieView from "lottie-react-native";
import { FAB } from "react-native-elements";
import Column from "../components/UI/Column"

export default function RecipeDetails({ navigation, route }) {
    const [recipe, setRecipe] = useState(route.params.item)
    const [liked, setLiked] = useState(false);
    const [deletable, setDeletable] = useState(false);
    const animation = React.useRef(null);
    const isFirstRun = React.useRef(true);

    useEffect(() => {
        if (recipe.user == auth.currentUser.uid) {
            setDeletable(true);
        }
        const unsubsribe = onSnapshot(
            query(
                collection(db, "recipes"),
                where("likedUser", "array-contains", auth.currentUser.uid)),
            (QuerySnapshot) => {
                QuerySnapshot.docs.map((snapDoc) => {
                    if (snapDoc.id == recipe.key) {
                        setLiked(true);
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
        <View>
            <ScrollView>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{recipe.title}</Text>
                    <Text >featured in <Text style={styles.redText}>5 Hearty Slow Cooker Recipes</Text></Text>
                    <Row style={{ marginTop: 15 }}>
                        <View style={styles.lottieContainer}>
                            <LottieView
                                ref={animation}
                                style={styles.heartLottie2}
                                source={require("../assets/lottie/like-thumb.json")}
                                autoPlay
                                loop
                                speed={0.5}
                            />
                        </View>
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
                <View style={styles.allcuisine}>
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
                <View style={styles.allSteps}>
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
            </ScrollView>
            <Column>
                <View style={styles.floatingButton}>
                    <FAB
                        visible={deletable}
                        placement="right"
                        icon={{ name: 'delete', color: Colors.White }}
                        color={Colors.Orange}
                        onPress={DeleteHandler}
                        size='small'
                    />
                </View>
                <View style={styles.floatingButton2}>
                    <TouchableHighlight
                        onPress={likeOperation}
                        style={styles.buttonsContainer2}
                    >
                        <LottieView
                            ref={animation}
                            style={styles.heartLottie}
                            source={require("../assets/lottie/like.json")}
                            autoPlay={false}
                            loop={false}
                        />
                    </TouchableHighlight>
                </View>
            </Column>
        </View>
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
        fontSize: 28,
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
        elevation: 2,
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1
    },
    allcuisine: {
        marginLeft: 12,
    },
    allSteps: {
        marginBottom: 80,
        marginLeft: 12,
    },
    buttonsContainer: {
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    buttonsContainer2: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: Colors.Orange,
        backgroundColor: Colors.White,
        opacity: 0.99
    },
    buttons: {
        marginHorizontal: 8,
        marginLeft: 5,
        marginRight: 5,
        minWidth: 100,
    },
    heartLottie: {
        alignSelf: 'center',
        width: 60,
        height: 60,
        color: Colors.White,
        borderRadius: 50,
    },
    heartLottie2: {
        width: 50,
    },
    floatingButton: {
        paddingVertical: 5,
        flexGrow: 1,
        right: Dimensions.get('window').width * 0.01,
        bottom: Dimensions.get('window').height * 0.34,
        opacity: 0.95
    },
    floatingButton2: {
        width: 20,
        left: Dimensions.get('window').width * 0.87,
        bottom: Dimensions.get('window').height * 0.47,
    },
    lottieContainer: {
        right: 12,
        bottom: 20,
        height: 20,
        width: 30,
    },
});