const express = require('express');
const app = express();
const Pokemon = require('./mongo.js');
const morgan = require('morgan');
const cors = require('cors');
const axios = require('axios');
require('dotenv/config')
app.use(cors());
app.use(express.json());

const catchState = {};
let pokeCatchedButton;


app.get('/', (req, res) => {
    console.log("a");
    return res.send("blas")
    console.log("b");
});

app.get('/api/collection', async (req, res, next) => {
    console.log("in colections")
    const collection = await Pokemon.find({ pokeCatched: true })
    // console.log(collection)

    return res.json(collection);
});
app.get('/api/clear', (req, res, next) => {
    return Pokemon.deleteMany({}).then((result) => {
        console.log(result)
        return res.status(200).send("deleted successfully")
    }).catch((err) => {
        return next(err)
        return res.status(500).send("something went wrong... the error is :", err)
    });
});

app.get('/api/:type', (req, res) => {
    console.log("111");
    const { type } = req.params

    console.log("API/TYPE", type);
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

app.delete('/api/collection/release/:id', async (req, res) => {
    const pokemonId = req.params.id;
    console.log("IN THE DELETE", pokemonId);
    const fetchedPokemon = await Pokemon.find({ _id: pokemonId });
    if (!fetchedPokemon[0]) {
        return res.status(500).json({ error: "there was a problem with the server" });
    }
    const catchedPokemon = fetchedPokemon[0];
    const pokeCatchedButton = 'catch';

    const updateStatus = await catchedPokemon.updateOne({ pokeCatchedButton: pokeCatchedButton }, { new: true });
    return res.json({ pokeCatchedButton: pokeCatchedButton });
});

app.post('/api/collection/catch', async (req, res) => {
    const pokemon = req.body.name;

    console.log("API/COLLECTION/CATCH", pokemon);
    const fetchedPokemon = await Pokemon.find({ pokeName: pokemon })    // , pokeCatched = true 
    if (!fetchedPokemon[0]) {
        return res.status(500).json({ error: "there was a problem with the server" });
    }
    const isCatched = fetchedPokemon[0].pokeCatched;
    console.log(isCatched);
    const catchedPokemon = fetchedPokemon[0];
    if (isCatched) {
        return res.status(404).send("not found");

        // const updateStatus = await catchedPokemon.updateOne({ pokeCatched: false })
        // console.log(updateStatus);

        // // const isCatched = catchState[pokemon];
        // // if (isCatched) {
        // pokeCatchedButton = 'catch';
        // console.log(catchState)
        // delete catchState[pokemon];
        // console.log(catchState)
        // return res.json({ pokeCatchedButton: pokeCatchedButton, catchState: catchState });
        // // const catchedPokemons = catchState.filter(catchedObject => catchedObject[pokemon] === true);
    } else {
        const pokeCatchedButton = 'release';
        const updateStatus = await catchedPokemon.updateOne({ pokeCatchedButton: pokeCatchedButton })
        console.log(updateStatus);
        return res.json({ pokeCatchedButton: pokeCatchedButton });
    }
});

app.get('/api/pokemon/:name', async (req, res, next) => {
    console.log("in the route");
    const name = req.params.name;
    const isPokemonInDB = await Pokemon.find({ pokeName: name })
    if (isPokemonInDB[0]) {
        const pokeData = isPokemonInDB[0];
        console.log("FOUND WHAT I LOOKED FOR!!!!!!", pokeData);
        if (catchState[pokeData.pokeName]) {
            pokeCatchedButton = 'release';
        }
        else {
            pokeCatchedButton = 'catch';
        }
        const pokeDataForState = { pokeId: pokeData._id, pokeName: pokeData.pokeName, pokeTypes: pokeData.pokeTypes, pokeHeight: pokeData.pokeHeight, pokeWeight: pokeData.pokeWeight, frontImage: pokeData.pokeFrontImage, backImage: pokeData.pokeBackImage, pokeCatchedButton: pokeCatchedButton };
        return res.json(pokeDataForState);
    }

    console.log("API/POKENOM/:NAME", name);
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const pokeData = data;
    const pokeName = pokeData.name;
    const pokeTypes = pokeData.types.map(type => {
        const typeName = type.type.name;
        return `${typeName} `;
    });
    const pokeWeight = pokeData.weight;
    const pokeHeight = pokeData.height;
    const frontImage = pokeData.sprites.front_default;
    const backImage = pokeData.sprites.back_default;

    const pokemon = new Pokemon({
        pokeName: pokeName,
        pokeTypes: pokeTypes,
        pokeWeight: pokeWeight,
        pokeHeight: pokeHeight,
        pokeFrontImage: frontImage,
        pokeBackImage: backImage,
    });
    const save = await pokemon.save(({ new: true }));

    const pokeDataForState = { pokeId: save._id, pokeName: pokeName, pokeTypes: pokeTypes, pokeHeight: pokeHeight, pokeWeight: pokeWeight, frontImage: frontImage, backImage: backImage, pokeCatchedButton: 'catch' };
    return res.json(pokeDataForState);
});

function errorHandler(error, req, res, next) {
    res.json({ errorFrom: "errorHandler", error: error })

    next(error);
}


app.use((req, res) => {
    res.status(404).send("Didnt get any route");
})
app.use(errorHandler);
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`you are listening to ${PORT}`)
})