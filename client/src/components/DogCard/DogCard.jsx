import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styles from "./DogCard.module.css";

export default function DogCard({ id, name, image, temperament, temperaments }) {
  if (!temperaments) {
    // Si no hay temperamentos disponibles
    return (
      <Fragment>
        <div className={styles.dogCard}>
          {/* Enlace a la página de detalles del perro */}
          <Link to={"/dogs/" + id}>
            <div className={styles.titleArea}>
              <h4 className={styles.dogName}>{name}</h4>
            </div>
            <div className={styles.infoArea}>
              <div className={styles.tempArea}>
                {temperament ? (
                  // Muestra el temperamento si está disponible
                  <h5 className={styles.dogTemp}>{temperament}</h5>
                ) : (
                  // Muestra un salto de línea si no hay temperamento
                  <br />
                )}
              </div>
              <div className={styles.imageArea}>
                {/* Imagen del perro */}
                <img
                  className={styles.dogImage}
                  src={image}
                  alt={`A dog which is ${temperament}`}
                  height="140px"
                />
              </div>
            </div>
          </Link>
        </div>
      </Fragment>
    );
  } else {
    // Si hay temperamentos disponibles
    return (
      <Fragment>
        <div className={styles.dogCard}>
          {/* Enlace a la página de detalles del perro */}
          <Link to={"/dogs/" + id}>
            <div className={styles.titleArea}>
              <h4 className={styles.dogName}>{name}</h4>
            </div>
            <div className={styles.infoArea}>
              <div className={styles.tempArea}>
                {temperaments ? (
                  // Muestra los temperamentos si están disponibles
                  <h5 className={styles.dogTemp}>
                    {temperaments.map((temp) => `${temp.name} `).join(', ')}
                  </h5>
                ) : (
                  // Muestra un salto de línea si no hay temperamentos
                  <br />
                )}
              </div>
              <div className={styles.imageArea}>
                {/* Imagen del perro */}
                <img
                  className={styles.dogImage}
                  src={image}
                  alt={`A dog`}
                  height="140px"
                />
              </div>
            </div>
          </Link>
        </div>
      </Fragment>
    );
  }
}
