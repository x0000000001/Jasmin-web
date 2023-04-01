import styles from "../styles/Home.module.css";
import "../components/JasminInterpreter";
import JasminInterpreter from "../components/JasminInterpreter";
import { useEffect, useState } from "react";
import CodesAccordion from "@/components/CodesAccordion";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Home() {
  const session = useSession();
  const supabase = useSupabaseClient();

  const [publicCodes, setPublicCodes] = useState([]);

  useEffect(() => {
    getProps();
  }, [session]);

  const getProps = async () => {
    try {
      if (!session) return;

      const { data: publicData, error: publicError } = await supabase
        .from("codes")
        .select(`*, profiles (username)`)
        .eq("is_public", true);
      if (publicError) throw publicError;
      if (publicData) setPublicCodes(publicData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoadCode = (codeObj) => {
    document.getElementsByName("input")[0].value = codeObj.code;
  };

  return (
    <div className={styles.container}>
      <nav></nav>
      <div className="container text-center">
        <div className="row align-items-start">
          <div className={`col`}>
            <div
              className={`container ${styles.general_column} ${styles.text_column}`}
            >
              <div className={`row align-items-start ${styles.row0index}`}>
                <div className={styles.jasmin_title}>Jasmin</div>
                <div className={styles.jasmin_subtitle}>
                  High-<b>speed</b>, <br />
                  High-<b>assurance</b> <br />
                  cryptographic language.
                </div>
              </div>

              <div className={`row align-items-start ${styles.row1index}`}>
                <CodesAccordion
                  codes={publicCodes}
                  handleLoadCode={handleLoadCode}
                />
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
