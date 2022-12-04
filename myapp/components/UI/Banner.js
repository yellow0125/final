import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper';

export default function Banner() {
  return (
    <View style={styles.container}>
      <Swiper
        autoplay={true}
        showsPagination={false}
      >
        <Image source={require('../../assets/img/banner0.png')} style={styles.image} />
        <Image source={require('../../assets/img/banner2.png')} style={styles.image} />
        <Image source={require('../../assets/img/banner3.png')} style={styles.image} />
        <Image source={require('../../assets/img/banner4.png')} style={styles.image} />

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
});