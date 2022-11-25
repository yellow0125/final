import { View, Text, Dimensions, Pressable } from 'react-native'
import React from 'react'
import { useState, useEffect } from "react";
import { firestore as db } from '../firebase/firebase-setup'
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { FlatList } from 'react-native';
import RecipeButton from '../components/UI/RecipeButton';
import { StyleSheet } from 'react-native';
import { container, form } from '../constants/Style';
import Row from '../components/UI/Row';
import Colors from '../constants/Colors';
import RecipeImage from '../components/UI/RecipeImage';
import Column from '../components/UI/Column';
import { AntDesign } from '@expo/vector-icons';
import { auth } from '../firebase/firebase-setup';
export default function MyRecipes({ navigation }) {
    const [recipes, setRecipes] = useState();

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
    return (
        <FlatList
            data={recipes}
            numColumns={2}
            // key={2}
            keyExtractor={item => item.key}
            renderItem={({ item }) => (
                <Pressable
                    style={styles.wholeContainer}
                    android_ripple={{ color: Colors.LightGrey, foreground: true }}
                    onPress={() => console.log("navigate to detailRecipe Screen")}
                    >
                        
                    <View style={styles.imgcontainer}>
                        <RecipeImage uri={item.uri} style={form.imageInPost2} />
                    </View>
                    <View>
                        <Row>
                            <Text style={styles.titleText}>{item.title}</Text>
                            <AntDesign name="like2" size={20} color="black" />
                            <Text>{item.like}</Text>
                        </Row>
                    </View>
                </Pressable>

            )}
        />
    );
}

const styles = StyleSheet.create({
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
        fontWeight:'bold',
    },
})