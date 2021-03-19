const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config()
const morgan = require('morgan');
const cors = require('cors');
const axios = require('axios');
app.use(cors());
app.use(express.json());

const catchState = { "aron": true, "rattata": true };
let catchButton;
app.get('/', (req, res) => {
    res.send("blas")
});

app.get('/api/collection', (req, res, next) => {
    const collection = { name: "Daniel" };
    console.log("in colections")

    // for loop doesnt work - getting 404 not found in the axios request.
    for (const property in catchState) {
        console.log(property)
        console.log(catchState)
        axios.get(`https://pokeapi.co/api/v2/pokemon/${catchState[property]}`) // perhaps change needed in address.
            .then(({ data }) => {
                const frontImage = 'url("' + data.sprites.front_default + '")';
                const pokeName = data.name;
                collection[property] = { frontImage: frontImage, pokeName: pokeName }
                console.log(collection)
                return res.json(collection)
            })
            .catch(err => next(err))
    }
    // console.log(collection)
    return;
});

app.get('/api/:type', (req, res) => {
    const { type } = req.params
    axios.get(`https://pokeapi.co/api/v2/type/${type}`)
        .then(({ data }) => {
            // console.log(data.pokemon)
            // console.log(data)
            const pokemonsArr = data.pokemon.map((obj) => {
                return obj.pokemon.name
            })
            res.json(pokemonsArr)
        })
});


app.post('/api/collection/catch', (req, res) => {
    const pokemon = req.body.name;
    const isCatched = catchState[pokemon];
    if (isCatched) {
        catchButton = 'catch';
        console.log(catchState)
        delete catchState[pokemon];
        console.log(catchState)
        res.json({ catchButton: catchButton, catchState: catchState });
        // const catchedPokemons = catchState.filter(catchedObject => catchedObject[pokemon] === true);
    } else {
        catchState[pokemon] = pokemon;
        catchButton = 'release';
        res.json({ catchButton: catchButton, catchState: catchState });
    }
});

app.get('/api/pokemon/:name', (req, res) => {
    console.log("in the route");
    const name = req.params.name;
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then(({ data }) => {
        const pokeData = data;
        const pokeName = pokeData.name;
        const pokeTypes = pokeData.types.map(type => {
            const typeName = type.type.name;
            return `${typeName} `;
        });
        const pokeWeight = pokeData.weight;
        const pokeHeight = pokeData.height;
        const frontImage = 'url("' + pokeData.sprites.front_default + '")';
        const backImage = 'url("' + pokeData.sprites.back_default + '")';
        if (catchState[pokeName]) {
            catchButton = 'release';
        }
        else {
            catchButton = 'catch';
        }
        const pokeDataForState = { pokeName: pokeName, pokeTypes: pokeTypes, pokeHeight: pokeHeight, pokeWeight: pokeWeight, frontImage: frontImage, backImage: backImage, catchButton: catchButton };
        res.json(pokeDataForState);
    });
});

function errorHandler(error, req, res, next) {
    res.json({ errorFrom: "errorHandler", error: error })

    next(error);
}


app.use((req, res) => {
    res.send("Didnt get any route");
})
app.use(errorHandler);
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`you are listening to ${PORT}`)
})