import axios from "axios";

export async function getRatedMovies() {
  try {
    const token = localStorage.getItem("@VITE_PRIVATE_TOKEN");
    const sessionId = localStorage.getItem("@sessionID");
    const accountId = localStorage.getItem("@accountID");
    const response = await axios.get(
      `https://api.themoviedb.org/3/account/${accountId}/rated/movies?language=pt-BR&page=1&session_id=${sessionId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.results;
  } catch (error) {
    console.error("Erro ao buscar filmes avaliados", error);
    throw error;
  }
}

export async function getMovieDetails(movieId) {
  try {
    const apiKey = localStorage.getItem("@VITE_PRIVATE_API_KEY");
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}`,
      {
        params: {
          api_key: apiKey,
          language: "pt-BR",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      `Erro ao obter detalhes do filme (ID: ${movieId}):`,
      error.message
    );
    return null;
  }
}
