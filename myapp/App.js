import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { auth } from "./firebase/firebase-setup";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import Color from "./constants/Color";




const Stack = createNativeStackNavigator()
export default function App() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserAuthenticated(true);
      } else {
        setIsUserAuthenticated(false);
      }
    });
  });

  const AuthStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: Color.BgDarkGreen },
          headerTintColor: Color.White,
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
      <Stack.Navigator>
        empty
      </Stack.Navigator>
    );
  };



  return (
    <NavigationContainer>
      {isUserAuthenticated ? AppStack() : AuthStack()}
    </NavigationContainer>

  );
}

