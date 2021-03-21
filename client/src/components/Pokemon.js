import React, { useState, useEffect } from 'react'
import "../pokemonType.css"
const Pokemon = ({ pokeDataForState, pokemonTypeList, spreadTypes, catchOrRelease, catchState, catchButton, setFrontImage, image, setImage }) => {

    if (pokeDataForState.frontImage) {
        setFrontImage(setImage, image, pokeDataForState.frontImage, pokeDataForState.backImage);
    }
    function getImage() {

        if (pokeDataForState.pokeName === "pokeugly") {
            return ""
        }
        return image || pokeDataForState.frontImage

    }

    function imgAndButton() {
        if (pokeDataForState.pokeName === "pokeugly") {
            return
        }
        return (
            <>
                <div className="main-image" onMouseOver={() => setImage(pokeDataForState.backImage)} onMouseLeave={() => setImage(pokeDataForState.frontImage)} style={{
                    width: '200px', height: "200px", backgroundSize: "200px", backgroundRepeat: 'no-repeat', backgroundImage: `url("${getImage()}")`
                }} >
                    <button className="catch-release" onClick={() => { catchOrRelease(pokeDataForState.pokeName, catchButton, pokeDataForState.pokeId) }}>{catchButton}</button>
                </div>

            </>)
    }





    return (
        <>
            <div id="main-data">
                <div className="stats">
                    <div id="properties">
                        <p id="name" className="property"><strong>Name:</strong></p>
                        <p id="types" className="property"><strong>Types:</strong></p>
                        <p id="height" className="property"><strong>Height:</strong></p>
                        <p id="weight" className="property"><strong>Weight:</strong></p>
                    </div>
                    <div id="values">
                        <p id="name-value" className="property">{pokeDataForState.pokeName}</p>
                        <p id="types-value" className="property">
                            {spreadTypes(pokeDataForState.pokeTypes)}
                        </p>
                        <p id="height-value" className="property">{pokeDataForState.pokeHeight ? pokeDataForState.pokeHeight + "cm" : ""}</p>
                        <p id="weight-value" className="property">{pokeDataForState.pokeWeight ? pokeDataForState.pokeWeight + "Kg" : ""}</p>
                    </div>
                </div>
                {imgAndButton()}
                <div>
                    {pokeDataForState.pokemonUgly ? pokeDataForState.pokemonUgly : ''}
                </div>
            </div>

        </>
    )
}

export default Pokemon
