import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert, FlatList } from 'react-native';
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
import { MaterialIcons } from '@expo/vector-icons';
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
            }
        }
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
            }
        }
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
                <View style={styles.stepC}>
                    <Text style={styles.step}><Entypo name="dot-single" size={20} color={Colors.Black} />{recipe.pre1}</Text>
                </View>
                <View style={styles.stepC}>
                    <Text style={styles.step}><Entypo name="dot-single" size={20} color={Colors.Black} />{recipe.pre2}</Text>
                </View>
                <Row style={styles.row}>
                    <MaterialCommunityIcons name="pot-steam-outline" size={24} color={Colors.Black} />
                    <Text style={styles.pickerLabel}>Cook Step </Text>
                </Row>
                <View style={styles.stepC}>
                    <Text style={styles.step}><Entypo name="dot-single" size={20} color={Colors.Black} />{recipe.step1}</Text>
                </View>
                <View style={styles.stepC}>
                    <Text style={styles.step}><Entypo name="dot-single" size={20} color={Colors.Black} />{recipe.step2}</Text>
                </View>
                <View style={styles.stepC}>
                    <Text style={styles.step}><Entypo name="dot-single" size={20} color={Colors.Black} />{recipe.step3}</Text>
                </View>
            </View>


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
        backgroundColor:Colors.White,
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

});