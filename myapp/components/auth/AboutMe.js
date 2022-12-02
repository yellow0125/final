import { View, Text, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import Swiper from 'react-native-swiper';

export default function AboutMe({ navigation }) {
  return (
    <Swiper style={styles.wrapper} showsButtons={true}>
      <View style={styles.slide1}>
        <Text style={styles.text}>Hello Swiper</Text>
      </View>
      <View style={styles.slide2}>
        <Text style={styles.text}>Beautiful</Text>
      </View>
      <View style={styles.slide3}>
        <Text style={styles.text}>And simple</Text>
      </View>
    </Swiper>
  )
}


const styles = StyleSheet.create({
  wrapper: {
    
  }, 
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9bebe5'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e3b1e5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#90d985'
  },
  text: {
    color: '#ff6fa3',
    fontSize: 30,
    fontWeight: 'bold'
  }
});