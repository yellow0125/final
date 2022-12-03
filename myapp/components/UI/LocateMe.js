import { View, Text } from 'react-native'
import React from 'react'
import * as Location from "expo-location";
import { Entypo, Ionicons, FontAwesome5,FontAwesome } from '@expo/vector-icons';
import MainButton from './MainButton';
import Geocoder from 'react-native-geocoding';
Geocoder.init("AIzaSyDKkvQrpqR0iWNrXSOjsHjllFgwpnAB7aY", { language: "en" });
import { useRoute } from "@react-navigation/native";
import { useState } from 'react';
import Colors from '../../constants/Colors';

export default function LocateMe() {
    const [userData, setUserData] = useState([]);

    const route = useRoute();
    const [permissionResponse, requestPermission] = Location.useForegroundPermissions();
    const userLocation = userData.location
    const [location, setLocation] = useState(userLocation);
    const [country, setCountry] = useState(userData.country)
    const [isLoading, setIsLoading] = useState(false);

    const verifyPermission = async () => {
        if (permissionResponse.granted) {
            return true;
        }
        const requestPermissionResponse = await requestPermission();
        return requestPermissionResponse.granted;
    };

    const locateUserHandler = async () => {
        setIsLoading(true)
        console.log("go into locateUserHandler")
        try {
            const hasPermission = await verifyPermission();
            if (!hasPermission) {
                console.log("no premission allowed")
                return;
            }
            const currentPosition = await Location.getCurrentPositionAsync();

            setLocation({
                latitude: currentPosition.coords.latitude,
                longitude: currentPosition.coords.longitude,
            });

            Geocoder.from(currentPosition.coords.latitude, currentPosition.coords.longitude)
                .then(async json => {
                    // console.log(json.results[0].address_components.slice(-2)[0])
                    var addressComponent = json.results[0].address_components.slice(-2)[0];
                    setCountry(addressComponent.long_name)
                    console.log("get address", addressComponent.long_name)
                })
                .catch(error => console.warn(error));
            setIsLoading(false)
        } catch (err) {
            console.log("locate user ", err);
        }
    };
  return (
        <MainButton mode='light' onPress={locateUserHandler}>
            <FontAwesome5 name="location-arrow" size={20} color={Colors.White} />
            <Text style={{fontSize:10}}>nearby</Text>
        </MainButton>
  )
}