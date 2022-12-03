import { StyleSheet, Text, View, TextInput } from 'react-native'
import Colors from '../../constants/Colors';

export default function MultipleInput({ label, value, f_onChange, mode, numberOfLines }) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[styles.input, (mode === 'long') ? styles.inputL : null]}
                onChangeText={f_onChange}
                value={value} 
                multiline={true}
                numberOfLines={numberOfLines}
                />
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
        color: Colors.Black,
        marginBottom: 4,
        textAlign: "left",
        fontWeight:'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.Black,
        borderRadius: 4,
        backgroundColor: Colors.inputpurple,
        padding: 6,
        fontSize: 18,
        color: Colors.lightpurple,
    },
    inputL: {
        minHeight: 150,
        textAlignVertical: 'top'
    },
});