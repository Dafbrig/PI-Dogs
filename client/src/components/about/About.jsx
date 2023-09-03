import { Fragment } from "react";
import NavBar from "../NavBar/NavBar";
import styles from "./About.module.css";
import myPhoto from "../../assets/IMG_20210403_180842635_HDR.jpg";

export default function About() {
  return (
    <Fragment>
      <NavBar />
      <div className={styles.mainConteinerAbout}>
        <div className={styles.imageDiv}>
          <img src={myPhoto} alt="A man at the Ocean edge" />
        </div>
        <h6>Developed by: David Briceño</h6>
        <h6>
          Full Stack Developer
        </h6>
        <br />
        <p>
          I’m a Full Stack  developer who’s in love with coding and computer systems.
        </p>
        <br />
        <p>
        I started learning programming in 2017, to be more precise at the beginning of my student life at the university (ITM), 
        where I have learned different things in the area of ​​programming.
        </p>
        <br />
        <p>Skills: CSS, HTML, PHP, JavaScript, SQL, React.js, C#, Angular, etc</p>
        <br />
        <p>I define myself as lifetime learner.</p>

        <p>Soft skills: reliable, respectful and problem-solving oriented.</p>
        <p>If you have a project I can help with, please get in touch.</p>
        <br />
        <div className={styles.links}>
          <h6>Contact me:</h6>
          <div className={styles.linksItems}>
            <p>
              <a href="https://github.com/Dafbrig" target='_blank' rel="noreferrer">GitHub</a>
            </p>
            <p>
              <a href="https://www.linkedin.com/in/dafbrig/" target='_blank' rel="noreferrer">
                LinkedIn
              </a>
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
