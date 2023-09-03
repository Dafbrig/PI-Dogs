import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import styles from '../LandingPage/LandingPage.module.css'

export default function LandingPage(){
    return(
        <Fragment>
            {/* La sección principal del componente */}
            <div className={styles.hero}>
                <h1 className={styles.title}>Welcome to Woof</h1>
                {/* El botón que redirige a la página de inicio */}
                <Link to='/home'>
                    <button className={styles.bubblyButton}>Let's Woof</button>
                </Link>
                {/* El video de fondo */}
                <video autoPlay muted loop className={styles.video_bg}>
                    {/* Fuente del video, asegúrate de que la ruta sea correcta */}
                    <source src="../movie.mp4" type="video/mp4"/>
                </video>
            </div>
        </Fragment>
    )
}
