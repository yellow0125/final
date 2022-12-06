import { StyleSheet, Alert, ScrollView, Text, View } from 'react-native';
import React, { useState } from "react";
import { Picker } from '@react-native-picker/picker';
import MainButton from '../components/UI/MainButton';
import Row from '../components/UI/Row';
import Input from '../components/UI/Input';
import MultipleInput from '../components/UI/MultipleInput';
import Column from '../components/UI/Column';
import Colors from '../constants/Colors';
import { container } from '../constants/Style';
import ImageManager from './ImageManager';
import { uploadRecipeToDB } from "../firebase/firestore";
import { storage } from "../firebase/firebase-setup";
import { ref, uploadBytes } from "firebase/storage";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Snackbar } from 'react-native-paper';

export default function AddRecipes(props) {
    const [imageUri, setImageUri] = useState('');
    const imageHandler = (uri) => {
        setImageUri(uri);
    };

    const [title, setTitle] = useState('');
    const [pre1, setPre1] = useState('');
    const [pre2, setPre2] = useState('');
    const [step1, setStep1] = useState('');
    const [step2, setStep2] = useState('');
    const [step3, setStep3] = useState('');
    const [selectedCuisine, setSelectedCuisine] = useState('');
    const [selectedDiff, setSelectedDiff] = useState('');
    const [selectedCookStyle, setSelectedCookStyle] = useState('');
    const [isValid, setIsValid] = useState(true);

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
                pre1,
                pre2,
                step1,
                step2,
                step3,
                uri,
                likedUser: [],
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
        if (title.length == 0 || step1.length == 0 || pre1.length == 0) {
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
        setPre1('');
        setPre2('');
        setStep1('');
        setStep2('');
        setStep3('');
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
                    value={title}
                />
                <MultipleInput
                    label="Prepare 1"
                    f_onChange={(newText) => { setPre1(newText) }}
                    value={pre1} />
                <MultipleInput
                    label="Prepare 2"
                    f_onChange={(newText) => { setPre2(newText) }}
                    value={pre2} />

                <MultipleInput
                    label="Step 1"
                    f_onChange={(newText) => { setStep1(newText) }}
                    value={step1} />
                <MultipleInput
                    label="Step 2"
                    f_onChange={(newText) => { setStep2(newText) }}
                    value={step2} />
                <MultipleInput
                    label="Step 3"
                    f_onChange={(newText) => { setStep3(newText) }}
                    value={step3} />

                <View style={styles.pickerContainer}>
                    <Text style={styles.pickerLabel}>
                        <MaterialCommunityIcons name="map-marker-radius" size={20} color={Colors.Black} />
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
                        <Picker.Item label="African" value="African" />
                        <Picker.Item label="United States" value="United States" />
                        <Picker.Item label="Brazilian" value="Brazilian" />
                        <Picker.Item label="British" value="British" />
                        <Picker.Item label="Chinese" value="Chinese" />
                        <Picker.Item label="French" value="French" />
                        <Picker.Item label="German" value="German" />
                        <Picker.Item label="Indian" value="Indian" />
                        <Picker.Item label="Italian" value="Italian" />
                        <Picker.Item label="Japanese" value="Japanese" />
                        <Picker.Item label="Korean" value="Korean" />
                        <Picker.Item label="Seafood" value="Seafood" />
                        <Picker.Item label="Other" value="Other" />
                    </Picker>
                </View>

                <View style={styles.pickerContainer}>
                    <Text style={styles.pickerLabel}>
                        <MaterialCommunityIcons name="food-turkey" size={24} color={Colors.Black} />
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
                        <Picker.Item label="Boil" value="Boil" />
                        <Picker.Item label="Bake" value="Bake" />
                        <Picker.Item label="Deep-Fry" value="Deep-Fry" />
                        <Picker.Item label="Grill" value="Grill" />
                        <Picker.Item label="Pan Fry" value="Pan Fry" />
                        <Picker.Item label="Mashup" value="Mashup" />
                        <Picker.Item label="Drinks/Dessert" value="Drinks/Dessert" />
                        <Picker.Item label="Simmer" value="Simmer" />
                        <Picker.Item label="Steam" value="Steam" />
                        <Picker.Item label="Other" value="Other" />
                    </Picker>
                </View>

                <View style={styles.pickerContainer}>

                    <Text style={styles.pickerLabel}>
                        <Ionicons name="timer-outline" size={20} color={Colors.Black} />
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
                        <Picker.Item label="Under 15 minutes" value="Under 15 minutes" />
                        <Picker.Item label="Under 30 minutes" value="Under 30 minutes" />
                        <Picker.Item label="Under 45 minutes" value="Under 45 minutes" />
                        <Picker.Item label="Under 1 hour" value="Under 1 hour" />
                        <Picker.Item label="More than 1 hour" value="More than 1 hour" />
                    </Picker>
                </View>
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
        marginBottom: 590
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
        marginBottom: 40,
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
    step: {
        minHeight: 30,
    },
});