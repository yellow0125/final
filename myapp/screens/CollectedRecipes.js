import { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { firestore } from '../firebase/firebase-setup';
import { collection, onSnapshot } from 'firebase/firestore';

import Colors from '../constants/Colors';

export default function CollectedRecipes({ navigation }) {

    return (
        <View style={styles.container}>
            <Text>Here is collected recipes!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.lightpurple,
        alignItems: 'center',
    },
});