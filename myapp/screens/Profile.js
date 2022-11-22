
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { collection, addDoc, doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import MainButton from '../components/UI/MainButton';
import { signOut } from "firebase/auth";
import { firestore, auth, storage } from '../firebase/firebase-setup';
import { getUser } from '../firebase/firestore';


export default function Profile({navigation}) {
    const [userData, setUserData] = useState([]);

    // useEffect(() => {
    //     (async () => {
    //         const docRef = doc(firestore, "Users", auth.currentUser.uid);
    //         const docSnap = await getDoc(docRef);
    //         setUserData(docSnap.data());
    //     })();
    // }, []);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            doc(firestore, "users", auth.currentUser.uid), (doc) => {
                let data = doc.data();
                data = { ...data, key: doc.id };
                console.log(data);
                setUserData(data);
            }
        );
        return () => {
            unsubscribe();
        };
    }, []);


    return (
        <View>
            <MainButton onPress={() => navigation.navigate("EditProfile", { userData })}>Edit Profilew</MainButton>
            <Text>{userData.username}</Text>
            <Text>{userData.gender}</Text>
            <Text>{userData.location}</Text>
            <Text>{auth.currentUser.email}</Text>
            <MainButton onPress={() => signOut(auth)} >Sign Out</MainButton>
        </View>
    );
}

