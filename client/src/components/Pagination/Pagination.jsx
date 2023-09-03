import React, { Fragment } from "react";
import Logo from "../../assets/favicon-32x32.png";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

export default function NavBar() {
  return (
    <Fragment>
      {/* La barra de navegación principal */}
      <div className={styles.nav}>
        <div className={styles.TitleAndSearchBar}>
          {/* Sección de logo y título */}
          <div className={styles.logoAndTitle}>
            <Link to="/home">
              {/* El logo de Woof */}
              <img
                id="logoHenry"
                src={Logo}
                alt="a happy dog icon"
                className={styles.logo}
              />
            </Link>
            <div>
              {/* El título del sitio */}
              <h1>Woof</h1>
              <p>The dog's page</p>
            </div>
          </div>
          <div>
            {/* La barra de búsqueda */}
            <SearchBar />
          </div>
        </div>
        <div className={styles.aboutNavButton}>
          {/* Enlace a la página "About" */}
          <Link to="/about">About</Link>
        </div>
      </div>
    </Fragment>
  );
}
