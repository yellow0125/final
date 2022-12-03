import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper';

export default function Banner() {
  return (
    <View style={styles.container}>
      <Swiper
        autoplay={true}
        paginationStyle={styles.paginationStyle}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
      >
        <Image source={require('../../assets/img/banner1.jpg')} style={styles.image} />
        <Image source={require('../../assets/img/banner1.jpg')} style={styles.image} />
        <Image source={require('../../assets/img/banner1.jpg')} style={styles.image} />
        <Image source={require('../../assets/img/banner1.jpg')} style={styles.image} />
        <Image source={require('../../assets/img/banner1.jpg')} style={styles.image} />
      </Swiper>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 2,
    height: Dimensions.get('window').height * 0.25,
    overflow: "hidden",
    marginVertical: 5,
    marginHorizontal: 4,

  },
  image: {
    width: '49%',
    height: '100%',
  },
  paginationStyle: {
    bottom: 6,
  },
  dotStyle: {
    width: 22,
    height: 3,
    backgroundColor: '#fff',
    opacity: 0.4,
    borderRadius: 0,
  },
  activeDotStyle: {
    width: 22,
    height: 3,
    backgroundColor: '#fff',
    borderRadius: 0,
  },
});