
import { StyleSheet, View, Image, } from 'react-native';
import React, { useState } from "react";
import { Entypo } from '@expo/vector-icons';
import MainButton from '../components/UI/MainButton';
import Colors from '../constants/Colors';
import { form } from '../constants/Style';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state',]);
export default function ImageManager({ navigation }) {
  const [imageUri, setImageUri] = useState('');

  const imageHandler = (uri) => {
    // console.log("imageHandler called", uri);
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