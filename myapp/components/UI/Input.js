import { StyleSheet, Text, View, TextInput } from 'react-native'

import Colors from '../../constants/Colors';

export default function CustomInput({ label, value, f_onChange }) {


    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={styles.input} value={value} onChangeText={f_onChange} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginVertical: 10,
    },
    label: {
        fontSize: 14,
        color: "black",
        marginBottom: 4,
        textAlign: "left",
        // alignItems:"left",
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 4,
        backgroundColor: Colors.inputpurple,
        padding: 6,
        fontSize: 18,
        color: Colors.lightpurple,
    },
});