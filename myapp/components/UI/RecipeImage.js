import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { form } from '../../constants/Style';
import { firestore, storage } from '../../firebase/firebase-setup';
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { getDownloadURL, ref } from "firebase/storage";

export default function RecipeImage(props) {
    const [imageUri, setImageUri] = useState('');
    const uri = props.source.uri

    useEffect(() => {
        const getImageURL = async () => {
          try {
            if (props) {
              const reference = ref(storage, uri);
              const downloadImageURL = await getDownloadURL(reference);
              setImageUri(downloadImageURL);
            //   console.log("download successfully for image: ", imageUri)
            }
          } catch (err) {
            console.log("download image ", err);
          }
        };
        getImageURL();
      }, []);
  
    return (

          <View style={{ marginHorizontal: 8 }}>
            <Image source={{ uri: imageUri ? imageUri : null }} style={form.imageInPost} />
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