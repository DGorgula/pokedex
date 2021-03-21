const mongoose = require('mongoose');
require('dotenv').config();
const url = process.env.MONGO_URI;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(result => { console.log('connected to MongoDB') }).catch((error) => { console.log('error connecting to MongoDB:', error.message) });

const pokemonSchema = new mongoose.Schema({
    pokeName: {
        type: String
    },
    pokeTypes: {
        type: Array
    },
    pokeHeight: {
        type: Number
    },
    pokeWeight: {
        type: Number
    },
    pokeFrontImage: {
        type: String
    },
    pokeBackImage: {
        type: String
    },
    pokeCatchedButton: {
        type: String,
        default: "catch"
    }
});

// pokemonSchema.set('toJSON', {
//     transform: (document, returnedObject) => {
//         returnedObject.id = returnedObject._id.toString()
//         delete returnedObject._id
//         delete returnedObject.__v
//     }
// });


module.exports = mongoose.model('Pokemon', pokemonSchema);


// function newTime() {
//     const currentTime = new Date(new Date().setHours(new Date().getHours() + 2));
//     const sqlFormat = currentTime.toISOString().slice(0, -5).replace('T', ' ');
//     console.log("running", sqlFormat);
//     return sqlFormat;
// }