import { useEffect, useState } from 'react';

import { GetAllPokemon, GetPokemon } from './utils/GetAllPokemon';

import './App.css';

export const App = () => {
    // ポケモンデータの取得
    const initialURL = 'https://pokeapi.co/api/v2/pokemon';
    const [loading, setLoading] = useState(true);
    const [pokemonData, setPokemonData] = useState([]);

    useEffect(() => {
        const fetchPokemonData = async () => {
            //全てのポケモンデータを取得
            let res = await GetAllPokemon(initialURL);
            //各ポケモンの詳細なデータを取得
            loadPokemon(res.results);
            // console.log(res);
            setLoading(false);
        };
        fetchPokemonData();
    }, []);

    const loadPokemon = async (data) => {
        let _pokemonData = await Promise.all(
            data.map((pokemon) => {
                // console.log(pokemon);
                let pokemonRecord = GetPokemon(pokemon.url);
                return pokemonRecord;
            })
        );
    };

    console.log(pokemonData);

    return (
        <div className="App">
            {loading ? <h1>ロード中・・・</h1> : <h1>ポケモンデータを取得しました。</h1>}
        </div>
    );
};
