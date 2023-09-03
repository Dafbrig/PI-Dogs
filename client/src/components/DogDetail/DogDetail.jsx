import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteDetails, getDetails } from "../../redux/actions/index";
import styles from "./DogDetail.module.css";
import tinyDog from "../../assets/dog.svg";
import heart from "../../assets/heart.svg";
import scale from "../../assets/scale.svg";
import bone from "../../assets/bones.svg";

export default function DogDetail(props) {
  const dispatch = useDispatch();

  // Cuando el componente se monta, se llama a la acción getDetails para obtener los detalles del perro
  useEffect(() => {
    dispatch(getDetails(props.match.params.id));

    // Cuando el componente se desmonta (por ejemplo, al cambiar de página), se llama a la acción deleteDetails para limpiar los detalles del perro en el estado
    return () => dispatch(deleteDetails());
  }, [dispatch, props.match.params.id]);

  // Seleccionar los detalles del perro del estado
  const myDog = useSelector((state) => state.details);

  return (
    <Fragment>
      {myDog ? (
        <div key={myDog.id} className={styles.bodix}>
          <div className={styles.mainContainer}>
            <h2 className={styles.mainTitle}>{myDog.name}</h2>
            <img src={myDog.image} alt={myDog.name} className={styles.image} />
            <div className={styles.detailsContainer}>
              {myDog.breed_group ? (
                <div className={styles.breed_group}>
                  <div className={styles.imageSection}>
                    <img
                      src={tinyDog}
                      alt="a tiny svg dog"
                      className={styles.detailsSVG}
                    />
                  </div>
                  <div className={styles.infoSection}>
                    <h3>Breed group: </h3>
                    <p>{myDog.breed_group}</p>
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className={styles.life_span}>
                <div className={styles.imageSection}>
                  <img
                    src={heart}
                    alt="a tiny svg dog"
                    className={styles.detailsSVG}
                  />
                </div>
                <div className={styles.infoSection}>
                  <h3>Life span: </h3>
                  <p>{myDog.life_span}</p>
                </div>
              </div>
              <div className={styles.weights}>
                <div className={styles.imageSection}>
                  <img
                    src={scale}
                    alt="a tiny svg dog"
                    className={styles.detailsSVG}
                  />
                </div>
                <div className={styles.infoSection}>
                  <h3>Weight: </h3>
                  <p>Min: {myDog.weight_min}</p>
                  <p>Max: {myDog.weight_max}</p>
                </div>
              </div>
              <div className={styles.heights}>
                <div className={styles.imageSection}>
                  <img
                    src={bone}
                    alt="a tiny svg bone"
                    className={styles.detailsSVG}
                  />
                </div>
                <div className={styles.infoSection}>
                  <h3>Height: </h3>
                  <p>Min: {myDog.height_min}</p>
                  <p>Max: {myDog.height_max}</p>
                </div>
              </div>
              <br />
              <div className={styles.temperament}>
                <div className={styles.infoSection}>
                  {
                    <div>
                      <h3>Temperament: </h3>
                      <p>
                        {myDog.createdInDB
                          ? myDog.temperaments.map((el) => el.name).join(", ")
                          : myDog.temperament}
                      </p>
                    </div>
                  }
                </div>
              </div>
            </div>
            <Link to="/home">
              <button className={styles.button}>Back</button>
            </Link>
          </div>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </Fragment>
  );
}
