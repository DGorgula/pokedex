
function App() {

  fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1118')
    .then(response => response.json()
      .then(data => {
        data = data.results;

        const pokemons = {};
        data.map((val) => {
          return (
            pokemons[val.name] = val.url
          )
        })


        console.log(pokemons);

        // const pokemon = pokeObj.find(pokemon => pokemon.name === name);






















        // const [pokeData, pokeObjstate] = useState(pokeObj)
        // const pokeName = pokeData.name;
        // const pokeTypes = pokeData.types.map(type => {
        //   const typeName = type.type.name
        //   return `${typeName} `;
        // });
        // const pokeWeight = pokeData.weight;
        // const pokeHeight = pokeData.height;
        // const pokeDataForState = { pokeName: pokeName, pokeTypes: pokeTypes, pokeHeight: pokeHeight, pokeWeight: pokeWeight };
        // console.log(pokeData);

        // po

        return (
          <div className="App">
            <h1>Pokedex</h1>
          </div>
        );
      }))
    .catch(error => console.log(error));

}

export default App;

//   <PokeFilter pokeData={pokeData} /> 
// import PokeFilter from './components/PokeFilter'