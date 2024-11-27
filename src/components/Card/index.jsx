import { useNavigate } from "react-router-dom";

import styles from "./styles.module.css";

export default function Card({ id, title, image }) {
    const navigate = useNavigate();

    function navigateDetails() {
        navigate(`/details/${id}`)
    }
    return (
        <div className={styles.card}>
            <img className={styles.poster}
                src={`https://image.tmdb.org/t/p/w500${image}`}
                alt=""
            />
            <h2 className={styles.title}>{title}</h2>
            
            <button
                onClick={navigateDetails}
                className={styles.detailsButton}
            >Detalhes
            </button>
        </div>
    )
}