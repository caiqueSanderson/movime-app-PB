import { useState, useEffect } from "react";
import axios from "axios";

import Menu from "../../components/Menu";
import Card from "../../components/Card";
import Loading from "../../components/Loading";

import styles from "./styles.module.css";

const token = import.meta.env.VITE_PRIVATE_TOKEN;

export default function Home() {
    const [isLightTheme, setIsLigthTheme] = useState(true);
    const [dataMovies, setDataMovies] = useState({ results: [] });
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    function toggleTheme() {
        const themeNow = !isLightTheme;
        setIsLigthTheme(themeNow);
        localStorage.setItem("@theme", themeNow ? "true" : "false");
    }

    async function restoreData() {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1`,
                {
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data && response.data.results) {
                setDataMovies(response.data);
                setFiltered(response.data.results);
            } else {
                console.error("A resposta da API não contém 'results'.", response);
            }
        } catch (error) {
            console.error("Erro ao carregar DB", error);
        }
    }

    async function searchMovies(query) {
        if (!query.trim()) return;

        setLoading(true);

        setTimeout(async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/search/movie?query=${query}&language=pt-BR&page=1`,
                    {
                        headers: {
                            "Content-type": "application/json; charset=UTF-8",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.data && response.data.results) {
                    setFiltered(response.data.results);
                }
            } catch (error) {
                console.error("Erro ao buscar filmes", error);
            } finally {
                setLoading(false);
            }
        }, 2000);
    }

    useEffect(() => {
        restoreData();
    }, []);

    return (
        <div className={isLightTheme ? styles.ligthTheme : styles.darkTheme}>
            <Menu toggleTheme={toggleTheme} />

            <section className={styles.welcome}>

                <div className={styles.text}>
                    <h2 className={styles.slogan}>Aproveite cada segundo</h2>
                    <p className={styles.subtitle}>Conosco seus momentos se tornam mágicos</p>
                </div>

                <div className={styles.search}>
                    <input
                        type="search"
                        placeholder="Faça sua busca"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button type="button" onClick={() => searchMovies(search)}>Buscar</button>
                </div>
            </section>

            <section className={styles.movies}>
                <h2 className={styles.typographySection}>Filmes</h2>
                <div className={styles.cards}>
                    {loading ? (
                        <Loading className={styles.loading} />
                    ) : filtered.length > 0 ? (
                        filtered.map((movie) => (
                            <Card
                                key={movie.id}
                                id={movie.id}
                                title={movie.title}
                                image={movie.poster_path}
                            />
                        ))
                    ) : (
                        <div className={styles.containerEmpty}>
                            <p className={styles.messageMovieSearch}>{dataMovies.results.length === 0 ? "Carregando filmes..." : "Nenhum filme encontrado."}</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
