
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions, Image, } from 'react-native';
import { collection, addDoc, doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import MainButton from '../components/UI/MainButton';
import { signOut } from "firebase/auth";
import { firestore, auth, storage } from '../firebase/firebase-setup';
import { getUser } from '../firebase/firestore';
import Row from '../components/UI/Row';
import Colors from '../constants/Colors';
import { Entypo, Ionicons, AntDesign, EvilIcons } from '@expo/vector-icons';

export default function Profile({ navigation }) {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            doc(firestore, "users", auth.currentUser.uid), (doc) => {
                let data = doc.data();
                data = { ...data, key: doc.id };
                // console.log(data);
                setUserData(data);
            }
        );
        return () => {
            unsubscribe();
        };
    }, []);


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
                        <Text style={styles.userInfo}>{userData.location}</Text>
                    </View>
                </Row>
                <View style={styles.imageContainer2}>
                    <Image
                        source={require('../assets/chef.jpg')}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </View>
                <View>
                    <Row>
                        <View style={styles.iconContainer}>
                            <Row style={styles.icon}>
                                <Ionicons name="location-outline" size={36} color="black" />
                            </Row>
                            <Row><Text>Locate Me</Text></Row>
                        </View>

                        <View style={styles.iconContainer}>
                            <Row style={styles.icon}>
                                <Ionicons
                                    name="ios-settings-outline"
                                    size={36}
                                    color="black"
                                    onPress={() => navigation.navigate("EditProfile", { userData })} />
                            </Row>
                            <Row><Text>Edit Profile</Text></Row>
                        </View>
                    </Row>

                    <Row>
                        <View style={styles.iconContainer}>
                            <Row style={styles.icon}>
                                <Ionicons name="md-fast-food-outline" size={36} color="black" />
                            </Row>
                            <Row><Text>My Recipes</Text></Row>
                        </View>
                        <View style={styles.iconContainer}>
                            <Row style={styles.icon}>
                                <AntDesign name="like2" size={36} color="black" />
                            </Row>
                            <Row><Text>My Favorite</Text></Row>
                        </View>
                    </Row>
                    <MainButton mode='negative' onPress={() => signOut(auth)} >Sign Out</MainButton>
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
        width: Dimensions.get('window').width ,
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

