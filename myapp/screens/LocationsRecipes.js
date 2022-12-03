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
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons'


export default function LocationsRecipes({ navigation }) {    
    const [selectedValue, setSelectedValue] = useState(['United States','Chinese']);

    function onSelectedItemsChange(value) {
        setSelectedValue(value)
    };

    return (
        <View style={container.container}>
            <SectionedMultiSelect
                items={items}
                IconRenderer={Icon}
                uniqueKey="id"
                subKey="children"
                selectText="Please select here"
                showDropDowns={true}
                readOnlyHeadings={true}
                onSelectedItemsChange={onSelectedItemsChange}
                selectedItems={selectedValue}
                styles={{selectToggle: form.selectToggle, chipContainer: {borderColor:Colors.BgDarkGreen}}}
                colors={{primary: Colors.BgDarkGreen, success: Colors.BgDarkGreen}}
            />
                <RecipeList location={selectedValue} navigation={navigation} />
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
          name: 'United States',
          id: 'United States',
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
  