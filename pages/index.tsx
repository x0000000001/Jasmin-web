import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import "../components/JasminInterpreter";
import JasminInterpreter from "../components/JasminInterpreter";

export default function Home() {
  return (
    <div className={styles.container}>
      <nav></nav>{" "}
      <div className="container text-center">
        <div className="row align-items-start">
          <div className="col">
            <div
              className={`container ${styles.general_column} ${styles.text_column}`}
            >
              <div className={styles.jasmin_title}>Jasmin</div>
            </div>
          </div>
          <div className="col">
            <div
              className={`container ${styles.general_column} ${styles.code_column}`}
            >
              <JasminInterpreter default_code="Here a Jasmin interpreter"></JasminInterpreter>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
