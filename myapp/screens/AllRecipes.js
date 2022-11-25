import { StyleSheet, View } from 'react-native';
import RecipeList from '../components/RecipeList';

import Colors from '../constants/Colors';

export default function AllRecipes({ navigation }) {

    return (
        <View style={styles.container}>
            <RecipeList />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White,
        alignItems: 'center',
    },
});