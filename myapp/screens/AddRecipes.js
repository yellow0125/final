import { StyleSheet, Text, View, Alert, Image} from 'react-native';
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

export default function AddRecipes({ navigation }) {
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');
    
    const [decription, setDescription] = useState('');
    const [image, setImage] = useState('');

    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [genderOpen, setGenderOpen] = useState(false);
    const [genderValue, setGenderValue] = useState(null);
    const [gender, setGender] = useState([
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Prefer Not to Say", value: "neutral" },
    ]);


    function submitHandler() {
        Alert.alert("Submit & Share", "Are you sure to submit your recipe?", [
            { text: "No", style: "cancel", onPress: resetOperation },
            { text: "Yes", style: "default", onPress: resetOperation }
        ]);
    }

    function resetHandler() {
        Alert.alert("Reset", "Are you sure to reset your recipe?", [
            { text: "No", style: "cancel", onPress: resetOperation },
            { text: "Yes", style: "default", onPress: resetOperation }
        ]);
    }

    // store all the information into firebase
    function submitOperation() {
        setTitle("");
        setDescription(0);
    }

    function resetOperation() {
        setTitle("");
        setDescription(0);
    }

    return (
        <View style={container.containerAdd}>
            <Text style={styles.title}>Share Your Recipe Here</Text>
            <Column>
                <Input label="Title" value={title} f_onChange={setTitle} />
                {/* <Input label="Tags" value={tags} f_onChange={setTags} /> */}
                {/* <DropDownPicker
                    style={styles.dropdown}
                    open={genderOpen}
                    value={genderValue} //genderValue
                    items={gender}
                    setOpen={setGenderOpen}
                    setValue={setGenderValue}
                    setItems={setGender}
                    placeholder="Select Gender"
                    placeholderStyle={styles.placeholderStyles}
                    // onOpen={onGenderOpen}
                    // onChangeValue={onChange}
                    // zIndex={3000}
                    // zIndexInverse={1000}
                /> */}
                <Picker
                    label="Tags"
                    selectedValue={selectedLanguage}
                    mode={'dropdown'}
                    onValueChange={(itemValue) =>
                        setSelectedLanguage(itemValue)
                    }>
                    <Picker.Item label="China" value="java" />
                    <Picker.Item label="Japan" value="js" />
                    <Picker.Item label="Italy" value="js" />
                </Picker>
                <Input label="Description" value={decription} f_onChange={setDescription} mode="long" />
            </Column>
            {image ? (
                <Image source={{ uri: image }} style={form.uploadedImage} />
            ) : (
                <MainButton style={styles.buttons} mode='negative' onPress={() => navigation.navigate("Camera")}>
                    <Entypo name="camera" size={24} color={Colors.Grey} /> Add a Picture
                </MainButton>
            )}
            <Row style={styles.buttonsContainer}>
                <MainButton style={styles.buttons} onPress={resetHandler} mode='light'>Reset</MainButton>
                <MainButton style={styles.buttons} onPress={submitHandler} mode='light'>Submit</MainButton>
            </Row>
        </View>

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
    text: {
        marginLeft: 18,
    },
    dropdown: {
        borderColor: "#B7B7B7",
        height: 50,
    },
});