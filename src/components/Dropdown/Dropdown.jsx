import { useState } from "react";
import { FaAngleDown, FaAnglesDown } from "react-icons/fa6";
import styles from "./styles.module.css";

const genres = [
  "Ação",
  "Comédia",
  "Drama",
  "Terror",
  "Ficção Científica",
  "Romance",
  "Documentário"
];

export default function Dropdown({ onGenreSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("Gênero");

  function handleToggleDropdown() {
    setIsOpen(!isOpen);
  };

  function handleSelectGenre(genre) {
    setSelectedGenre(genre);
    setIsOpen(false);
    onGenreSelect(genre);
  };

  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdownButton} onClick={handleToggleDropdown}>
        {selectedGenre} <FaAngleDown />
      </div>
      {isOpen && (
        <ul className={styles.dropdownMenu}>
          {genres.map((genre) => (
            <li
              key={genre}
              className={styles.dropdownItem}
              onClick={() => handleSelectGenre(genre)}
            >
              {genre}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}