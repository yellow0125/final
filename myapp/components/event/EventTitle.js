import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors';

export default function EventTitle({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf:'center'
  },
  text: {
    fontSize:25,
    color:Colors.Black
  },
});