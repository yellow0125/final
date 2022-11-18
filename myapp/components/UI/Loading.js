import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import Color from '../../constants/Colors';
import React from 'react'

export default function Loading() {
  return (
    <View style={styles.container}>
			<ActivityIndicator size='large' color= {Color.White} />
		</View>
  )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 24,
		backgroundColor:Color.BgDarkGreen
	}
});