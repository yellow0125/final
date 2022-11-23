import { StyleSheet, View, Alert, TextInput, Image, ScrollView } from 'react-native';
import React, { useState, useEffect } from "react";
import { Entypo, Ionicons, FontAwesome } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';
import MainButton from '../components/UI/MainButton';
import Row from '../components/UI/Row';
import Input from '../components/UI/Input';
import Column from '../components/UI/Column';
import Colors from '../constants/Colors';
import { container, form } from '../constants/Style';
import ImageManager from './ImageManager';
import { uploadRecipeToDB, deleteFromDB } from "../firebase/firestore";
import { firestore, auth, storage } from "../firebase/firebase-setup";
import { ref, uploadBytes } from "firebase/storage";



export default function AddRecipes(props) {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [caption, setCaption] = useState("")
    const [description, setDescription] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [genderOpen, setGenderOpen] = useState(false);
    const [genderValue, setGenderValue] = useState(null);
    const [gender, setGender] = useState([
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Prefer Not to Say", value: "neutral" },
    ]);


    const getImage = async (uri) => {
        try {
            const response = await fetch(uri);
            const blob = await response.blob();
            return blob;
        } catch (err) {
            console.log("fetch image ", err);
        }
    };

    const submitOperation = async () => {
        let uri = props.route.params.image;
        try {
            if (uri) {
                const imageBlob = await getImage(uri);
                const imageName = uri.substring(uri.lastIndexOf("/") + 1);
                const imageRef = await ref(storage, `images/${imageName}`);
                const uploadResult = await uploadBytes(imageRef, imageBlob);
                uri = uploadResult.metadata.fullPath; //replaced the uri with reference to the storage location
            }
            await uploadRecipeToDB({title, description, uri});
            // props.navigation.navigate('Profile')
            console.log('image upload success')
        } catch (err) {
            console.log("image upload ", err);
        }
    };

    async function uploadImageTest() {
        let uri = props.route.params.image;
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


    function submitHandler() {
        Alert.alert("Submit & Share", "Are you sure to submit your recipe?", [
            { text: "No", style: "cancel", onPress: resetOperation },
            { text: "Yes", style: "default", onPress: submitOperation }
        ]);
    }

    function resetHandler() {
        Alert.alert("Reset", "Are you sure to reset your recipe?", [
            { text: "No", style: "cancel", onPress: resetOperation },
            { text: "Yes", style: "default", onPress: resetOperation }
        ]);
    }

    function resetOperation() {
        setTitle("");
        setDescription(0);
        setLocation('')
    }

    return (
        <ScrollView style={container.containerAdd}>
            <ImageManager navigation={props.navigation} />
            <Column>
                <Input
                    label="Title"
                    f_onChange={(newText) => { setTitle(newText) }}
                    value={title} />
                <Picker
                    label="location"
                    selectedValue={selectedLanguage}
                    mode={'dropdown'}
                    onValueChange={(itemValue) =>
                        setSelectedLanguage(itemValue)
                    }>
                    <Picker.Item label="China" value="java" />
                    <Picker.Item label="Japan" value="js" />
                    <Picker.Item label="Italy" value="js" />
                </Picker>
                <Input
                    label="Steps"
                    value={description}
                    f_onChange={(newText) => { setDescription(newText) }}
                    mode="long" />
            </Column>

            <Row style={styles.buttonsContainer}>
                <MainButton style={styles.buttons} onPress={resetHandler} mode='light'>Reset</MainButton>
                <MainButton style={styles.buttons} onPress={submitHandler} mode='light'>Submit</MainButton>
            </Row>
            <TextInput>dd</TextInput>
            <TextInput>dd</TextInput>
        </ScrollView>


    );
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
    imgbutton: {
        marginHorizontal: 8,
        minWidth: 100,
        backgroundColor: Colors.LightGrey,
        justifyContent: 'center',
        width: '100%',
        height: 200

    },
    text: {
        marginLeft: 18,
    },
    dropdown: {
        borderColor: "#B7B7B7",
        height: 50,
    },
});