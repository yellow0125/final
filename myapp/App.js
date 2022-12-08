import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { auth } from "./firebase/firebase-setup";
import { onAuthStateChanged } from "firebase/auth";
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import Main from "./components/Main";
import AddPicture from "./screens/AddPicture";
import EditProfile from "./screens/EditProfile";
import NearBy from "./screens/NearBy";
import { Linking } from "react-native";
import MyRecipes from "./screens/MyRecipes";
import RecipeDetails from "./screens/RecipeDetails";
import Colors from "./constants/Colors";
import Map from "./screens/Map";
import AboutMe from "./components/auth/AboutMe";
import * as Notifications from 'expo-notifications'
import { storeData, getItemFor } from "./helpers/storageHelper"
import Christmas from "./components/event/Christmas";
import Welcome from "./components/event/Welcome";
const Stack = createNativeStackNavigator()

const HAS_LAUNCHED = 'HAS_LAUNCHED';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: true,
    };
  },
});

export default function App() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(true);
  const [hasLaunched, setHasLaunched] = useState(false)

  useEffect(() => {
    const getData = async () => {
      const hasLaunched = await getItemFor(HAS_LAUNCHED);
      if (hasLaunched) {
        setHasLaunched(true)
      }
      else {
        await storeData(HAS_LAUNCHED, "true");
      }
    };
    getData().catch((err) => { console.log(err) })
  }, [])

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserAuthenticated(true);
      } else {
        setIsUserAuthenticated(false);
      }
    });
  });

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notificaftion) => {
        console.log("notification received ", notificaftion);
      }
    );
    const subscription2 = Notifications.addNotificationResponseReceivedListener(
      async (notificationResponse) => {
        console.log(
          "notification interacted ",
          notificationResponse.notification.request.content.data
        );
        if (notificationResponse.notification.request.content.data.url) {
          try {
            await Linking.openURL(
              notificationResponse.notification.request.content.data.url
            );
          } catch (err) {
            console.log(err);
          }
        }
      }
    );
    return () => {
      subscription.remove();
      subscription2.remove();
    };
  });

  const AuthStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: Colors.BgDarkGreen },
          headerTintColor: Colors.White,
          headerTitleAlign: "center",
        }}
      >
        {!hasLaunched && <Stack.Screen name="AboutMe" component={AboutMe} options={{ headerShown: false }} />}

        <Stack.Screen name="Login" component={Login} options={{ headerTitle: "Log in your account" }} />
        <Stack.Screen name="Register" component={Register} options={{ headerTitle: "Create a new account" }} />
      </Stack.Navigator>
    );
  };

  const AppStack = () => {
    return (
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.BgDarkGreen },
            headerTintColor: Colors.White,
            headerTitleAlign: "center",
          }} initialRouteName="Main">
          <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
          <Stack.Screen name="Camera" component={AddPicture} />
          <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerTitle: "Settings" }} />
          <Stack.Screen name="MyRecipes" component={MyRecipes} options={{ headerTitle: "My Recipes" }} />
          <Stack.Screen name="RecipeDetails" component={RecipeDetails} options={{ headerTitle: "Recipe Details" }} />
          <Stack.Screen name="Map" component={Map} options={{ headerTitle: "Pick up your location" }} />
          <Stack.Screen name="NearBy" component={NearBy} options={{ headerTitle: "NearBy" }} />
          <Stack.Screen name="Christmas" component={Christmas} options={{ headerTitle: "Christmas Event" }} />
          <Stack.Screen name="Welcome" component={Welcome} options={{ headerTitle: "About Me" }} />
        </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      {isUserAuthenticated ? AppStack() : AuthStack()}
    </NavigationContainer>
  );
}

