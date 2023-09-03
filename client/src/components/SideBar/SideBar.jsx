import { React, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getDogs,
  getTemperamentsList,
  filterDogsByTemperament,
  orderByName,
  filterCreated,
  getBreeds,
  getDogsByBreed,
  filterDogsByMAXWeight,
  filterDogsByMINWeight,
  orderByWeight
} from "../../redux/actions/index";
import styles from "./SideBar.module.css";

export default function SideBar() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments).sort(
    function (a, b) {
      if (a < b) return -1;
      else return 1;
    }
  );
  const allDogs = useSelector((state) => state.allDogs);
  const breeds = useSelector((state) => state.breeds);
  
  // Obtener valores únicos para los pesos mínimos y máximos de todos los perros
  const minWeights = allDogs
    .map((el) => el.weight_min)
    .sort(function (a, b) {
      return a - b;
    });
  const allDogsMinWeights = [...new Set(minWeights)];
  
  const maxWeights = allDogs
    .map((el) => el.weight_max)
    .sort(function (a, b) {
      return a - b;
    });
  const allDogsMaxWeights = [...new Set(maxWeights)];

  useEffect(() => {
    // Obtener la lista de perros y temperamentos cuando se monta el componente
    dispatch(getDogs());
    dispatch(getTemperamentsList());
    dispatch(getBreeds());
  }, [dispatch]);

  // Manejar el clic en el botón de "Refrescar" para obtener la lista completa de perros
  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
  }
  
  // Manejar el cambio en la selección de ordenar por nombre
  function handleClickOrder(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
  }
  
  // Manejar el cambio en la selección de ordenar por peso
  function handleClickOrderWeight(e) {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
  }
  
  // Manejar el cambio en la selección de filtrar por origen (creados por el usuario o en la base de datos)
  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
  }
  
  // Manejar el cambio en la selección de filtrar por temperamento
  function handleFilteredByTemp(e) {
    e.preventDefault();
    dispatch(filterDogsByTemperament(e.target.value));
  }
  
  // Manejar el cambio en la selección de filtrar por raza
  function handleFilteredByBreed(e) {
    e.preventDefault();
    dispatch(getDogsByBreed(e.target.value));
  }
  
  // Manejar el cambio en la selección de filtrar por peso máximo
  function handleFilteredMAXWeight(e) {
    e.preventDefault();
    dispatch(filterDogsByMAXWeight(e.target.value));
  }
  
  // Manejar el cambio en la selección de filtrar por peso mínimo
  function handleFilteredMINWeight(e) {
    e.preventDefault();
    dispatch(filterDogsByMINWeight(e.target.value));
  }
  
  return (
    <Fragment>
      <div className={styles.side}>
        <div className={styles.sideBarHeader}>
          <h4 className={styles.header}> Find by filters:</h4>
          {/* Botón de "Refrescar" para obtener la lista completa de perros */}
          <div
            className={styles.tooltip}
            onClick={(e) => {
              handleClick(e);
            }}
          >
            <span className="material-icons refresh">loop</span>
          </div>
        </div>
        <hr />
        {/* Opciones de filtrado y ordenado */}
        <div className={styles.filterSection}>
          <h5 className={styles.filterHeader}>Order by name</h5>
          <select
            onChange={(e) => {
              handleClickOrder(e);
            }}
          >
            <option defaultValue value="all" hidden>
              Order
            </option>
            <option value="asc">A - Z</option>
            <option value="desc">Z - A</option>
          </select>
        </div>
        <div className={styles.filterSection}>
          <h5 className={styles.filterHeader}>Order by weight</h5>
          <select
            onChange={(e) => {
              handleClickOrderWeight(e);
            }}
          >
            <option defaultValue value="all" hidden>
              Order
            </option>
            <option value="asc">Heaviest 1º</option>
            <option value="desc">Lightest 1º</option>
          </select>
        </div>
        <div className={styles.filterSection}>
          <h5 className={styles.filterHeader}>Filter by source</h5>
          <select
            onChange={(e) => {
              handleFilterCreated(e);
            }}
          >
            <option defaultValue value="all">
              All Sources 🐶
            </option>
            <option value="created">Yours 🐶</option>
            <option value="inDB">dbase 🐶</option>
          </select>
        </div>
        <div className={styles.filterSection}>
          <h5 className={styles.filterHeader}>Filter by temperament</h5>
          <select onChange={(e) => handleFilteredByTemp(e)}>
            <option value="all">All Temperaments</option>
            {temperaments.map((temp) => {
              return (
                <option value={temp} key={temp}>
                  {temp}
                </option>
              );
            })}
          </select>
        </div>
        <div className={styles.filterSection}>
          <h5 className={styles.filterHeader}>Filter by breed</h5>
          <select onChange={(e) => handleFilteredByBreed(e)}>
            <option value="all">All Breeds</option>
            {breeds.map((breed) => {
              return breed ? (
                <option value={breed} key={breed}>
                  {breed}
                </option>
              ) : (
                ""
              );
            })}
          </select>
        </div>
        <div className={styles.filterSection}>
          <h5 className={styles.filterHeader}>Filter by max weight</h5>
          <select onChange={(e) => handleFilteredMAXWeight(e)}>
            <option value="all">All Weights</option>
            {allDogsMaxWeights.map((maxWeight) => {
              return maxWeight ? (
                <option value={maxWeight} key={maxWeight}>
                  {maxWeight} kg
                </option>
              ) : (
                ""
              );
            })}
          </select>
        </div>
        <div className={styles.filterSection}>
          <h5 className={styles.filterHeader}>Filter by min weight</h5>
          <select onChange={(e) => handleFilteredMINWeight(e)}>
            <option value="all">All Weights</option>
            {allDogsMinWeights.map((minWeight) => {
              return minWeight ? (
                <option value={minWeight} key={minWeight}>
                  {minWeight} kg
                </option>
              ) : (
                ""
              );
            })}
          </select>
        </div>
        {/* Botón para agregar un nuevo perro */}
        <div className={styles.filterSection}>
          <h5 className={styles.filterHeader}>Add a Woof</h5>
          <div className={styles.addDog}>
            <Link to="/newDog/" className={styles.tooltip}>
              <span className="material-icons">add_circle</span>
              <span className={styles.tooltiptext}>Add your Woof 🐕🐕🐕🐕</span>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
