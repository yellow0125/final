import { View } from 'react-native'
import React from 'react'
import { container } from '../../constants/Style'
import { Image } from 'react-native'

export default function NoRecipePage(props) {
  return (
    <>
        <View style={container.imageContainer}>
            <Image
                source={require('../../assets/img/collect.jpg')}
                style={container.NoRecipeImage}
                resizeMode="cover"
            />
        </View>
        {props.children}
    </>
  )
}