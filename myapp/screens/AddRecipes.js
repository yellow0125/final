import { StyleSheet, Text, View, Alert, Image } from 'react-native';
import React, { useState, useEffect } from "react";

import MainButton from '../components/UI/MainButton';
import Row from '../components/UI/Row';
import Input from '../components/UI/Input';
import Column from '../components/UI/Column';
import Colors from '../constants/Colors';
import {container, form} from '../constants/Style';

export default function AddRecipes({ navigation }) {
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');
    const [decription, setDescription] = useState('');
    const [image, setImage] = useState('');


    function submitHandler() {
        Alert.alert("Test", "Are you sure to submit your recipe?", [
            { text: "No", style: "cancel", onPress: resetHandler },
            { text: "Yes", style: "default", onPress: resetHandler }
        ]);
    }

    function resetHandler() {
        setTitle("");
        setDescription(0);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Share Your Recipe Here</Text>
            <Column>
                <Input label="Title" value={title} f_onChange={setTitle} />
                <Input label="Tags" value={tags} f_onChange={setTags} />
                <Input label="Description" value={decription} f_onChange={setDescription} mode="long"/>
            </Column>
            {image ? (
                <Image source={{ uri: image }} style={form.uploadedImage } />
            ) : (
                <MainButton style={styles.buttons} onPress={()=>navigation.navigate("Camera")}>Add a Picture</MainButton>
            )}
            <Row style={styles.buttonsContainer}>
                <MainButton style={styles.buttons} onPress={resetHandler}>Reset</MainButton>
                <MainButton style={styles.buttons} onPress={submitHandler}>Submit</MainButton>
            </Row>

        </View>

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.BgLightGreen,
        paddingTop: 30,
    },
    title: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24,
        marginVertical: 12,
    },
    buttonsContainer: {
        justifyContent: 'center',
        marginTop: 80,
    },
    buttons: {
        marginHorizontal: 8,
        minWidth: 100,
    },
    text: {
        marginLeft: 18,
    }
});