import { useState } from 'react';
import {  View } from 'react-native';
import { container, form } from '../constants/Style';
import Colors from '../constants/Colors';
import RecipeList from '../components/RecipeList';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons'

export default function LocationsRecipes({ navigation }) {    
    const [selectedValue, setSelectedValue] = useState();

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

const items = [
    {
      name: 'Countries',
      id: 1,
      children: [
        {
          name: 'African',
          id: 'African',
        },
        {
          name: 'United States',
          id: 'United States',
        },
        {
          name: 'Brazilian',
          id: 'Brazilian',
        },
        {
          name: 'British',
          id: 'British',
        },
        {
          name: 'Chinese',
          id: 'Chinese',
        },
        {
          name: 'French',
          id: 'French',
        },
        {
          name: 'German',
          id: 'German'
        },
        {
          name: 'Indian',
          id: 'Indian'
        },
        {
          name: 'Italian',
          id: 'Italian'
        },
        {
          name: 'Japanese',
          id: 'Japanese'
        },
        {
          name: 'Korean',
          id: 'Korean'
        },
        {
          name: 'Seafood',
          id: 'Seafood'
        },
        {
          name: 'Other',
          id: 'Other'
        },
      ],
    },
    {
      name: 'Difficulty',
      id: 2,
      children: [
        {
          name: 'Under 15 minutes',
          id: 'Under 15 minutes',
        },
        {
          name: 'Under 30 minutes',
          id: 'Under 30 minutes',
        },
        {
          name: 'Under 45 minutes',
          id: 'Under 45 minutes',
        },
        {
          name: 'Under 1 hour',
          id: 'Under 1 hour',
        },
        {
          name: 'More than 1 hour',
          id: 'More than 1 hour',
        },
      ],
    },

  
  ];
  