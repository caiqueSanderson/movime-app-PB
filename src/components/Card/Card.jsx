import styles from "./styles.module.css";

export default function Card({ title, image }) {
    return (
        <div className={styles.card}>
            <img className={styles.poster}
                src={`https://image.tmdb.org/t/p/w500${image}`}
                alt=""
            />
                <h2 className={styles.title}>{title}</h2>
                <button className={styles.detailsButton}>Detalhes</button>
        </div>
    )
}