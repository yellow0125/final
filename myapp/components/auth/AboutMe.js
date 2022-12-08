import { View, StyleSheet, Image } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper';
import { Button } from 'react-native-paper';
import Colors from '../../constants/Colors';
export default function AboutMe({ navigation }) {
  return (
    <>
      <Swiper showsButtons={true} autoplay={true}>
        <View style={styles.slide}>
          <Image source={require('../../assets/img/hello1.png')} style={styles.image} />
        </View>
        <View style={styles.slide}>
          <Image source={require('../../assets/img/hello2.png')} style={styles.image} />
        </View>
        <View style={styles.slide}>
          <Image source={require('../../assets/img/hello3.png')} style={styles.image} />
        </View>
        <View style={styles.slide}>
          <Image source={require('../../assets/img/hello4.png')} style={styles.image} />
        </View>
      </Swiper>
      <View style={styles.button}>
        <Button onPress={() => navigation.replace("Register")}>Create your account</Button>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  button: {
    marginBottom: 5,
    justifyContent: 'center',
    alignContent: 'center'
  },
});