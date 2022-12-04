import { View, Text, Image, StyleSheet, Dimensions, ScrollView } from 'react-native'
import React from 'react'
import EventTitle from './EventTitle';
import MainButton from '../UI/MainButton';

export default function Christmas({navigation}) {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={require('../../assets/img/event1.jpg')}
          style={styles.image} />
      </View>
      <View>
        <EventTitle>All I want Christmas is you</EventTitle>
      </View>
      <View>
        <Text>Join our christmas event! Share your christmas recipes right now!</Text>
        <MainButton onPress={() => navigation.navigate("AddRecipe")}>Create a New Recipe</MainButton>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 2,
    height: Dimensions.get('window').height * 0.5,
    overflow: "hidden",
    marginVertical: 5,
    marginHorizontal: 4,

  },
  image: {
    width: '49%',
    height: '100%',
  },
});