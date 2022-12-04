import React from 'react'
import Colors from '../../constants/Colors'
import { Pressable } from 'react-native'

export default function RecipeButton(props) {
    const inactiveButton = { ...props.style, "backgroundColor": Colors.Grey }

    return (
        <Pressable style={(obj) => {
            if (obj.pressed) {
                return inactiveButton
            } else {
                return props.style
            }
        }}
            onPress={props.onPress}
            android_ripple={{ color: Colors.LightGrey }}>
            {props.children}
        </Pressable>
    )
}