import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { auth } from "./firebase/firebase-setup";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Entypo, Ionicons, FontAwesome } from '@expo/vector-icons';

import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import MainButton from './components/UI/MainButton';
import Colors from "./constants/Colors";

import LocationsRecipes from "./screens/LocationsRecipes";
import AllRecipes from "./screens/AllRecipes";
import AddRecipes from "./screens/AddRecipes";
import CollectedRecipes from "./screens/CollectedRecipes";
import Profile from "./screens/Profile";


const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator();

export default function App() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(true);

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setIsUserAuthenticated(true);
  //     } else {
  //       setIsUserAuthenticated(false);
  //     }
  //   });
  // });

  const AuthStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: Colors.BgDarkGreen },
          headerTintColor: Colors.White,
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen name="Login" component={Login} />

        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    );
  };

  const AppStack = () => {
    return (
      <Tab.Navigator
        screenOptions={({ navigation, route }) => {
          return {
            headerStyle: { backgroundColor: Colors.BgDarkGreen },
            headerTintColor: 'white',
            tabBarStyle: { backgroundColor: Colors.BgDarkGreen },
            tabBarActiveTintColor: 'white',
            headerTitleAlign: 'center',
            headerRight: () => {
              return <MainButton onPress={() => navigation.navigate('Profile')} >Username</MainButton>
            }
          }
        }}
      >
        <Tab.Screen name="Locations" component={LocationsRecipes}
          options={{
            tabBarIcon: ({ color, size }) => <Entypo name="location" size={size} color={color} />,
            headerTitle: "Locations",
          }}
        />
        <Tab.Screen name="All" component={AllRecipes}
          options={{
            tabBarIcon: ({ color, size }) => <Entypo name="list" size={size} color={color} />,
            headerTitle: "All",
          }}
        />
        <Tab.Screen name="Add" component={AddRecipes}
          options={{
            tabBarIcon: ({ color, size }) => <Ionicons name="add-circle" size={size} color={color} />,
            // headerTitle: "Important Expenses",
          }}
        />
        <Tab.Screen name="Collected" component={CollectedRecipes}
          options={{
            tabBarIcon: ({ color, size }) => <Entypo name="heart" size={size} color={color} />,
            headerTitle: "Collected",
          }}
        />
        <Tab.Screen name="Profile" component={Profile}
          options={{
            tabBarIcon: ({ color, size }) => <FontAwesome name="user" size={size} color={color} />,
            headerTitle: "Me",
          }}
        />
      </Tab.Navigator>
    );
  };



  return (
    <NavigationContainer>
      {isUserAuthenticated ? AppStack() : AuthStack()}
    </NavigationContainer>

  );
}

