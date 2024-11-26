import { useEffect, useState } from "react";

import Menu from "../../components/Menu";
import Loading from "../../components/Loading";
import CardRated from "../../components/CardRated"

import { getRatedMovies } from "../../services/ratedMovies";

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
                            <CardRated data={movie} />
                        ))
                    ) : (
                        <p>Você ainda não assistiu filmes ou não há filmes avaliados.</p>
                    )}
                </div>
            )}
        </div>
    );
}
