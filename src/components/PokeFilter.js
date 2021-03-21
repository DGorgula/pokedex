import React from 'react'

const PokeFilter = ({ changeValue, getPokemonData, value }) => {
    const handleKeyPress = (target) => {
        if (target.charCode == 13) {
            getPokemonData(value);
        }
    }
    return (
        <div id="filter-div">
            <input id="filter" placeholder="Enter a Pokemon" type='text' onKeyPress={handleKeyPress} onChange={changeValue} />
            <div id="filter-button" onClick={() => { getPokemonData(value) }}><i class="fas fa-search"></i></div>

        </div >
    )
}

export default PokeFilter