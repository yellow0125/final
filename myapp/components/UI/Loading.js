import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import Row from './Row';
import Colors from '../../constants/Colors';

export default function Loading() {
	return (
		<View style={styles.container}>
			<Row>
				<ActivityIndicator size='large' color={Colors.Red} />
			</Row>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 12,
	}
});