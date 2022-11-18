import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { auth } from "./firebase/firebase-setup";
import { onAuthStateChanged, signOut } from "firebase/auth";

import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import { Provider } from "react-redux";
import {applyMiddleware, legacy_createStore as createStore} from 'redux';
import rootReducer from './redux/reducers'
import thunk from "redux-thunk";
import Main from "./components/Main";
import Colors from "./constants/Colors";

const store = createStore(rootReducer, applyMiddleware(thunk))
const Stack = createNativeStackNavigator()

export default function App() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(true);

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
      <Provider store={store} >
        <Main />
       </Provider>
    );
  };



  return (
    <NavigationContainer>
      {isUserAuthenticated ? AppStack() : AuthStack()}
    </NavigationContainer>

  );
}

