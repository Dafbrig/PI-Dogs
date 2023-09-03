import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogsByName } from "../../redux/actions";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  // Estado local para mantener el valor del campo de entrada de búsqueda
  const [dogState, setDogsState] = useState("");
  const dispatch = useDispatch();

  // Función para manejar el clic en el botón de búsqueda
  function handleClick(e) {
    e.preventDefault();

    // Verifica si el campo de búsqueda está vacío y muestra una alerta si es así
    if (dogState.length === 0) {
      return alert("Please input a name to start the search");
    } else {
      // Despacha la acción para buscar perros por nombre utilizando el valor del estado local
      dispatch(getDogsByName(dogState));
      // Limpia el campo de búsqueda después de la búsqueda
      setDogsState("");
    }
  }

  return (
    <div className={styles.searchBarObject}>
      {/* Campo de entrada de texto para ingresar el nombre del perro a buscar */}
      <input
        type="text"
        placeholder="Search a dog..."
        className={styles.input}
        value={dogState}
        onChange={(e) => setDogsState(e.target.value)}
      />
      {/* Botón de búsqueda que activa la búsqueda cuando se hace clic */}
      <button type="submit" onClick={handleClick}>
        <span className="material-icons">search</span>
      </button>
    </div>
  );
}
