import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import { FaAngleLeft } from "react-icons/fa";

import styles from './styles.module.css';

const token = import.meta.env.VITE_PRIVATE_TOKEN;

export default function Details() {
    const objectId = useParams();
    const navigate = useNavigate();

    const [dataMovie, setDataMovie] = useState({});

    function navigateHome() {
        navigate('/')
    }

    async function restoreData() {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${objectId.id}?language=pt-BR`, {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Authorization': `Bearer ${token}`,
                }
            }
            );

            if (response.data) {
                setDataMovie(response.data);
            } else {
                console.error(`Filme com id ${objectId.id} não encontrado.`);
            }
        } catch (error) {
            console.error("Erro ao carregar detalhes do filme", error);
        }
    }

    useEffect(() => {
        restoreData();
    }, []);

    return (
        <div className={styles.page}>
            <button
                onClick={navigateHome}
                className={styles.returnButton}
            ><FaAngleLeft />Retornar
            </button>
            <div className={styles.main}>
                <div className={styles.container}>
                    <img className={styles.backdrop}
                        src={`https://image.tmdb.org/t/p/original${dataMovie.backdrop_path}`}
                        alt=""
                    />
                    <h1 className={styles.title}>{dataMovie.title}</h1>
                    <img className={styles.poster}
                        src={`https://image.tmdb.org/t/p/w500${dataMovie.poster_path}`}
                        alt=""
                    />
                </div>
                <div className={styles.information}>
                    <h2>Informações</h2>
                    <h4>Titulo original: {dataMovie.original_title} | {dataMovie.original_language}</h4>
                    <h4>Generos: {dataMovie.genre_ids}</h4>
                    <h4>Popularidade: {dataMovie.popularity}</h4>
                    <h4>Duração: {dataMovie.runtime} minutos</h4>
                </div>

            </div>

            <div>
                <h2>Descrição</h2>
                <h4 className={styles.description}>{dataMovie.overview}</h4>
            </div>
        </div>
    )
}