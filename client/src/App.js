import axios from 'axios';
import React, { useState } from 'react';
import PokeFilter from './components/PokeFilter';
import Pokemon from './components/Pokemon';
import CatchedPokemons from './components/CatchedPokemons';
import Webcam from "react-webcam";
const WebcamComponent = () => <Webcam className="webcam" />;

function App() {
  const [pokemonTypeList, setpokemonTypeList] = useState('');
  const [value, setValue] = useState('')
  const [catchState, setCatchState] = useState([]);
  const [catchedPokemons, setCatchedPokemons] = useState(catchedPokemonList());
  const [catchButton, setCatchButton] = useState('catch');

  function catchedPokemonList(setCatchedPokemons) {
    axios.get(`http://localhost:3005/api/collection`).then(({ data }) => {
      console.log(data);
      const catchedPokemonsElements = data.map(pokemon => {
        return (
          <img className="catched-pokemon" src={pokemon.pokeFrontImage} onClick={() => getPokemonData(pokemon.pokeName)} />
        )
      })
      if (setCatchedPokemons) {
        setCatchedPokemons(catchedPokemonsElements);
        return;
      }
      return catchedPokemonsElements;
      // const x = data.frontImage;
      // const y = data.pokeName;
    })
  }

  function catchOrRelease(pokemonName, catchButton, pokeId) {
    console.log(pokemonName);
    if (catchButton === 'catch') {

      axios.post(`http://localhost:3005/api/collection/catch`, { name: pokemonName })
        .then(({ data }) => {
          console.log(data);
          setCatchButton(data.pokeCatchedButton);
          catchedPokemonList(setCatchedPokemons);
          console.log(catchedPokemons);
        })
        .catch(error => {
          console.log("EROR",error)

          console.log(error)
          ;
        });
    }
    else {
      axios.delete(`http://localhost:3005/api/collection/release/${pokeId}`, { name: pokemonName }).then((data) => {
        setCatchButton("catch");
        catchedPokemonList(setCatchedPokemons);
        console.log(catchedPokemons);
      })
    }
  }

  const changeValue = (e) => {
    const newValue = e.target.value;
    setValue(newValue)
  }
  const firstpokeDataForState = { pokeName: '', pokeTypes: '', pokeHeight: '', pokeWeight: '' };
  const [pokeDataForState, setPokeDataForState] = useState(firstpokeDataForState);

  const getPokemonData = (value) => {
    setpokemonTypeList('')
    if (!value) {
      return;
    }
    const pokeName = value.toLowerCase();
    axios.get(`http://localhost:3005/api/pokemon/${pokeName}`)
      .then(({ data }) => {
        console.log(data);
        setCatchButton(data.pokeCatchedButton);
        setPokeDataForState(data);
      })
      .catch(error => {
        console.log(error)
        if(error.message === "Request failed with status code 404"
          ){
          console.log("GET INSIDE",error.message);
          return  setCatchButton(WebcamComponent);
        }

      });
  }

  const [image, setImage] = useState(pokeDataForState.frontImage);


  function setFrontImage(setImage, image, frontImage, backImage) {
    if (image !== frontImage && image !== backImage) {
      setImage(frontImage);
    }
  }

  function showTypePokemons(type) {
    axios.get(`http://localhost:3005/api/${type}`).then(({ data }) => {
      const pokemonTypeList = data.map((pokeName, i) => {
        return (<li key={i} onClick={() => getPokemonData(pokeName)}>{pokeName}</li>)
      })
      setpokemonTypeList(pokemonTypeList);
    })
  }
  function spreadTypes(types) {
    if (!types) {
      return;
    }
    const spans = types.map((type, index) => {
      return <span className={"type "+type} onClick={() => showTypePokemons(type)} key={index}>{type}</span>
    });

    return spans;
  }
  return (
    <div className="App">
      <h1>Pokedex</h1>
      <PokeFilter changeValue={changeValue} getPokemonData={getPokemonData} value={value} />
      <Pokemon pokeDataForState={pokeDataForState} pokemonTypeList={pokemonTypeList} spreadTypes={spreadTypes} catchOrRelease={catchOrRelease} catchButton={catchButton} setCatchButton={setCatchButton} setImage={setImage} image={image} setFrontImage={setFrontImage} />
      <CatchedPokemons catchedPokemons={catchedPokemons} setCatchedPokemons={setCatchedPokemons} setCatchState={setCatchState} catchState={catchState} catchedPokemonList={catchedPokemonList} />
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