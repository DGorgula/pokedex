import React from 'react'

const PokeFilter = ({ changeValue, getPokemonData, value }) => {

    return (
        <div className="filter-div">
            <input className="filter" placeholder="Enter a Pokemon" type='text' onChange={changeValue} />
            <button className="filter-button" onClick={() => { getPokemonData(value) }} >Go</button>
        </div >
    )
}

export default PokeFilter