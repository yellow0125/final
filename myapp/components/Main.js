import React from 'react'
import { Entypo, Ionicons, FontAwesome } from '@expo/vector-icons';
import Colors from "../constants/Colors";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LocationsRecipes from "../screens/LocationsRecipes";
import AllRecipes from "../screens/AllRecipes";
import AddRecipes from "../screens/AddRecipes";
import CollectedRecipes from "../screens/CollectedRecipes";
import Profile from "../screens/Profile";
import LocateMe from './UI/LocateMe';

const Tab = createBottomTabNavigator();
export default function Main() {
    return (
      <Tab.Navigator
        screenOptions={({ navigation, route }) => {
          return {
            headerStyle: { backgroundColor: Colors.BgDarkGreen },
            headerTintColor: 'white',
            tabBarStyle: { backgroundColor: Colors.BgDarkGreen },
            tabBarInactiveTintColor: Colors.White,
            tabBarActiveTintColor: Colors.BgLighterYellow,
            headerTitleAlign: 'center',
          }
        }}
        initialRouteName="All"
      >
        <Tab.Screen name="All" component={AllRecipes}
          options={{
            tabBarIcon: ({ color, size }) => <Entypo name="list" size={size} color={color} />,
            headerTitle: "Fooriend",
          }}
        />
        <Tab.Screen name="Discover" component={LocationsRecipes}
          options={({ navigation }) => {
            return {
              tabBarIcon: ({ color, size }) => <Entypo name="location" size={size} color={color} />,
              headerTitle: "Discover",
              headerLeft: () => (
                <LocateMe navigation={navigation} />
              ),
            }
          }}
        />

        <Tab.Screen name="AddRecipe" component={AddRecipes}
          options={{
            tabBarIcon: ({ color, size }) => <Ionicons name="add-circle" size={size} color={color} />,
            headerTitle: "Share Your Recipe Here",
          }}
        />
        <Tab.Screen name="Collected" component={CollectedRecipes}
          options={{
            tabBarIcon: ({ color, size }) => <Entypo name="heart" size={size} color={color} />,
            headerTitle: "Your Favorite Recipes",
          }}
        />
        <Tab.Screen name="Profile" component={Profile}
          options={({ navigation }) => {
            return {
              tabBarIcon: ({ color, size }) => <FontAwesome name="user" size={size} color={color} />,
              headerTitle: "My Profile",
            }
          }}
        />
      </Tab.Navigator>
    )
  }
