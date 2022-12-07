
import { StyleSheet, View, Image, Text, TouchableHighlight, } from 'react-native';
import React from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MainButton from '../components/UI/MainButton';
import Colors from '../constants/Colors';
import { form } from '../constants/Style';
import { LogBox } from 'react-native';
import Row from '../components/UI/Row';

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state',]);
export default function ImageManager({ navigation, imageHandler, imageUri }) {

  return (
    <View>
      {imageUri ? (
        <View style={{ marginHorizontal: 8 }}>
          <Image source={{ uri: imageUri }} style={form.uploadedImage} />
          <MainButton mode='negative' onPress={() => navigation.navigate("Camera", { imageHandler })}>
            <MaterialCommunityIcons name="image-plus" size={24} color={Colors.Red} />  Take Again
          </MainButton>
        </View>

      ) : (
        <TouchableHighlight
          onPress={() => navigation.navigate("Camera", { imageHandler })}
        >
          <View View style={styles.imgbutton} mode='negative'>
            <Row style={{justifyContent:'center'}}>
              <MaterialCommunityIcons name="image-plus" size={24} color={Colors.Red} />
              <Text style={styles.text}>   Add a Picture</Text>
            </Row>
          </View>
        </TouchableHighlight>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  imgbutton: {
    minWidth: 100,
    backgroundColor: Colors.LightGrey,
    justifyContent: 'center',
    width: '100%',
    height: 200,
  },
  text: {
    color: Colors.Red,
    fontWeight: 'bold',
    fontSize: 18
  },
});