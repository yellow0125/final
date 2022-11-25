import { View, Image } from 'react-native';
import React, { useState, useEffect } from "react";
import MainButton from '../components/UI/MainButton';
import { container, form } from '../constants/Style';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export default function AddPicture({ navigation, route }) {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [permissionInfo, requestPermisson] = ImagePicker.useCameraPermissions();
  const [image, setImage] = useState(null);

  const verifyPermission = async () => {
    if (permissionInfo.granted) {
      return true;
    }
    const requestPermissionResponse = await requestPermisson();
    return requestPermissionResponse.granted;
  };

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');

      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
    })();
  }, []);

  const takeImageHandler = async () => {
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        return;
      }
      const result = await camera.takePictureAsync();
      setImage(result.uri);
      route.params.imageHandler(result.uri)
    } catch (err) {
      console.log("Image taking error ", err);
    }
  };

  const pickImageHandler = async () => {
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.1,
      });
      if (!result.canceled) {
        setImage(result.assets[0].uri);
        route.params.imageHandler(result.assets[0].uri)
      }
    } catch (err) {
      console.log("Image picking error ", err);
    }

  };

  return (
    <View style={container.center}>
      {image ? (<Image source={{ uri: image }} style={{ width: '100%', height: 400 }} />) : (
        <View style={container.camera}>
          <Camera
            ref={ref => setCamera(ref)}
            style={{ height: 400, aspectRatio: 1 }}
            type={type}
            ratio={'1:1'} />
        </View>

      )}
      <View style={container.formCenter}>
        <MainButton style={form.button} mode='light' onPress={() => takeImageHandler()}>Take a Picture</MainButton>
        <MainButton style={form.button} mode='light' onPress={() => pickImageHandler()}>Pick Image From Gallery</MainButton>
        <MainButton style={form.button} mode='light' onPress={() => navigation.navigate("AddRecipe", { image})}>{image ? ('Save') : ('Cancel')}</MainButton>
      </View>
    </View>
  );
}