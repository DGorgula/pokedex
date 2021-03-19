import React, { useState } from 'react'
const Pokemon = ({ pokeDataForState, pokemonTypeList, spreadTypes, catchOrRelease, catchState, catchButton, setFrontImage, image, setImage }) => {

    if (pokeDataForState.frontImage) {
        setFrontImage(setImage, image, pokeDataForState.frontImage, pokeDataForState.backImage);
    }

    return (
        <div className="stats">
            <p>Name: {pokeDataForState.pokeName}</p>
            <p>Types: {spreadTypes(pokeDataForState.pokeTypes)}</p>
            <p>Height: {pokeDataForState.pokeHeight}</p>
            <p>Weight: {pokeDataForState.pokeWeight}</p>
            <div onMouseOver={() => setImage(pokeDataForState.backImage)} onMouseLeave={() => setImage(pokeDataForState.frontImage)} style={{
                height: '96px', width: '96px',
                backgroundImage: `${image || pokeDataForState.frontImage}`
            }} ></div>
            <ul>{pokemonTypeList}</ul>
            <button className="Catch-release" onClick={() => { catchOrRelease(pokeDataForState.pokeName) }}>{catchButton}</button>

        </div>
    )
}

export default Pokemon
