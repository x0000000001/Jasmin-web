import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { supabase } from "../utils/initSupabase";
import styles from "../styles/Home.module.css";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import JasminInterpreter from "../components/JasminInterpreter";

const SignedInWebPage = (session, supabase) => {
  return (
    <div>
      <JasminInterpreter default_code=""></JasminInterpreter>
    </div>
  );
};

export default function PrivateSpace({ countries }) {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <div className={styles.container}>
      <nav></nav>{" "}
      {session ? (
        SignedInWebPage(session, supabase)
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
  let { data } = await supabase.from("countries").select();

  return {
    props: {
      countries: data,
    },
  };
}
