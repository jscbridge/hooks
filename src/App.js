import { useEffect, useState } from "react";
import UseFetch from "./hooks/useFetch";
import "./App.css";

function App() {
  // Creamos nuestro Hook
  const [setPokemon, searchData] = UseFetch();

  const [allPokemon, setAllPokemon] = useState();

  // Para recoger todos los pokemons y crear sus botones
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/?offset=20&limit=1134`)
      .then((res) => res.json())
      .then((res) => {
        let pokemons = [];
        res.results.map((r)=>{
          pokemons.push([r.name,r.url])
        })
        setAllPokemon(pokemons.sort());
      });
  }, []);


  // Está predeterminado Pikachu.
  useEffect(() => {
    setPokemon("pikachu");
  }, []);

  return (
    <div className="App">
      {searchData
        ? searchData.map((poke, i) => {
            return (
              <div key={i}>
                <h1>  {poke.name}</h1>
                <img src={poke.sprites.other.home.front_default} alt=""></img>
              </div>
            );
          })
        : ""}
      <input type="text" name="pokemon" onChange={(e) => setPokemon(e.target.value)} />
      <div id="div-buttons-pokemon">
        {allPokemon
          ? allPokemon.map((pokemon, i) => {
              return <input className="buttons-pokemon" key={i} type="button" onClick={(e) => setPokemon(e.target.value)} value={pokemon[0]}/>;
            })
          : ""}
      </div>
    </div>
  );
}

export default App;
