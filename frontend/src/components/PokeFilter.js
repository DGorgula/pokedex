import React, { useState } from 'react'
import Pokemon from './Pokemon.js'

const PokeFilter = ({ changeValue, getPokemonData, value }) => {


    return (
        <div className="filter-div">
            <input className="filter" placeholder="Enter a Pokemon" type='text' onChange={changeValue} />
            <p>{value}</p>
            <button className="filter-button" onClick={getPokemonData(value)} >Go</button>
        </div >
    )
}

export default PokeFilter



//          find by type:
// fetch >> data.names