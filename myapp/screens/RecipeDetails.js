import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView} from 'react-native';
import { firestore } from '../firebase/firebase-setup';
import { collection, onSnapshot } from 'firebase/firestore';
import { container, form } from '../constants/Style';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import MainButton from '../components/UI/MainButton';
import Row from '../components/UI/Row';
import Column from '../components/UI/Column';

import RecipeImage from '../components/UI/RecipeImage';

export default function RecipeDetails({ navigation, route }) {
    const recipe = route.params.item;

    return (
        // <View style={styles.container}>
            
               
        //         <Text>{recipe.selectedCuisine}</Text>
        //         <Text>{recipe.selectedCookStyle}</Text>
        //         <Text>{recipe.selectedDiff}</Text>
        //         <Text>{recipe.step1}</Text>
        //         <Text>{recipe.step2}</Text>
                
            
        // </View>


        <ScrollView style={container.containerAdd}>


            <Column>


                <View >
                    <Text style={styles.title}>{recipe.title}</Text>

                </View>


                <View style={styles.pickerContainer}>

                    <Text style={styles.pickerLabel}>
                        <MaterialCommunityIcons name="pot-steam-outline" size={20} color="black" />
                        Cuisine</Text>
                    <Text style={styles.content}>{recipe.selectedCuisine}</Text>
                </View>

                <View style={styles.pickerContainer}>

                    <Text style={styles.pickerLabel}>
                        <MaterialCommunityIcons name="food-turkey" size={24} color="black" />
                        Cook Style</Text>
                    <Text style={styles.content}>{recipe.selectedCookStyle}</Text>
                </View>

                <View style={styles.pickerContainer}>
                    <Text style={styles.pickerLabel}>
                        <Ionicons name="timer-outline" size={20} color="black" />
                        Difficulty</Text>
                    <Text style={styles.content}>{recipe.selectedDiff}</Text>

                </View>

                <View style={styles.pickerContainer}>
                    <Text style={styles.pickerLabel}>
                        <MaterialCommunityIcons name="food-turkey" size={24} color="black" />
                        Prepare Step</Text>
                    <Text style={styles.content}>{recipe.step1}</Text>

                </View>

                <View style={styles.pickerContainer}>
                    <Text style={styles.pickerLabel}>
                        <MaterialCommunityIcons name="food-turkey" size={24} color="black" />
                        Cook Step</Text>
                    <Text style={styles.content}>{recipe.step2}</Text>

                </View>

                <View style={styles.pickerContainer}>
                    <RecipeImage uri={recipe.uri} style={form.imageInDetail} />

                </View>

                
            </Column>

            {/* <Row style={styles.buttonsContainer}>
                <MainButton style={styles.buttons} onPress={resetHandler} mode='light'>Reset</MainButton>
                <MainButton style={styles.buttons} onPress={submitHandler} mode='light'>Submit</MainButton>
            </Row> */}
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
    pickerLabel: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    title: {
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold',
        fontSize: 24,
        marginVertical: 12,
    },
    content: {
        marginLeft: 30,
        marginVertical: 5,
        fontSize: 17,
    }
});