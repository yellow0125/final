import React from 'react'
import RecipeList from '../components/RecipeList'

export default function NearBy({route}) {
  return (
    <RecipeList location={route.params.p} />
  )
}
