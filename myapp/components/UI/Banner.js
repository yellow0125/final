import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import React from 'react'

export default function Banner() {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/img/banner1.jpg')} style={styles.image} />
      <Text>Banner</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 2,
    height: Dimensions.get('window').height * 0.3,
    overflow: "hidden",
    marginVertical: 5,
    marginHorizontal: 4,

  },
  image: {
    width: '49%',
    height: '100%',
  },
});