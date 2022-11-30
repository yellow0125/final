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
        <View>
            <StatusBar backgroundColor={Colors.BgDarkGreen}/>
            <Picker
                selectedValue={selectedValue}
                style={[container.picker, {width:width},{height:headerHeight}]}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                itemStyle={container.pickerItem}
                mode={'dropdown'}
                dropdownIconColor={Colors.White}
            >
                <Picker.Item style={container.pickerItem} label="African" value="africa" />
                <Picker.Item style={container.pickerItem} label="American" value="america" />
                <Picker.Item style={container.pickerItem} label="Brazilian" value="brazillian" />
                <Picker.Item style={container.pickerItem} label="British" value="uk" />
                <Picker.Item style={container.pickerItem} label="Chinese" value="china" />
                <Picker.Item style={container.pickerItem} label="French" value="french" />                
                <Picker.Item style={container.pickerItem} label="Italian" value="italy" />
            </Picker>
            <View>
                <RecipeList location={selectedValue} navigation={navigation} />
            </View>
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