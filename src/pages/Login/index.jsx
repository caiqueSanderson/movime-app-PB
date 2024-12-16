import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFilm } from "react-icons/fa";

import styles from "./styles.module.css";

export default function Login() {
  const [token, setToken] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!token || !apiKey) {
      setError("Por favor, preencha todos os campos!");
      return;
    }

    localStorage.setItem("@VITE_PRIVATE_TOKEN", token);
    localStorage.setItem("@VITE_PRIVATE_API_KEY", apiKey);

    navigate("/");
  };

  return (
    <div className={styles.container}>
      <FaFilm size={40} color="#e50914" />
      <h1>Login</h1>
      <div className={styles.form}>
        <label>Token</label>
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Insira seu token"
        />
        <label>API Key</label>
        <input
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Insira sua API Key"
        />
        {error && <p className={styles.error}>{error}</p>}
        <button onClick={handleLogin}>Entrar</button>
      </div>
    </div>
  );
}
