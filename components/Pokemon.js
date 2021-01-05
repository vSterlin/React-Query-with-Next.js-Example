import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { fetchPokemon } from '../hooks/fetch'




const Pokemon = ({pokemon}) => {
  return (
    <div>
      <h3>
        Name - {pokemon.name}
        </h3>
        <h4>Base XP - {pokemon.base_experience}</h4>
    </div>
  )
}


export default Pokemon
