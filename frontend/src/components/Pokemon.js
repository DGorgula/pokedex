import React from 'react'
const Pokemon = ({ pokeDataForState }) => {
    return (
        <div>
            <p>Name: {pokeDataForState.pokeName}</p>
            <p>Types: {pokeDataForState.pokeTypes}</p>
            <p>Height: {pokeDataForState.pokeHeight}</p>
            <p>Weight: {pokeDataForState.pokeWeight}</p>
        </div>
    )
}

export default Pokemon
