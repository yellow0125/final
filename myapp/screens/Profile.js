
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions, Image, Pressable, } from 'react-native';
import { doc, onSnapshot } from "firebase/firestore";
import MainButton from '../components/UI/MainButton';
import Loading from '../components/UI/Loading';
import { signOut } from "firebase/auth";
import { firestore, auth, storage } from '../firebase/firebase-setup';
import Row from '../components/UI/Row';
import Colors from '../constants/Colors';
import { Ionicons, FontAwesome5, Feather } from '@expo/vector-icons';
import * as Location from "expo-location";
import { useRoute } from "@react-navigation/native";
import { getUser, saveUser } from '../firebase/firestore';
import { MAPS_API_KEY } from "react-native-dotenv";
import NotificationManager from '../components/NotificationManager';
import Geocoder from 'react-native-geocoding';
Geocoder.init("AIzaSyDKkvQrpqR0iWNrXSOjsHjllFgwpnAB7aY", { language: "en" });

export default function Profile({ navigation }) {
    const [userData, setUserData] = useState([]);
    // const navigation = useNavigation();
    const route = useRoute();
    const [permissionResponse, requestPermission] = Location.useForegroundPermissions();
    const userLocation = userData.location
    const [location, setLocation] = useState(userLocation);
    const [country, setCountry] = useState(userData.country)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        const unsubscribe = onSnapshot(
            doc(firestore, "users", auth.currentUser.uid), (doc) => {
                let data = doc.data();
                data = { ...data, key: doc.id };
                setUserData(data);
                setIsLoading(false)
            }
        );
        return () => {
            unsubscribe();
            setIsLoading(false)
        };
    }, []);

    useEffect(() => {
        if (route.params) {
            setLocation({
                latitude: route.params.currentLocation.latitude,
                longitude: route.params.currentLocation.longitude,
            });

        }
    }, [route]);

    const verifyPermission = async () => {
        if (permissionResponse.granted) {
            return true;
        }
        const requestPermissionResponse = await requestPermission();
        return requestPermissionResponse.granted;
    };
    const locateUserHandler = async () => {
        setIsLoading(true)
        try {
            const hasPermission = await verifyPermission();
            if (!hasPermission) {
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
                })
                .catch(error => console.warn(error));
            setIsLoading(false)
        } catch (err) {
            console.log("locate user ", err);
        }
    };

    const locationPickerHandler = () => {
        navigation.navigate("Map", { initialLocation: location });
    };

    const saveUserLocation = async () => {
        await saveUser({ country, location });
    };

    return (
        <ScrollView>
            <View>
                <Row >
                    <View style={styles.imageContainer}>
                        <Image
                            source={require('../assets/user.jpg')}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    </View>
                    <View style={styles.userContainer}>
                        <Text style={styles.username}>{userData.username}</Text>
                        <Text style={styles.userInfo}>{auth.currentUser.email}</Text>
                        <Text style={styles.userInfo}>{userData.gender}</Text>
                        <Text style={styles.userInfo}>{userData.country}</Text>
                    </View>
                </Row>
                <View>
                    <NotificationManager />
                </View>
                <View>
                    <MainButton mode='light' onPress={locateUserHandler}>
                        <Text>Where am I?   </Text>
                        <FontAwesome5 name="location-arrow" size={22} color={Colors.White} />
                    </MainButton>
                    {isLoading && <>
                        <Text style={{ color: Colors.Red, alignSelf: 'center' }} >It will take a few seconds Processing your request</Text>
                        <Loading />
                    </>
                    }
                    {!location ? (<Image
                        source={require('../assets/locate.png')}
                        style={{ width: "80%", height: 200, alignSelf: 'center' }}

                    />) : (
                        <Image
                            source={{
                                uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${MAPS_API_KEY}`,
                            }}
                            style={{ width: "100%", height: 200 }}
                        />
                    )}
                    <Row style={styles.buttonsContainer}>
                        <MainButton style={styles.buttons} onPress={locationPickerHandler} >Pick on the Map</MainButton>
                        {country && <MainButton style={styles.buttons} onPress={saveUserLocation} >Save</MainButton>}
                    </Row>
                </View>

                <View>
                    <View style={styles.imageContainer2}>
                        <Image
                            source={require('../assets/chef.jpg')}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    </View>
                    <Row>
                        <Pressable
                            android_ripple={{ color: Colors.Grey, foreground: true }}
                            style={({ pressed }) => pressed && styles.pressed}
                            onPress={() => navigation.navigate("MyRecipes", { userData })}
                        >
                            <View style={styles.iconContainer}>
                                <Row style={styles.icon}>
                                    <Ionicons
                                        name="md-fast-food-outline"
                                        size={36}
                                        color={Colors.Black}
                                    />
                                </Row>
                                <Row><Text>My Recipes</Text></Row>
                            </View>
                        </Pressable>
                        <Pressable
                            android_ripple={{ color: Colors.Grey, foreground: true }}
                            style={({ pressed }) => pressed && styles.pressed}
                            onPress={() => navigation.navigate("Collected", { userData })}
                        >
                            <View style={styles.iconContainer}>
                                <Row style={styles.icon}>
                                    <Ionicons
                                        name="heart-circle-outline"
                                        size={36}
                                        color={Colors.Black}
                                    />
                                </Row>
                                <Row><Text>My Favorite</Text></Row>
                            </View>
                        </Pressable>
                    </Row>
                    <Row>
                        <Pressable
                            android_ripple={{ color: Colors.Grey, foreground: true }}
                            style={({ pressed }) => pressed && styles.pressed}
                            onPress={() => navigation.navigate("EditProfile", { userData })}
                        >
                            <View style={styles.iconContainer}>
                                <Row style={styles.icon}>
                                    <Ionicons
                                        name="ios-settings-outline"
                                        size={36}
                                        color={Colors.Black}
                                    />
                                </Row>
                                <Row><Text>Edit Profile</Text></Row>
                            </View>
                        </Pressable>

                        <Pressable
                            android_ripple={{ color: Colors.LightGrey, foreground: true }}
                            style={({ pressed }) => pressed && styles.pressed}
                            onPress={() => signOut(auth)}
                        >
                            <View style={styles.iconContainer}>
                                <Row style={styles.icon}>
                                    <Feather
                                        name="log-out"
                                        size={35}
                                        color={Colors.Black}
                                    />
                                </Row>
                                <Row><Text>Click to Logout</Text></Row>
                            </View>
                        </Pressable>
                    </Row>
                </View>

            </View >
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        width: Dimensions.get('window').width * 0.3,
        height: Dimensions.get('window').width * 0.3,
        borderRadius: Dimensions.get('window').width * 0.3 / 2,
        borderWidth: 2,
        borderColor: Colors.BgDarkGreen,
        overflow: "hidden",
        marginVertical: Dimensions.get('window').height / 30,
        marginHorizontal: Dimensions.get('window').width / 30,
    },
    image: {
        width: "100%",
        height: "100%"
    },
    imageContainer2: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * 0.22,
    },
    userContainer: {
        marginVertical: Dimensions.get('window').height / 21,
        marginHorizontal: Dimensions.get('window').width / 10,

    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingBottom: 5

    },
    userInfo: {
        color: Colors.Grey,
        fontSize: 14,

    },
    iconContainer: {
        marginHorizontal: Dimensions.get('window').width / 6.5,
        marginVertical: Dimensions.get('window').height / 21,
    },
    icon: {
        justifyContent: 'center',
    },
    pressed: {
        opacity: 0.75,
        borderRadius: 4,
    },
    pickerLabel: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    buttonsContainer: {
        justifyContent: 'center',
        margin: 10,
    },
    buttons: {
        marginHorizontal: 8,
        minWidth: 100,
    },
});

