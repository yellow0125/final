import React, {useState} from "react";
import { View, TextInput, Image, StyleSheet } from "react-native";

import { writeToDB, deleteFromDB } from "../firebase/firestore";
import { firestore, auth, storage } from "../firebase/firebase-setup";
import { ref, uploadBytes } from "firebase/storage";

// import firebase from "firebase/compat/app";
// require("firebase/compat/firestore");
// require("firebase/compat/storage");

// import firebase from "firebase";
// require('firebase/firestore');
// require("firebase/firebase-storage");

import Input from '../components/UI/Input';
import MainButton from '../components/UI/MainButton';
import Colors from "../constants/Colors";

export default function SavePicture(props) {
    console.log(props.route.params.image)
    const [caption, setCaption] = useState("")


    const getImage = async (uri) => {
        try {
            const response = await fetch(uri);
            const blob = await response.blob();
            return blob;
        } catch (err) {
            console.log("fetch image ", err);
        }
    };
    const uploadImage = async() => {
        // const uri = newObj.uri;
        const uri = props.route.params.image;
        try {
            if (uri) {
                const imageBlob = await getImage(uri);
                const imageName = uri.substring(uri.lastIndexOf("/") + 1);
                const imageRef = await ref(storage, `images/${imageName}`);
                const uploadResult = await uploadBytes(imageRef, imageBlob);
                uri = uploadResult.metadata.fullPath; //replaced the uri with reference to the storage location
            }
            await writeToDB(uri);
        } catch (err) {
            console.log("image upload ", err);
        }
        setModalVisible(false);
    };


    async function uploadImageTest() {
        const uri = props.route.params.image;
        const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;
        console.log(childPath);

        const response = await fetch(uri);
        const blob = await response.blob();

        const task = firebase
            .storage()
            .ref()
            .child(childPath)
            .put(blob);

        const taskProgress = snapshot => {
            console.log(`transferred: ${snapshot.bytesTransferred}`);
        };

        const taskCompleted = () => {
            task.ref.getDownloadURL().then((snapshot) => {
                console.log(snapshot);
            });
        };

        const taskError = snapshot => {
            console.log(snapshot);
        };

        task.on("state_changed", taskProgress, taskError, taskCompleted);
        console.log("upload picture")

    }

    return (
        <View style={{flex:1}}>
            <Image source={{ uri: props.route.params.image }} style={{ flex: 1 }} />
            <MainButton style={styles.buttons} onPress={uploadImage} mode='light'>Save</MainButton>


        </View>
    )
}


const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        color: Colors.BgDarkGreen,
        fontWeight: 'bold',
        fontSize: 24,
        marginVertical: 12,
    },
    buttonsContainer: {
        justifyContent: 'center',
        marginTop: 20,
    },
    buttons: {
        marginHorizontal: 8,
        minWidth: 100,
    },
    text: {
        marginLeft: 18,
    },
    dropdown: {
        borderColor: "#B7B7B7",
        height: 50,
    },
});