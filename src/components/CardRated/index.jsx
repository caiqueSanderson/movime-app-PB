import { FaClock } from "react-icons/fa";

import styles from './styles.module.css';

export default function CardRated({ data }) {
    console.log(data)
    return (
        <div key={data.id} className={styles.card}>
            <img
                src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                alt={data.title}
                className={styles.dataPoster}
            />
            <div className={styles.dataDetails}>
                <h2>{data.title}</h2>
                <p>{data.release_date}</p>
                <p><FaClock /> {data.runtime} min</p>
            </div>
        </div>)
}