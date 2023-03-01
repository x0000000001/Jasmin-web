import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import "../components/JasminInterpreter";
import JasminInterpreter from "../components/JasminInterpreter";

export default function What_is_jasmin() {
  return (
    <div className={styles.container}>
      <nav>
        <div className="container text-center">
          <div className="row align-items-start">
            <div
              className={`container ${styles.general_column} ${styles.text_column}`}
            >
              Jasmin est un langage de programmation bas niveau, orienté pour la
              cryptographie. Objectifs :
            </div>
          </div>
        </div>
      </nav>{" "}
    </div>
  );
}
