import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PokeFilter from './components/PokeFilter';
import Pokemon from './components/Pokemon'

function App() {

  const [pokemonUrls, pokemonUrlsState] = useState([])

  const [value, setValue] = useState('');
  const changeValue = (e) => {
    const newValue = e.target.value;
    setValue(newValue)
  }
  const firstpokeDataForState = { pokeName: '', pokeTypes: '', pokeHeight: '', pokeWeight: '' }
  const [pokeDataForState, setPokeDataForState] = useState(firstpokeDataForState)
  //  !!!!!!!!!!!!!!!  MUST TAKECARE OF EACH TYPE 2 HTTP REQUESTS SENT    !!!!!!!!
  const getPokemonData = (value) => {
    // setValue(value.value);
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
          const typeName = type.type.name
          return `${typeName} `;
        });
        const pokeWeight = pokeData.weight;
        const pokeHeight = pokeData.height;
        const pokeDataForState = { pokeName: pokeName, pokeTypes: pokeTypes, pokeHeight: pokeHeight, pokeWeight: pokeWeight };
        console.log(pokeDataForState);
        setPokeDataForState(pokeDataForState);









      })
      .catch(error => {
        console.log(error);

      });
    // pokemonUrlsState(fetchedPokemonUrls);


  }

  return (
    <div className="App">
      <h1>Pokedex</h1>
      <PokeFilter changeValue={changeValue} getPokemonData={getPokemonData} value={value} />
      <Pokemon pokeDataForState={pokeDataForState} />
    </div>
  );


}



// useEffect(() => {

//   axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1118')
//     .then(({ data }) => {
//       const fetchedPokemonUrls = {};
//       data.results.map((val) => {
//         return (
//           fetchedPokemonUrls[val.name] = val.url
//         )
//       });
//       console.log(data);
//       pokemonUrlsState(fetchedPokemonUrls);
//     }
//     )
// }, []);





export default App;