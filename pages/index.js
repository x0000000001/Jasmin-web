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
              <div className={styles.jasmin_subtitle}>
                High-<b>speed</b>, <br />
                High-<b>assurance</b> <br />
                cryptographic language.
              </div>
            </div>
          </div>
          <div className="col">
            <div
              className={`container ${styles.general_column} ${styles.code_column}`}
            >
              <JasminInterpreter />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
