import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import * as Notifications from "expo-notifications"
import Row from './UI/Row'
import Colors from '../constants/Colors'
import { TouchableHighlight } from 'react-native'
import LottieView from "lottie-react-native";

export default function NotificationManager() {
  const animation = React.useRef(null);
  const isFirstRun = React.useRef(true);
  const [pressed, setPressed] = useState(false)

  React.useEffect(() => {
    if (isFirstRun.current) {
      if (pressed) {
        animation.current.play(7, 7);
      } else {
        animation.current.play(7, 7);
      }
      isFirstRun.current = false;
    } else if (pressed) {
      animation.current.play(7, 7);
    } else {
      animation.current.play(7, 7);
    }
  }, [pressed]);

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
    setPressed(true)
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
    <TouchableHighlight
      style={styles.container}
      underlayColor={Colors.LightGrey}
      onPress={scheduleNotificationHandler}>
      <Row>
        <View style={styles.lottieContainer}>
          <LottieView
            ref={animation}
            style={styles.heartLottie}
            source={require("../assets/lottie/bell.json")}
            autoPlay={true}
            loop={true}
          />
        </View>
        <Text style={styles.text}>     Invite you! Subscribe our events</Text>
      </Row>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    justifyContent: 'center'

  },
  text: {
    fontSize: 18,
    color: Colors.Black,
    alignSelf: 'center',
  },
  heartLottie: {
    alignSelf: 'center',
    width: 180,
    height: 180,
    color: Colors.White,
  },
  lottieContainer: {
    marginLeft:-5,
    justifyContent: 'center',
    alignSelf: 'center',
    width: 56,
    height: 56,
    backgroundColor: Colors.White

  },
});