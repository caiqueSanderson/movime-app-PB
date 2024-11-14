import React, { useEffect, useState } from "react";
import { authenticateAndGetAccountData, completeAuthentication } from "./autentication";
import { FaCheck } from "react-icons/fa6";
import Loading from "../Loading/Loading";
import styles from "./styles.module.css";

export default function Authentication() {
    const [sessionData, setSessionData] = useState(null);
    const [authenticationLink, setAuthenticationLink] = useState(null);
    const [requestToken, setRequestToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAuthenticationLink() {
            try {
                const { requestToken, authenticationLink } = await authenticateAndGetAccountData();
                setRequestToken(requestToken);
                setAuthenticationLink(authenticationLink);
                setLoading(false); // Termina o carregamento quando o link está pronto
            } catch (error) {
                console.error("Erro ao obter o link de autenticação:", error);
                setLoading(false);
            }
        }

        fetchAuthenticationLink();
    }, []);

    const handleCompleteAuthentication = async () => {
        setLoading(true);

        try {
            const { sessionId, accountId } = await completeAuthentication(requestToken);
            setSessionData({ sessionId, accountId });
        } catch (error) {
            console.error("Erro ao completar a autenticação:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Autenticação TMDB</h1>
            {sessionData ? (
                <div>
                    <p>Autenticado</p>
                    <FaCheck style={{ color: "#008000" }} />
                </div>
            ) : (
                <div className={styles.containerLoading}>
                    {loading ? (
                        <div>
                            <p>Gerando link de autenticação...</p>
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
                            <button onClick={handleCompleteAuthentication} className={styles.authenticationCompleteButton}>
                                Completar Autenticação
                            </button>
                        </div>
                    ) : (
                        <p>Erro ao gerar link de autenticação. Tente novamente.</p>
                    )}
                </div>
            )}
        </div>
    );
}
