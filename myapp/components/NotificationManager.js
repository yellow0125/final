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
                    body: 'click here to see more vedios',
                    color: "red",
                    data: {url: "https://www.google.com"}
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
        <MainButton onPress={scheduleNotificationHandler}>Invite you to watch vedios</MainButton>
    </View>
  )
}