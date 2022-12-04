import { useState } from 'react';
import { StyleSheet, View, } from 'react-native';
import { container, form } from '../constants/Style';
import Colors from '../constants/Colors';
import RecipeList from '../components/RecipeList';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons'

export default function LocationsRecipes({ navigation }) {    
    const [selectedValue, setSelectedValue] = useState(['Chinese']);

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
      id: 1,
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
  