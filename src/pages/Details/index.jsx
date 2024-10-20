import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import styles from './styles.module.css';

const apiKey = import.meta.env.VITE_PRIVATE_API_KEY;
export default function Details() {
    const id = useParams();

    const [dataMovie, setDataMovie] = useState({});
    async function restoreData() {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1`, {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Authorization': `Bearer ${apiKey}`,

                }
            }
            );

            if (response.data && response.data.results) {
                const movie = response.data.results.map(movie => console.log(movie.id));
                // const movie = response.data.results.find(movie => movie.id == id);
                console.log(movie)
                if (movie) {
                    console.log(movie);
                    // setDataMovie(movie); // Use este objeto conforme necessário
                } else {
                    console.error(`Filme com id ${id} não encontrado.`);
                }
            } else {
                console.error("A resposta da API não contém 'results'.", response);
            }
        } catch (error) {
            console.error("Erro ao carregar DB", error);
        }
    }

    useEffect(() => {
        restoreData();
    }, []);


    console.log(dataMovie)

    return (
        <>

            <h1>Olá</h1>
        </>
    )
}