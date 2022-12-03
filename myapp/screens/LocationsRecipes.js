import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import { firestore } from '../firebase/firebase-setup';
import { collection, onSnapshot } from 'firebase/firestore';
import { Picker } from '@react-native-picker/picker';
import { container, form } from '../constants/Style';
import { useWindowDimensions } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';

import Column from '../components/UI/Column';
import Colors from '../constants/Colors';
import RecipeList from '../components/RecipeList';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons'


export default function LocationsRecipes({ navigation }) {
    const [selectedValue, setSelectedValue] = useState("america");
    const { height, width } = useWindowDimensions();
    const headerHeight = useHeaderHeight();

    return (
        <View style={container.containerAdd}>
            <StatusBar backgroundColor={Colors.BgDarkGreen}/>
            
                <View>
                <SectionedMultiSelect IconRenderer={Icon}/>
                <Picker
                    selectedValue={selectedValue}
                    style={[container.picker, {width:width},{height:headerHeight},{marginTop: 20}]}
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
                </View>

            <View style={styles.wholeContainer}>
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
    wholeContainer: {
        flex: 1,
        height: 230,
        borderRadius: 5,
        marginTop: 230,
        marginRight: 6,
    },
});