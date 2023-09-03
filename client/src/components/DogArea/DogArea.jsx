import React, { Fragment } from "react";
import DogCard from "../DogCard/DogCard";
import Pagination from "../Pagination/Pagination";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDogs } from "../../redux/actions";
import styles from "./DogArea.module.css";

export default function DogArea() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.allDogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

  // Función para cambiar la página actual
  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Llama a la acción para obtener la lista de perros cuando el componente se monta
  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  return (
    <Fragment>
      <div className={styles.dogsArea}>
        {/* Componente de paginación */}
        <Pagination
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          pagination={pagination}
          currentPage={currentPage}
        />
        <div className={styles.pagination}></div>
        {/* Mapea y renderiza las tarjetas de perros */}
        {currentDogs.map((el) => {
          return (
            <DogCard
              key={el.id}
              id={el.id}
              name={el.name}
              image={el.image}
              temperament={el.temperament}
              temperaments={el.temperaments}
            />
          );
        })}
      </div>
    </Fragment>
  );
}
