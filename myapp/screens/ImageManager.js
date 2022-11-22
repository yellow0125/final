import { writeToDB, deleteFromDB } from "../firebase/firestore";
import { firestore, auth, storage } from "../firebase/firebase-setup";
import { ref, uploadBytes } from "firebase/storage";
import { StyleSheet, View, Alert, Image, ScrollView } from 'react-native';
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

export default function ImageManager({ navigation }) {
  const [imageUri, setImageUri] = useState('');

  const imageHandler = (uri) => {
    console.log("imageHandler called", uri);
    setImageUri(uri);
  };

  return (
    <View>
      {imageUri ? (
        <View style={{ marginHorizontal: 8 }}>
          <Image source={{ uri: imageUri }} style={form.uploadedImage} />
          <MainButton mode='negative' onPress={() => navigation.navigate("Camera", { imageHandler })}>
            <Entypo name="camera" mode='negative' size={12} color={Colors.White} /> Take Again
          </MainButton>
        </View>

      ) : (
        <MainButton style={styles.imgbutton} mode='negative' onPress={() => navigation.navigate("Camera", { imageHandler })}>
          <Entypo name="camera" size={24} color={Colors.White} /> Add a Picture
        </MainButton>
      )}
    </View>
  )
}


const styles = StyleSheet.create({
  imgbutton: {
    marginHorizontal: 8,
    minWidth: 100,
    backgroundColor: Colors.LightGrey,
    justifyContent: 'center',
    width: '100%',
    height: 200

  },
});