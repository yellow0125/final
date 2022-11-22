
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import MainButton from '../components/UI/MainButton';
import { signOut } from "firebase/auth";
import { firestore, auth, storage } from '../firebase/firebase-setup';


export default function Profile() {

    return (
        <View>
            <Text>{auth.currentUser.email}</Text>
            <Text>{auth.currentUser.uid}</Text>
            <MainButton onPress={() => signOut(auth)} >Sign Out</MainButton>
        </View>
    );
}

