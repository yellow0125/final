import { View, Text } from 'react-native'
import React from 'react'
import * as Notifications from "expo-notifications"
import MainButton from './UI/MainButton'

export default function NotificationManager() {
    const name = "Test Notification"

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
                    title: "You have a notification",
                    body: 'This is my firt local notification ${name}',
                    color: "red",
                    data: {url: "https://www.google"}
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
    <View>
        <MainButton onPress={scheduleNotificationHandler}>send a local notification</MainButton>
    </View>
  )
}