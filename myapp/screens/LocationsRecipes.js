import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import { firestore } from '../firebase/firebase-setup';
import { collection, onSnapshot } from 'firebase/firestore';
import { Picker } from '@react-native-picker/picker';
import { container, form } from '../constants/Style';
import { useWindowDimensions } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';



import Colors from '../constants/Colors';
import RecipeList from '../components/RecipeList';

export default function LocationsRecipes({ navigation }) {
    const [selectedValue, setSelectedValue] = useState("america");
    const { height, width } = useWindowDimensions();
    const headerHeight = useHeaderHeight();

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={Colors.BgDarkGreen}/>
            <Picker
                selectedValue={selectedValue}
                style={[container.picker, {width:width},{height:headerHeight}]}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                itemStyle={container.pickerItem}
            >
                <Picker.Item label="Africa" value="africa" />
                <Picker.Item label="American" value="america" />
                <Picker.Item label="Brazillian" value="brazillian" />
                <Picker.Item label="British" value="uk" />
                <Picker.Item label="China" value="china" />
                <Picker.Item label="French" value="french" />                
                <Picker.Item label="Italy" value="italy" />
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