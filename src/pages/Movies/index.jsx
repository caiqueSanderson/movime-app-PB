import { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa";

import Menu from "../../components/Menu/Menu";
import Loading from "../../components/Loading/Loading";

import { getRatedMovies } from "../../services/tmdb";

import styles from "./styles.module.css";

export default function Movies() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    console.log(movies)

    useEffect(() => {
        async function fetchRatedMovies() {
            setLoading(true);
            try {
                const response = await getRatedMovies();
                setMovies(response);
            } catch (error) {
                console.error("Erro ao buscar filmes assistidos", error);
            } finally {
                setLoading(false);
            }
        }

        fetchRatedMovies();
    }, []);

    return (
        <div className={styles.page}>
            <Menu />
            <h1>Meus Filmes Assistidos</h1>

            {loading ? (
                <Loading />
            ) : (
                <div className={styles.moviesList}>
                    {movies.length > 0 ? (
                        movies.map((movie) => (
                            <div key={movie.id} className={styles.movieCard}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                    className={styles.moviePoster}
                                />
                                <div className={styles.movieDetails}>
                                    <h2>{movie.title}</h2>
                                    <p>{movie.release_date}</p>
                                    <p><FaClock /> {movie.runtime} min</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Você ainda não assistiu filmes ou não há filmes avaliados.</p>
                    )}
                </div>
            )}
        </div>
    );
}
