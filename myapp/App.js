import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { auth } from "./firebase/firebase-setup";
import { onAuthStateChanged } from "firebase/auth";
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import { Provider } from "react-redux";
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import rootReducer from './redux/reducers'
import thunk from "redux-thunk";
import Main from "./components/Main";
import AddPicture from "./screens/AddPicture";
import EditProfile from "./screens/EditProfile";

import MyRecipes from "./screens/MyRecipes";
import RecipeDetails from "./screens/RecipeDetails";
import Colors from "./constants/Colors";
import Map from "./screens/Map";

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
      <Provider store={store}>
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


        </Stack.Navigator>
      </Provider>
    );
  };

  return (
    <NavigationContainer>
      {isUserAuthenticated ? AppStack() : AuthStack()}
    </NavigationContainer>
  );
}

