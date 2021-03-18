
import PokeFilter from './components/PokeFilter'
function App() {


  const pokeObj = {
    "abilities": [
    ],
    "base_experience": 179,
    "forms": [
    ],
    "game_indices": [
    ],
    "height": 92,
    "held_items": [
      {
        "item": {
        },
        "version_details": [
        ]
      }
    ],
    "id": 208,
    "is_default": true,
    "location_area_encounters": "https://pokeapi.co/api/v2/pokemon/208/encounters",
    "moves": [
    ],
    "name": "steelix",
    "order": 143,
    "past_types": [],
    "species": {
    },
    "sprites": {
    },
    "stats": [
    ],
    "types": [
      {
        "slot": 1,
        "type": {
          "name": "steel",
          "url": "https://pokeapi.co/api/v2/type/9/"
        }
      },
      {
        "slot": 2,
        "type": {
          "name": "ground",
          "url": "https://pokeapi.co/api/v2/type/5/"
        }
      }
    ],
    "weight": 4000
  }
  const [poke, setstate] = useState(initialState)
  const pokeName = pokeObj.name;
  const pokeTypes = pokeObj.types.map(type => {
    const typeName = type.type.name
    return `${typeName} `;
  });
  const pokeWeight = pokeObj.weight;
  const pokeHeight = pokeObj.height;
  const pokeData = { pokeName: pokeName, pokeTypes: pokeTypes, pokeHeight: pokeHeight, pokeWeight: pokeWeight };
  console.log(pokeData);

  return (
    <div className="App">
      <h1>Pokedex</h1>
      <PokeFilter pokeData={pokeData} />
    </div>
  );
}

export default App;
