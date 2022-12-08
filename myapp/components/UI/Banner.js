import { View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper';

export default function Banner({ navigation }) {
  return (
    <View style={styles.container}>
      <Swiper
        autoplay={true}
        showsPagination={false}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Welcome")}>
          <Image source={require('../../assets/img/banner0.png')} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Christmas")}>
          <Image
            source={require('../../assets/img/banner2.png')}
            style={styles.image} />
        </TouchableOpacity>
        <Image source={require('../../assets/img/banner3.png')} style={styles.image} />
        <Image source={require('../../assets/img/banner4.png')} style={styles.image} />
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 2,
    height: Dimensions.get('window').height * 0.42,
    overflow: "hidden",
    marginVertical: 5,
    marginHorizontal: 4,

  },
  image: {
    width: '49%',
    height: '100%',
  },
});