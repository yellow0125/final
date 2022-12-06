import { View, Text } from 'react-native'
import React from 'react'
import * as Location from "expo-location";
import { FontAwesome5 } from '@expo/vector-icons';
import MainButton from './MainButton';
import Geocoder from 'react-native-geocoding';
Geocoder.init("AIzaSyDKkvQrpqR0iWNrXSOjsHjllFgwpnAB7aY", { language: "en" });
import { useState } from 'react';
import Colors from '../../constants/Colors';

export default function LocateMe({ navigation }) {
    const [userData, setUserData] = useState([]);

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

    const getCountryFromGeocoderAndNavigate = async (currentPosition) => {
        Geocoder.from(currentPosition.coords.latitude, currentPosition.coords.longitude)
            .then(async json => {
                var addressComponent = json.results[0].address_components.slice(-2)[0];
                const countryFromGeocoder = addressComponent.long_name
                setCountry(countryFromGeocoder)
                setIsLoading(false)
                navigation.navigate('NearBy', { p: countryFromGeocoder })
            })
            .catch(error => console.warn(error));
    };

    const locateUserHandler = async () => {
        setIsLoading(true)
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
            getCountryFromGeocoderAndNavigate(currentPosition)
        } catch (err) {
            console.log("locate user ", err);
        }

    };
    return (
        (isLoading) ? (
            <View style={{ margin: 10 }}>
                <Text style={{ fontSize: 16, color: Colors.White }}>Loading</Text>
            </View>
        ) : (
            <MainButton mode='light' onPress={locateUserHandler}>
                <FontAwesome5 name="location-arrow" size={20} color={Colors.White} />
                <Text style={{ fontSize: 10 }}>nearby</Text>
            </MainButton>
        )
    )
}