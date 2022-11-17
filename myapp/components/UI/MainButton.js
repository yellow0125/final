import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Color from '../../constants/Colors';

export default function MainButton({ children, onPress, mode, style }) {
  return (
    <View style={style}>
      <Pressable
        android_ripple={{ color: Color.Grey, foreground: true }}
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
        >
        <View style={[styles.button, (mode === 'negative') ? styles.flat : null]}>
          <Text style={[styles.buttonText, (mode === 'negative') ? styles.flatText : null]}>{children}</Text>
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: Color.BgLighterYellow,
    minWidth: 80,
  },
  flat: {
    backgroundColor: Color.transparent
  },
  buttonText: {
    color: Color.TextGreen,
    textAlign: 'center',
    fontWeight:'bold',
    fontSize:16,
  },
  flatText: {
    color: Color.White,
  },
  pressed: {
    opacity: 0.75,
    borderRadius: 4,
  }

});