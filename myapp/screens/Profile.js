import React from "react";
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions, Image,} from 'react-native';
import { doc, onSnapshot } from "firebase/firestore";
import MainButton from '../components/UI/MainButton';
import Loading from '../components/UI/Loading';
import { signOut } from "firebase/auth";
import { firestore, auth } from '../firebase/firebase-setup';
import Row from '../components/UI/Row';
import Colors from '../constants/Colors';
import { Ionicons, FontAwesome5, Feather } from '@expo/vector-icons';
import * as Location from "expo-location";
import { useRoute } from "@react-navigation/native";
import { saveUser } from '../firebase/firestore';
import { MAPS_API_KEY } from "react-native-dotenv";
import NotificationManager from '../components/NotificationManager';
import Geocoder from 'react-native-geocoding';
import { TouchableHighlight } from 'react-native';
import LottieView from "lottie-react-native";
Geocoder.init("AIzaSyDKkvQrpqR0iWNrXSOjsHjllFgwpnAB7aY", { language: "en" });

export default function Profile({ navigation }) {
    const [userData, setUserData] = useState([]);
    const route = useRoute();
    const [permissionResponse, requestPermission] = Location.useForegroundPermissions();
    const userLocation = userData.location
    const [location, setLocation] = useState(userLocation);
    const [country, setCountry] = useState(userData.country)
    const [isLoading, setIsLoading] = useState(false);
    const animation = React.useRef(null);
    const isFirstRun = React.useRef(true);
    const [pressed, setPressed] = useState(false)

    React.useEffect(() => {
        if (isFirstRun.current) {
            if (pressed) {
                animation.current.play(86, 86);
            } else {
                animation.current.play(86, 86);
            }
            isFirstRun.current = false;
        } else if (pressed) {
            animation.current.play(86, 86);
        } else {
            animation.current.play(86, 86);
        }
    }, [pressed]);
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
            Geocoder.from(route.params.currentLocation.latitude, route.params.currentLocation.longitude)
                .then(async json => {
                    var addressComponent = json.results[0].address_components.slice(-3)[0];
                    setCountry(addressComponent.long_name)
                })
                .catch(error => console.warn(error));
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
                <TouchableHighlight
                    style={[styles.part, styles.lottieC]}
                    underlayColor={Colors.LightGrey}
                    onPress={() => navigation.navigate("MyRecipes", { userData })}>
                    <Row>
                        <View style={styles.lottieContainer}>
                            <LottieView
                                ref={animation}
                                style={styles.heartLottie}
                                source={require("../assets/lottie/recipe.json")}
                                autoPlay={false}
                                loop={false}
                            />
                        </View>
                        <Text style={styles.text}>     All My Recipes</Text>
                    </Row>
                </TouchableHighlight>
                <View style={styles.part}>
                    <NotificationManager />
                </View>
                <TouchableHighlight
                    style={[styles.part, styles.lottieC]}
                    underlayColor={Colors.LightGrey}
                    onPress={locateUserHandler}>
                    <Row>
                        <View style={styles.lottieContainer}>
                            <LottieView
                                style={styles.heartLottie}
                                source={require("../assets/lottie/locate.json")}
                                autoPlay={true}
                                loop={true}
                            />
                        </View>
                        <Text style={styles.text}>    Locate Me</Text>
                    </Row>
                </TouchableHighlight>
                {location &&
                    <Image
                        source={{
                            uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${MAPS_API_KEY}`,
                        }}
                        style={{ width: "100%", height: 200 }}
                    />
                }
                <Row style={styles.buttonsContainer}>
                    {country && <MainButton style={styles.buttons} onPress={saveUserLocation} >Save</MainButton>}
                </Row>
                <Row style={[styles.iconContainer, styles.part]}>
                    <TouchableHighlight
                        underlayColor={Colors.LightGrey}
                        onPress={locationPickerHandler}
                    >
                        <View>
                            <Row style={styles.icon}>
                                <FontAwesome5 name="map" size={30} color="black" />
                            </Row>
                            <Row><Text>Open Map</Text></Row>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={Colors.LightGrey}
                        onPress={() => navigation.navigate("EditProfile", { userData })}
                    >
                        <View>
                            <Row style={styles.icon}>
                                <Ionicons
                                    name="ios-settings-outline"
                                    size={30}
                                    color={Colors.Black}
                                />
                            </Row>
                            <Row><Text>Edit Profile</Text></Row>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={Colors.LightGrey}
                        onPress={() => signOut(auth)}
                    >
                        <View>
                            <Row style={styles.icon}>
                                <Feather
                                    name="log-out"
                                    size={30}
                                    color={Colors.Black}
                                />
                            </Row>
                            <Row><Text>Click to Logout</Text></Row>
                        </View>
                    </TouchableHighlight>
                </Row>

                <View>
                    {isLoading && <>
                        <Text style={{ color: Colors.Red, alignSelf: 'center' }} >It will take a few seconds Processing your request</Text>
                        <Loading />
                    </>
                    }
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
        justifyContent: 'space-between',
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
    part: {
        marginVertical: 10,
        marginHorizontal: 5,
        paddingVertical: 10,
        paddingHorizontal: 5,
        backgroundColor: Colors.White,
        borderRadius: 5,
        elevation: 8,
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5
    },
    heartLottie: {
        alignSelf: 'center',
        width: 70,
        height: 70,
        color: Colors.White,
    },
    heartLottieS: {
        alignSelf: 'center',
        width: 30,
        height: 30,
        color: Colors.White,
    },
    lottieContainer: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: 56,
        height: 56,
        backgroundColor: Colors.White

    },
    lottieC: {
        flex: 1,
        borderRadius: 5,
        paddingHorizontal: 20,
        justifyContent: 'center'

    },
    text: {
        fontSize: 18,
        color: Colors.Black,
        alignSelf: 'center',
    },
});

