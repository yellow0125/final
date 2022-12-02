
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions, Image, } from 'react-native';
import { doc, onSnapshot } from "firebase/firestore";
import MainButton from '../components/UI/MainButton';
import Loading from '../components/UI/Loading';
import { signOut } from "firebase/auth";
import { firestore, auth, storage } from '../firebase/firebase-setup';
import Row from '../components/UI/Row';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import * as Location from "expo-location";
import { useRoute } from "@react-navigation/native";
import { getUser, saveUser } from '../firebase/firestore';
import Geocoder from 'react-native-geocoding';
Geocoder.init("AIzaSyDKkvQrpqR0iWNrXSOjsHjllFgwpnAB7aY", { language: "en" });

export default function Profile({ navigation }) {
    const [userData, setUserData] = useState([]);
    // const navigation = useNavigation();
    const route = useRoute();
    const [permissionResponse, requestPermission] = Location.useForegroundPermissions();
    const [location, setLocation] = useState(userData.location);
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
            console.log(route.params);
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
                <View style={styles.imageContainer2}>
                    <Image
                        source={require('../assets/chef.jpg')}
                        style={styles.image}
                        resizeMode="cover"
                    />
                    {isLoading && <>
                        <Text style={{ color: Colors.Red, alignSelf: 'center' }} >It will take a few seconds Processing your request</Text>
                        <Loading />

                    </>}

                </View>
                <View>
                    <Row>
                        <View style={styles.iconContainer}>
                            <Row style={styles.icon}>
                                <Ionicons
                                    name="location-outline"
                                    size={36}
                                    color={Colors.Black}
                                    onPress={locateUserHandler} />
                            </Row>
                            <Row><Text>Locate Me</Text></Row>
                        </View>
                        <View style={styles.iconContainer}>
                            <Row style={styles.icon}>
                                <Ionicons
                                    name="ios-settings-outline"
                                    size={36}
                                    color={Colors.Black}
                                    onPress={() => navigation.navigate("EditProfile", { userData })} />
                            </Row>
                            <Row><Text>   Edit Profile</Text></Row>
                        </View>
                    </Row>

                    <Row>
                        <View style={styles.iconContainer}>
                            <Row style={styles.icon}>
                                <Ionicons
                                    name="md-fast-food-outline"
                                    size={36}
                                    color={Colors.Black}
                                    onPress={() => navigation.navigate("MyRecipes", { userData })} />
                            </Row>
                            <Row><Text>My Recipes</Text></Row>
                        </View>
                        <View style={styles.iconContainer}>
                            <Row style={styles.icon}>
                                <Ionicons
                                    name="heart-circle-outline"
                                    size={36}
                                    color={Colors.Black}
                                    onPress={() => navigation.navigate("Collected", { userData })}
                                />
                            </Row>
                            <Row><Text>My Favorite</Text></Row>
                        </View>
                    </Row>
                    <MainButton mode='negative' onPress={() => signOut(auth)} >Sign Out</MainButton>
                    {country && <MainButton onPress={saveUserLocation}>Save My Location</MainButton>}
                </View>
            </View>
        </ScrollView>
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
        justifyContent: 'center',

    },
    icon: {
        justifyContent: 'center',
    }
});

