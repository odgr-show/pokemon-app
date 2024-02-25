import { useEffect, useState } from 'react';

import { GetAllPokemon, GetPokemon } from './utils/Pokemon';
import { Card } from './components/Card/Card';

import './App.scss';
import { Navbar } from './components/Navbar/Navbar';

export const App = () => {
    // ポケモンデータの取得
    const initialURL = 'https://pokeapi.co/api/v2/pokemon';
    const [loading, setLoading] = useState(true);
    const [pokemonData, setPokemonData] = useState([]);
    const [nextURL, setNextURL] = useState('');
    const [prevURL, setPrevURL] = useState('');

    useEffect(() => {
        const fetchPokemonData = async () => {
            //全てのポケモンデータを取得
            let res = await GetAllPokemon(initialURL);
            //各ポケモンの詳細なデータを取得
            loadPokemon(res.results);
            // console.log(res);
            setNextURL(res.next);
            setPrevURL(res.previous);
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
        setPokemonData(_pokemonData);
    };

    // console.log(pokemonData);

    const handlePrevPage = async () =>{
        if(!prevURL) return
        setLoading(true)
        let data = await GetAllPokemon(prevURL);
        await loadPokemon(data.results)
        setNextURL(data.next)
        setPrevURL(data.previous)
        setLoading(false)
    };

    const handleNextPage = async () => {
        setLoading(true)
        let data = await GetAllPokemon(nextURL)
        // console.log(data)
        await loadPokemon(data.results)
        setNextURL(data.next)
        setPrevURL(data.previous)
        setLoading(false)
    };

    return (
        <>
        <Navbar />
        <div className="App">
            {loading ? (<h1>ロード中・・・</h1>) : (
                <>
                    <div className='pokemonCardContainer'>
                        {pokemonData.map((pokemon, i) => {
                            return  <Card key={i} pokemon={pokemon} />
                        })}
                    </div>
                    <div className="btn">
                        <button onClick={handlePrevPage}>前へ</button>
                        <button onClick={handleNextPage}>次へ</button>
                    </div>
                </>
            )
}
        </div>
        </>
    );
};
