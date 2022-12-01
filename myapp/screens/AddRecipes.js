import { StyleSheet, Alert, TextInput, ScrollView, Text, View } from 'react-native';
import React, { useState } from "react";
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
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Snackbar } from 'react-native-paper';
import Spacer from "react-native-spacer";

export default function AddRecipes(props) {
    const [imageUri, setImageUri] = useState('');
    const imageHandler = (uri) => {
        setImageUri(uri);
    };

    const [title, setTitle] = useState('');
    const [step1, setStep1] = useState('');
    const [step2, setStep2] = useState('');
    const [selectedCuisine, setSelectedCuisine] = useState('');
    const [selectedDiff, setSelectedDiff] = useState('');
    const [selectedCookStyle, setSelectedCookStyle] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [likedUser, setLikedUser] = useState({});
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
            await uploadRecipeToDB({
                title,
                selectedCuisine,
                selectedCookStyle,
                selectedDiff,
                step1,
                step2,
                uri,
                likedUser:[],
            });
            props.navigation.navigate('MyRecipes')
            console.log('image upload success')
            resetOperation()

        } catch (err) {
            console.log("image upload ", err);
        }
    };

    async function uploadImageTest() {
        let uri = props.route.params.image;
        const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;
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
        if (imageUri.length == 0) {
            setIsValid({ bool: true, boolSnack: true, message: "Please add a picture" })
            return;
        }
        if (title.length == 0 || step1.length == 0 || step2.length == 0) {
            setIsValid({ bool: true, boolSnack: true, message: "Please fill out everything" })
            return;
        }
        if (selectedCuisine == 'defaultC' || selectedCookStyle == 'defaultCS' || selectedDiff == 'defaultD') {
            setIsValid({ bool: true, boolSnack: true, message: "Please selete all tags" })
            return;
        }
        else {
            Alert.alert("Submit & Share", "Are you sure to submit your recipe?", [
                { text: "No", style: "cancel", onPress: resetOperation },
                { text: "Yes", style: "default", onPress: submitOperation }
            ]);

        }

    }

    function resetHandler() {
        Alert.alert("Reset", "Are you sure to reset your recipe?", [
            { text: "No", style: "cancel", onPress: resetOperation },
            { text: "Yes", style: "default", onPress: resetOperation }
        ]);
    }

    function resetOperation() {
        setTitle('');
        setStep1('');
        setStep2('');
        setSelectedCuisine('defaultC')
        setSelectedCookStyle('defaultCS')
        setSelectedDiff('defaultD')
        setImageUri('')
    }

    return (

        <ScrollView style={container.containerAdd}>
            <ImageManager navigation={props.navigation} imageHandler={imageHandler} imageUri={imageUri} />
            <Snackbar
                style={styles.snackbar}
                visible={isValid.boolSnack}
                duration={2000}
                onDismiss={() => { setIsValid({ boolSnack: false }) }}>
                {isValid.message}
            </Snackbar>

            <Column>

                <Input
                    label="Title"
                    f_onChange={(newText) => { setTitle(newText) }}
                    value={title} />

                <View style={styles.pickerContainer}>
                    <Text style={styles.pickerLabel}>
                        <MaterialCommunityIcons name="map-marker-radius" size={20} color="black" />
                        Cuisine</Text>
                    <Picker
                        label="cuisine"
                        selectedValue={selectedCuisine}
                        mode={'dropdown'}
                        onValueChange={(itemValue) =>
                            setSelectedCuisine(itemValue)
                        }
                    >
                        <Picker.Item label="Please Select" value="defaultC" />
                        <Picker.Item label="China" value="china" />
                        <Picker.Item label="Japan" value="japan" />
                        <Picker.Item label="Italy" value="italy" />
                        <Picker.Item label="America" value="america" />
                        <Picker.Item label="British" value="british" />
                        <Picker.Item label="Franch" value="franch" />
                    </Picker>
                </View>

                <View style={styles.pickerContainer}>
                    <Text style={styles.pickerLabel}>
                        <MaterialCommunityIcons name="food-turkey" size={24} color="black" />
                        Cooking Style</Text>
                    <Picker
                        label="cookingstyle"
                        selectedValue={selectedCookStyle}
                        mode={'dropdown'}
                        onValueChange={(itemValue) =>
                            setSelectedCookStyle(itemValue)
                        }
                    >
                        <Picker.Item label="Please Select" value="defaultCS" />
                        <Picker.Item label="Bake" value="bake" />
                        <Picker.Item label="Deep-Fry" value="deepfry" />
                        <Picker.Item label="Steam" value="steam" />
                        <Picker.Item label="Grill" value="grill" />
                        <Picker.Item label="Pan Fry" value="panfry" />
                        <Picker.Item label="Mashup" value="mashup" />
                    </Picker>
                </View>
                <View style={styles.pickerContainer}>

                    <Text style={styles.pickerLabel}>
                        <Ionicons name="timer-outline" size={20} color="black" />
                        Difficulty</Text>
                    <Picker
                        label="difficulty"
                        selectedValue={selectedDiff}
                        mode={'dropdown'}
                        onValueChange={(itemValue) =>
                            setSelectedDiff(itemValue)
                        }
                    >
                        <Picker.Item label="Please Select" value="defaultD" />
                        <Picker.Item label="Under 15 minutes" value="15min" />
                        <Picker.Item label="Under 30 minutes" value="30min" />
                        <Picker.Item label="Under 45 minutes" value="45min" />
                        <Picker.Item label="Under 1 hour" value="60min" />
                    </Picker>
                </View>

                <Spacer style={styles.inputWrapper}>

                    <Input
                        label="Prepare Step"
                        value={step1}
                        f_onChange={(newText) => { setStep1(newText) }}
                        mode="long" />
                    <Input
                        label="Cook Step"
                        value={step2}
                        f_onChange={(newText) => { setStep2(newText) }}
                        mode="long" />
                </Spacer>
            </Column>

            <Row style={styles.buttonsContainer}>
                <MainButton style={styles.buttons} onPress={resetHandler} mode='light'>Reset</MainButton>
                <MainButton style={styles.buttons} onPress={submitHandler} mode='light'>Submit</MainButton>
            </Row>
        </ScrollView>


    );
}

const styles = StyleSheet.create({
    snackbar: {
        marginBottom: 400
    },
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
        marginBottom:40,
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
    pickerContainer: {
        marginLeft: 20
    },
    pickerLabel: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    inputWrapper: {
        backgroundColor: '#FFFFFF',
        padding: 20
      },
});