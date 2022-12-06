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
import { FAB } from "react-native-elements";
import Column from "../components/UI/Column";

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
            
            <ScrollView style={styles.ScrollView}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{recipe.title}</Text>
                    <Text >featured in <Text style={styles.redText}>5 Hearty Slow Cooker Recipes</Text></Text>
                    <Row style={{ marginTop: 15 }}>
                        {/* <AntDesign name="like2" size={22} color={Colors.Black} /> */}
                        <View style={styles.lottieContainer}>
                            <LottieView
                                ref={animation}
                                style={styles.heartLottie2}
                                source={require("../assets/lottie/58909-like.json")}
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
                <Row style={styles.buttonsContainer2}>
                </Row>
            </ScrollView>
            <Column>
            <View style={styles.floatingButton}>
                <FAB
                    visible={deletable}
                    placement="right"
                    icon={{ name: 'delete', color: 'white' }}
                    color={Colors.Grey}
                    onPress={DeleteHandler}
                />
            </View>
            <View style={styles.floatingButton2}>
                <TouchableOpacity 
                    onPress={likeOperation}
                    style={styles.buttonsContainer2}
                    >
                    <LottieView
                        ref={animation}
                        style={styles.heartLottie}
                        source={require("../assets/lottie/like5.json")}
                        autoPlay={false}
                        loop={false}
                    />
                </TouchableOpacity>
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
        width: 50,
        height: 200,
    },
    buttons: {
        marginHorizontal: 8,
        marginLeft: 5,
        marginRight: 5,
        minWidth: 100,
    },
    heartLottie: {
        width: 75,
        height: 55,
        backgroundColor: Colors.Grey,
        color:Colors.White,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        borderRadius:50,
    },
    heartLottie2: {
        width: 50,
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
    floatingButton:{

        paddingVertical: 5,
        flexGrow: 1,
        right:15,
        bottom: 80,
    },
    floatingButton2: {
        width:20,
        left:304,
        bottom: 300,
    },
    lottieContainer: {
        right:12,
        bottom:20,
        height:20,
        width:30,

    }

});