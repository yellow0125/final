import { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { firestore } from '../firebase/firebase-setup';
import { collection, onSnapshot } from 'firebase/firestore';
import RecipeList from '../components/RecipeList';

import Colors from '../constants/Colors';

export default function AllRecipes({ navigation }) {

    return (
        <View style={styles.container}>
            <RecipeList />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White,
        alignItems: 'center',
    },
});