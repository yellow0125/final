import { View, Text } from 'react-native'
import React from 'react'
import * as Notification from "expo-notifications"
import MainButton from './UI/MainButton'

export default function NotificationManager() {
    const name = "Test Notification"
    const scheduleNotificationHandler = async () => {
        try {
            await Notification.scheduleNotificationAsync({
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