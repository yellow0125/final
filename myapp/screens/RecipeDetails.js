import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert} from 'react-native';
import { firestore as db } from '../firebase/firebase-setup'
import { container, form } from '../constants/Style';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { updateLikesRecipeToDB, updateUnLikesRecipeToDB, deleteRecipeToDB } from '../firebase/firestore';
import { collection, onSnapshot, query, where, collectionGroup } from "firebase/firestore";
import { auth } from '../firebase/firebase-setup';

import Colors from '../constants/Colors';
import MainButton from '../components/UI/MainButton';
import Row from '../components/UI/Row';
import Column from '../components/UI/Column';

import RecipeImage from '../components/UI/RecipeImage';

export default function RecipeDetails({ navigation, route }) {
    const recipe = route.params.item;
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const unsubsribe = onSnapshot(
            query(
                collection(db, "recipes"),
                where("likedUser", "array-contains", auth.currentUser.uid)),

            (QuerySnapshot) => {
                QuerySnapshot.docs.map((snapDoc) => {
                    if (snapDoc.id == recipe.key){
                        setLiked(true);
                        console.log(auth.currentUser.uid, "liked", recipe.key);
                    } 
                })
            });
        return () => {
            unsubsribe();
        }
    }, [],);


    function LikeHandler() {
        Alert.alert("Like", "Are you sure to like this recipe?", [
            { text: "No", style: "cancel", onPress: nothingHappenOperation },
            { text: "Yes", style: "default", onPress: likeOperation }
        ]);
    }

    function UnLikeHandler() {
        Alert.alert("Unlike", "Are you sure to unlike your recipe?", [
            { text: "No", style: "cancel", onPress: nothingHappenOperation },
            { text: "Yes", style: "default", onPress: unLikeOperation }
        ]);
    }

    function DeleteHandler() {
        Alert.alert("Delete", "Are you sure to Delete your recipe? It cannot be recovered after deletion!", [
            { text: "No", style: "cancel", onPress: nothingHappenOperation },
            { text: "Yes", style: "default", onPress: deleteOperation }
        ]);
    }


    const likeOperation = async () => {
        if (liked) {
            Alert.alert("Already Liked", "You already liked this recipe", [
                { text: "ok", style: "cancel", onPress: nothingHappenOperation }
            ]);
        }
        else {
        try {
            const currentLikes = recipe.like + 1;
            await updateLikesRecipeToDB({
                recipe,
                currentLikes
            });
            console.log('update likes', currentLikes);
            navigation.goBack();

        } catch (err) {
            console.log("update likes ", err);
        }}
    };

    const unLikeOperation = async () => {
        if (!liked) {
            Alert.alert("Already unliked", "You didn't like this recipe", [
                { text: "ok", style: "cancel", onPress: nothingHappenOperation }
            ]);
        } else {
        try {
            const currentLikes = recipe.like - 1;
            await updateUnLikesRecipeToDB({
                recipe,
                currentLikes
            });
            console.log('update unlikes', currentLikes);
            navigation.goBack();

        } catch (err) {
            console.log("update unlikes ", err);
        }}
    };

    const deleteOperation = async () => {

        if (liked) {
            unLikeOperation();
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

    function comebackOperation() {
        navigation.goBack();
    }

    function nothingHappenOperation() {
        return;
    }


    return (
        <ScrollView style={container.containerAdd}>


            <Column>


                <View style={styles.pickerContainer}>
                    <RecipeImage uri={recipe.uri} style={form.imageInDetail} />

                </View>

                <View >
                    <Text style={styles.title}>{recipe.title}</Text>

                </View>


                <View style={styles.pickerContainer}>

                    <Text style={styles.pickerLabel}>
                        <MaterialCommunityIcons name="map-marker-radius" size={20} color={Colors.Black} />
                        Cuisine</Text>
                    <Text style={styles.content}>{recipe.selectedCuisine}</Text>
                </View>

                <View style={styles.pickerContainer}>

                    <Text style={styles.pickerLabel}>
                        <MaterialCommunityIcons name="food-turkey" size={24} color={Colors.Black} />
                        Cook Style</Text>
                    <Text style={styles.content}>{recipe.selectedCookStyle}</Text>
                </View>

                <View style={styles.pickerContainer}>
                    <Text style={styles.pickerLabel}>
                        <Ionicons name="timer-outline" size={20} color={Colors.Black} />
                        Difficulty</Text>
                    <Text style={styles.content}>{recipe.selectedDiff}</Text>

                </View>

                <View style={styles.pickerContainer}>
                    <Text style={styles.pickerLabel}>
                        <MaterialCommunityIcons name="food-variant" size={24} color={Colors.Black} />
                        Prepare Step</Text>
                    <Text style={styles.content}>{recipe.step1}</Text>

                </View>

                <View style={styles.pickerContainer}>
                    <Text style={styles.pickerLabel}>
                        <MaterialCommunityIcons name="pot-steam-outline" size={24} color={Colors.Black} />
                        Cook Step</Text>
                    <Text style={styles.content}>{recipe.step2}</Text>

                </View>


                
            </Column>

            <Row style={styles.buttonsContainer}>
                <MainButton style={styles.buttons} onPress={LikeHandler} mode='light'>Like</MainButton>
                <MainButton style={styles.buttons} onPress={UnLikeHandler} mode='light'>Unlike</MainButton>
            </Row>
            <Row style={styles.buttonsContainer2}>
                <MainButton style={styles.buttons} onPress={DeleteHandler} mode='light'>Delete</MainButton>
            </Row>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.lightpurple,
        alignItems: 'flex-start',
    },
    pickerContainer: {
        marginLeft: 20
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
    pickerLabel: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    title: {
        textAlign: 'center',
        color: Colors.Black,
        fontWeight: 'bold',
        fontSize: 24,
    },
    content: {
        marginLeft: 30,
        marginVertical: 5,
        fontSize: 17,
    }
});