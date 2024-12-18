import { useEffect, useState } from "react";

import Menu from "../../components/Menu";
import Loading from "../../components/Loading";
import Authentication from "../../components/Authentication";
import CardRated from "../../components/CardRated";
import Statistics from "../../components/Statistics";

import { getRatedMovies, getMovieDetails } from "../../services/ratedMovies";
import { calculateStats } from "../../services/statistics";
import { getGenres } from "../../services/genreMovies";

import { restoredTheme } from "../../services/theme";

import styles from "./styles.module.css";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(true);
  const [isLigthTheme, setIsLigthTheme] = useState(true);

  const [totalHours, setTotalHours] = useState(0);
  const [topGenres, setTopGenres] = useState([]);

  function toggleTheme() {
    setIsLigthTheme(!isLigthTheme);
    localStorage.setItem("@theme", isLigthTheme ? "true" : "false");
  }

  useEffect(() => {
    restoredTheme(setIsLigthTheme);

    async function fetchRatedMovies() {
      try {
        const sessionId = localStorage.getItem("@sessionID");
        if (!sessionId) {
          setAuthenticated(false);
          return;
        }

        setLoading(true);
        setAuthenticated(true);
        const [genresMap, ratedMovies] = await Promise.all([
          getGenres(),
          getRatedMovies(),
        ]);
        const ratedMoviesWithRuntime = await Promise.all(
          ratedMovies.map(async (movie) => {
            const details = await getMovieDetails(movie.id);
            return {
              ...movie,
              runtime: details?.runtime || 0,
            };
          })
        );
        const stats = calculateStats(ratedMoviesWithRuntime);
        const mappedTopGenres = stats.topGenres.map(({ genreId, count }) => ({
          name: genresMap[genreId] || "Desconhecido",
          count,
        }));

        setMovies(ratedMoviesWithRuntime);
        setTotalHours(stats.totalHours);
        setTopGenres(mappedTopGenres);
      } catch (error) {
        console.error("Erro ao buscar filmes assistidos", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRatedMovies();
  }, [authenticated]);

  return (
    <div
      className={`${styles.page} ${
        isLigthTheme ? styles.ligthTheme : styles.darkTheme
      }`}
    >
      <Menu toggleTheme={toggleTheme} />

      {!authenticated ? (
        <div className={styles.containerMessage}>
          <Authentication setAuthenticated={setAuthenticated} />
          <p>
            Você não está autenticado. Faça login para visualizar os filmes.
          </p>
        </div>
      ) : loading ? (
        <div className={styles.containerLoading}>
          <Loading />
        </div>
      ) : (
        <>
          <section className={styles.containerStatistic}>
            <h1 className={styles.title}>Estatísticas</h1>
            <Statistics totalHours={totalHours} topGenres={topGenres} />
          </section>

          <h1 className={styles.title}>Meus Filmes Assistidos</h1>

          <div className={styles.moviesList}>
            {movies.length > 0 ? (
              movies.map((movie) => <CardRated key={movie.id} data={movie} />)
            ) : (
              <div className={styles.containerMessage}>
                <p>
                  Você ainda não assistiu filmes ou não há filmes avaliados.
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
