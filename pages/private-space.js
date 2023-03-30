import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { supabase } from "../utils/initSupabase";
import styles from "../styles/Home.module.css";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import JasminInterpreter from "../components/JasminInterpreter";
import CodesAccordion from "@/components/CodesAccordion";
import { useState } from "react";

const SignedInWebPage = (publicCodes, privateCodes) => {
  const handleLoadCode = (code) => {
    document.getElementsByName("input")[0].value = code;
    console.log("loaded code");
  };

  return (
    <div>
      <nav></nav>
      <div className="container-fluid text-center">
        <div className="row align-items-start">
          <div className="col">
            <div
              className={`container ${styles.general_column} ${styles.text_column}`}
            >
              <div className="row align-items-start">
                <CodesAccordion
                  title="Your codes"
                  codes={privateCodes}
                  handleLoadCode={handleLoadCode}
                ></CodesAccordion>
              </div>
              <div className="row align-items-start">
                <CodesAccordion
                  title="Public codes"
                  codes={publicCodes}
                  handleLoadCode={handleLoadCode}
                ></CodesAccordion>
              </div>
            </div>
          </div>
          <div className="col">
            <div
              className={`container ${styles.general_column} ${styles.code_column}`}
            >
              <JasminInterpreter isUserLoggedIn={true}></JasminInterpreter>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function PrivateSpace({ publicCodes, privateCodes }) {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <div className={styles.container}>
      <nav></nav>{" "}
      {session ? (
        SignedInWebPage(publicCodes, privateCodes)
      ) : (
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={[]}
        />
      )}
    </div>
  );
}

export async function getServerSideProps() {
  let { data } = await supabase.from("codes").select();

  return {
    props: {
      publicCodes: data,
      privateCodes: [],
    },
  };
}
