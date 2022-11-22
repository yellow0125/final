import { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { firestore } from '../firebase/firebase-setup';
import { collection, onSnapshot } from 'firebase/firestore';
import { auth } from "../firebase/firebase-setup";

import Colors from '../constants/Colors';

export default function Profile({ navigation }) {

    return (
        <View style={styles.container}>
            <Text>{auth.currentUser.email}</Text>
            <Text>{auth.currentUser.uid}</Text>
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