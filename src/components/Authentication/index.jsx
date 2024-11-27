import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";

import { authenticateAndGetAccountData, completeAuthentication } from "../../services/authentication";

import Loading from "../Loading";

import styles from "./styles.module.css";

export default function Authentication({ setAuthenticated }) {
    const [authenticationLink, setAuthenticationLink] = useState(null);
    const [requestToken, setRequestToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authenticated, setLocalAuthenticated] = useState(false);

    useEffect(() => {
        async function fetchAuthenticationLink() {
            try {
                const { requestToken, authenticationLink } = await authenticateAndGetAccountData();
                setRequestToken(requestToken);
                setAuthenticationLink(authenticationLink);
            } catch (error) {
                console.error("Erro ao obter o link de autenticação:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchAuthenticationLink();
    }, []);

    const completeAuthentication = async () => {
        setLoading(true);
        try {
            const { sessionId, accountId } = await completeAuthentication(requestToken);
            localStorage.setItem("@sessionID", sessionId);
            localStorage.setItem("@accountID", accountId);
            setAuthenticated(true);
            setLocalAuthenticated(true);
        } catch (error) {
            console.error("Erro ao completar a autenticação:", error);
        } finally {
            setLoading(false);
        }
    };

    if (authenticated) {
        return (
            <div>
                <p>Autenticado com sucesso!</p>
                <FaCheck style={{ color: "#008000" }} />
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1>Autenticação TMDB</h1>
            {loading ? (
                <div className={styles.containerLoading}>
                    <p>Carregando...</p>
                    <Loading />
                </div>
            ) : authenticationLink ? (
                <div className={styles.authenticationPrompt}>
                    <p className={styles.authenticationText}>
                        Clique para autenticar:{" "}
                        <a href={authenticationLink} target="_blank" rel="noopener noreferrer" className={styles.authLink}>
                            Autenticar
                        </a>
                    </p>
                    <button onClick={completeAuthentication} className={styles.authenticationCompleteButton}>
                        Completar Autenticação
                    </button>
                </div>
            ) : (
                <p>Erro ao gerar link de autenticação. Tente novamente.</p>
            )}
        </div>
    );
}
