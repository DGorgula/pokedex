import React, { useState , useEffect } from 'react'
import "../pokemonType.css"
const Pokemon = ({ pokeDataForState, pokemonTypeList, spreadTypes, catchOrRelease, catchState, catchButton, setFrontImage, image, setImage }) => {

    if (pokeDataForState.frontImage) {
        setFrontImage(setImage, image, pokeDataForState.frontImage, pokeDataForState.backImage);
    }

    return (
        <>
        <div id="main-data">
            <div className="stats">
                <p>Name: {pokeDataForState.pokeName}</p>
                <p>Types:{spreadTypes(pokeDataForState.pokeTypes)}</p>
                <p>Height: {pokeDataForState.pokeHeight}</p>
                <p>Weight: {pokeDataForState.pokeWeight}</p>
                </div>
                    <div className="main-image" onMouseOver={() => setImage(pokeDataForState.backImage)} onMouseLeave={() => setImage(pokeDataForState.frontImage)} style={{
                    width: '200px', height: "200px", backgroundSize: "200px", backgroundRepeat: 'no-repeat' , backgroundImage: `url("${image || pokeDataForState.frontImage}")`
                    }} >
                    <button className="catch-release" onClick={() => { catchOrRelease(pokeDataForState.pokeName, catchButton, pokeDataForState.pokeId) }}>{catchButton}</button>
                <ul>{pokemonTypeList}</ul>
            </div>
        </div>
</>
    )
}

export default Pokemon
