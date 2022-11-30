import { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { firestore } from '../firebase/firebase-setup';
import { collection, onSnapshot } from 'firebase/firestore';
import { Picker } from '@react-native-picker/picker';

import Colors from '../constants/Colors';
import RecipeList from '../components/RecipeList';

export default function LocationsRecipes({ navigation }) {
    const [selectedValue, setSelectedValue] = useState("China");

    return (
        <View style={styles.container}>
            <Picker
                selectedValue={selectedValue}
                style={{height: 50, width: 200}}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
                <Picker.Item label="United States" value="america" />
                <Picker.Item label="United Kingdom" value="uk" />
                <Text>selectedValue</Text>
            </Picker>
            <RecipeList location={selectedValue} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.lightpurple,
        alignItems: 'center',
    },
});