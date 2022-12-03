import { View, Text } from 'react-native'
import React from 'react'
import RecipeList from '../components/RecipeList'

export default function NearBy({navigation, route}) {
  return (
    <RecipeList location={route.params.p} />
  )
}
