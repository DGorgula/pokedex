import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PokeFilter from './components/PokeFilter';
import Pokemon from './components/Pokemon'

function App() {

  const [pokemonUrls, pokemonUrlsState] = useState([])
  const [pokemonList, setpokemonList] = useState('');
  const [value, setValue] = useState('');
  const changeValue = (e) => {
    const newValue = e.target.value;
    setValue(newValue)
  }
  const firstpokeDataForState = { pokeName: '', pokeTypes: '', pokeHeight: '', pokeWeight: '' };
  const [pokeDataForState, setPokeDataForState] = useState(firstpokeDataForState);

  const getPokemonData = (value) => {
    setpokemonList('')
    if (!value) {
      return;
    }
    const bla = value.toLowerCase();
    axios.get(`https://pokeapi.co/api/v2/pokemon/${bla}`)
      .then(({ data }) => {
        console.log(data);
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

        const pokeDataForState = { pokeName: pokeName, pokeTypes: pokeTypes, pokeHeight: pokeHeight, pokeWeight: pokeWeight, frontImage: frontImage, backImage: backImage };
        console.log(frontImage);
        setPokeDataForState(pokeDataForState);
      })
      .catch(error => {
        console.log(error);

      });
  }

  function showTypePokemons(type) {
    axios.get(`https://pokeapi.co/api/v2/type/${type}`).then(({ data }) => {
      const pokemonTypeList = data.pokemon.map((object, i) => {
        console.log(object);
        return (<li key={i} onClick={() => getPokemonData(object.pokemon.name)}>{object.pokemon.name}</li>)
      })
      setpokemonList(pokemonTypeList);
    })
  }
  function spreadTypes(types) {
    if (!types) {
      return;
    }
    const spans = types.map((type, index) => {
      return <span onClick={() => showTypePokemons(type)} key={index}>{type}</span>
    });

    return spans;
  }
  return (
    <div className="App">
      <h1>Pokedex</h1>
      <PokeFilter changeValue={changeValue} getPokemonData={getPokemonData} value={value} />
      <Pokemon pokeDataForState={pokeDataForState} pokemonList={pokemonList} spreadTypes={spreadTypes} />
      {/* <TypePokemon /> */}
    </div>
  );


}


// axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1118')
//   .then(({ data }) => {
//     const fetchedPokemonUrls = {};
//     data.results.map((val) => {
//       return (
//         fetchedPokemonUrls[val.name] = val.url
//       )
//     });
//     console.log(data);
//     pokemonUrlsState(fetchedPokemonUrls);
//   }
//   )







export default App;