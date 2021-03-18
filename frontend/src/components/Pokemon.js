import React, { useState } from 'react'
import axios from 'axios';
const Pokemon = ({ pokeDataForState, pokemonList, spreadTypes }) => {

    // const [image, setImage] = useState(pokeDataForState.frontImage);
    // if (image && !flag) {
    //     setImage(pokeDataForState.frontImage);
    //     flag = true;
    // }
    // pokeDataForState.backImage
    // pokeDataForState.frontImage

    // onMouseOver={() => setImage(pokeDataForState.backImage)} 





    return (
        <div className="stats">
            <p>Name: {pokeDataForState.pokeName}</p>
            <p>Types: {spreadTypes(pokeDataForState.pokeTypes)}</p>
            <p>Height: {pokeDataForState.pokeHeight}</p>
            <p>Weight: {pokeDataForState.pokeWeight}</p>
            <div style={{
                height: '96px', width: '96px',
                backgroundImage: `${pokeDataForState.frontImage}`
            }} ></div>
            <ul>{pokemonList}</ul>
        </div>
    )
}

export default Pokemon
