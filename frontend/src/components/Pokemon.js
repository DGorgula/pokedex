import React from 'react'
const Pokemon = ({ pokeData }) => {
    return (
        <div>
            <p>Name: {pokeData.pokeName}</p>
            <p>Types: {pokeData.pokeTypes}</p>
            <p>Height: {pokeData.pokeHeight}</p>
            <p>Weight: {pokeData.pokeWeight}</p>
        </div>
    )
}

export default Pokemon
