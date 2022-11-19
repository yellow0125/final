import { View, Image } from 'react-native';
import React, { useState, useEffect } from "react";
import MainButton from '../components/UI/MainButton';
import {container, form} from '../constants/Style';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export default function AddPicture({ navigation }) {
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
          const cameraStatus  = await Camera.requestCameraPermissionsAsync();
          setHasCameraPermission(cameraStatus.status === 'granted');
    
          const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
          setHasGalleryPermission(galleryStatus.status === 'granted');
        })();
      }, []);

      const takeImageHandler = async () => {
        if (camera) {
          const data = await camera.takePictureAsync(null);
          setImage(data.uri);
          console.log("take picture")
        }
      }

      const pickImageHandler = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
      };

  return (
    <View style={container.center}>
        <View style={container.camera}>
            <Camera
            ref={ref => setCamera(ref)}
            style={{flex:1, aspectRatio: 1}}
            type={type}
            ratio={'1:1'} />
            </View>
        <View style={container.formCenter}>
            <MainButton style={form.button}
                onPress={() => {
                setType(
                    type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
                }}>Change Camera</MainButton>
            <MainButton style={form.button} onPress={() => takeImageHandler()}>Take Picture</MainButton>
            <MainButton style={form.button} onPress={() => pickImageHandler()}>Pick Image From Gallery</MainButton>
        </View>
        {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
    </View>
  );
}