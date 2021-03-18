import React from 'react'
import Pokemon from './Pokemon.js'

const PokeFilter = ({ pokeData }) => {
    console.log({ pokeData })
    return (
        <div className="filter-div">
            <input className="filter" placeholder="Enter a Pokemon" type='text' value={ } />
            <button className="filter-button">Go</button>
            <Pokemon pokeData={pokeData} />
        </div>
    )
}

export default PokeFilter
