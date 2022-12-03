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
    const [selectedValue, setSelectedValue] = useState([]);
    const { height, width } = useWindowDimensions();
    const headerHeight = useHeaderHeight();

    function onSelectedItemsChange(value) {
        setSelectedValue(value)
        console.log("get value in LocationRecipes.js", value)
    };

    return (
        <View style={container.container}>
                <SectionedMultiSelect
                items={items}
                IconRenderer={Icon}
                uniqueKey="id"
                subKey="children"
                selectText="Please select country here"
                showDropDowns={true}
                readOnlyHeadings={true}
                onSelectedItemsChange={onSelectedItemsChange}
                selectedItems={selectedValue}
                styles={{height: headerHeight}}
                backgroundColor={Colors.BgDarkGreen}
            />

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

const items = [
    {
      name: 'Countries',
      id: 0,
      children: [
        {
          name: 'African',
          id: 'africa',
        },
        {
          name: 'American',
          id: 'america',
        },
        {
          name: 'Brazilian',
          id: 'brazillian',
        },
        {
          name: 'British',
          id: 'uk',
        },
        {
          name: 'Chinese',
          id: 'china',
        },
        {
          name: 'French',
          id: 'french',
        },
        {
          name: 'Italian',
          id: 'italy'
        }
      ],
    },

  
  ];
  