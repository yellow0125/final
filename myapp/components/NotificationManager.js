import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import * as Notifications from "expo-notifications"
import { AntDesign } from '@expo/vector-icons'
import Row from './UI/Row'
import Colors from '../constants/Colors'
export default function NotificationManager() {

  const verifyPermission = async () => {
    const permissionStatus = await Notifications.getPermissionsAsync();
    if (permissionStatus.granted) {
      return true;
    }
    const requestedPermission = await Notifications.requestPermissionsAsync({
      ios: {
        allowBadge: true,
      },
    });
    return requestedPermission.granted;
  };


  const scheduleNotificationHandler = async () => {
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        return;
      }
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "All I Want Christmas is You",
          body: 'Join our christmas event! Share your christmas recipes right now!',
          color: Colors.Red,
          data: { url: "https://www.google.com" }
        },
        trigger: {
          seconds: 5
        },
      });
    }
    catch (error) {
      console.log("error in NotificationManager with erro type: ", error)
    }
  }

  return (
    <Pressable
      style={styles.container}
      android_ripple={{ color: Colors.BgLightGreen, foreground: true }}
      onPress={scheduleNotificationHandler}>
      <Row>
        <AntDesign name="calendar" size={24} color={Colors.White} />
        <Text style={styles.text}> Invite you! Subscribe our events</Text>
      </Row>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf:'center',
    borderRadius:5,
    paddingHorizontal:52,
    paddingVertical:10,
    backgroundColor:Colors.Orange
  },
  text: {
    fontSize:16,
    color:Colors.White,
    fontWeight:'bold'
  },
});