import React from 'react';

const CatchedPokemons = ({ catchedPokemons, catchedPokemonList, setCatchedPokemons }) => {

    // const catchedPokemonsElements = catchedPokemons.map()
    return (
        <div className="collection">
            {catchedPokemons ? catchedPokemons : catchedPokemonList(setCatchedPokemons)}
        </div>
    )
}

export default CatchedPokemons;
