import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper';
import Colors from '../../constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Row from '../UI/Row';
import { FontAwesome5 } from '@expo/vector-icons';
export default function Welcome() {
  return (
    <>
      <View style={styles.container}>
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
      </View>
      <View style={styles.textcontainer}>
        <Row>
          <FontAwesome5 name="raspberry-pi" size={24} color={Colors.Black} /><Text> @Cuiting Huang </Text>
        </Row>
        <Row>
          <MaterialCommunityIcons name="face-woman-shimmer" size={24} color={Colors.Black} /><Text> @Xiaolan Wu </Text>
        </Row>
        <Row>
          <MaterialCommunityIcons name="pig-variant-outline" size={24} color={Colors.Black} /><Text> @Yichao Wu </Text>
        </Row>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 2,
    height: Dimensions.get('window').height * 0.73,
    overflow: "hidden",
  },
  slide: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  image: {
    width: '49%',
    height: '99%',

  },
  button: {
    marginBottom: 5,
    justifyContent: 'center',
    alignContent: 'center'
  },
  textcontainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 5,
    marginHorizontal: 4,
  },
});