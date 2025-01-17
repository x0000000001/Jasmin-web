import styles from "../styles/Home.module.css";
import "../components/JasminInterpreter";
import Divider from "@mui/joy/Divider";

export default function About() {
  return (
    <div className={styles.container}>
      <nav></nav>
      <div className={`container text-center ${styles.about_container}`}>
        <div className={`${styles.divider}`}>
          <Divider />
        </div>
        <div className={styles.about_title}>Links</div>
        <br />
        <a
          href="https://github.com/jasmin-lang/jasmin/wiki/Installation-instructions"
          className={`${styles.hlink}`}
          target="_blank"
          rel="noreferrer"
        >
          Wiki - learn the basics{" "}
        </a>
        <br />
        <br />
        <a
          href="https://github.com/jasmin-lang/jasmin"
          className={`${styles.hlink}`}
          target="_blank"
          rel="noreferrer"
        >
          Jasmin official repository{" "}
        </a>
        <br />
        <br />
        <a
          href="https://dl.acm.org/doi/10.1145/3133956.3134078"
          className={`${styles.hlink}`}
          target="_blank"
          rel="noreferrer"
        >
          Jasmin paper{" "}
        </a>
        <br />
        <br />
        <a
          href="https://formosa-crypto.gitlab.io/"
          className={`${styles.hlink}`}
          target="_blank"
          rel="noreferrer"
        >
          Come chat with the Jasmin team here{" "}
        </a>
        <div className={`${styles.divider}`}>
          <Divider />
        </div>
        <div className={styles.about_title}>
          Who am I ? What is this website ?
        </div>
        <br />I am a french engineering student in{" "}
        <a
          href="https://mines-nancy.univ-lorraine.fr/"
          target="_blank"
          rel="noreferrer"
        >
          Mines Nancy
        </a>
        , and this is the result of a web project for my school. <br />
        If you want to know more about my cool projects, check out my{" "}
        <a
          href="https://github.com/Antoine-Toussaint"
          target="_blank"
          rel="noreferrer"
        >
          github
        </a>{" "}
        .
        <div className={`${styles.divider}`}>
          <Divider />
        </div>
        <div className={styles.about_title}>Credits</div>
        <br />
        Thank you{" "}
        <a
          href="https://members.loria.fr/VLaporte/"
          target="_blank"
          rel="noreferrer"
        >
          Vincent Laporte
        </a>{" "}
        for the Jasmin JavaScript interface !
      </div>
    </div>
  );
}
