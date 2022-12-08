import React from 'react'
import RecipeList from '../components/RecipeList'

export default function NearBy({route, navigation}) {
  return (
    <RecipeList location={route.params.p} navigation={navigation} />
  )
}
