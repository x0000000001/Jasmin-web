import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { supabase } from "../utils/initSupabase";
import styles from "../styles/Home.module.css";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import JasminInterpreter from "../components/JasminInterpreter";
import CodesAccordion from "@/components/CodesAccordion";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import { useEffect, useState } from "react";

export default function PrivateSpace() {
  const session = useSession();
  const supabase = useSupabaseClient();

  const [publicCodes, setPublicCodes] = useState([]);
  const [privateCodes, setPrivateCodes] = useState([]);

  useEffect(() => {
    getServerSideProps();
  }, [session]);

  const getServerSideProps = async () => {
    if (!session) return;

    try {
      let { data, error } = await supabase.from("codes").select("*");
      if (error) throw error;

      if (data) setPublicCodes(data);

      // let { data, error } = await supabase
      //   .from("codes")
      //   .select("*")
      //   .eq("user_id", session.user.id);
      // if (error) throw error;

      // setPrivateCodes(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoadCode = (code, name, is_public) => {
    document.getElementsByName("input")[0].value = code;
    document.getElementsByName("saveName")[0].value = name;
    document.getElementsByName("is_public")[0].checked = is_public;
    console.log("loaded code");
  };

  return (
    <div className={styles.container}>
      <nav></nav>{" "}
      {session ? (
        <div>
          <nav></nav>
          <div className="container-fluid text-center">
            <div className="row align-items-start">
              <div className="col">
                <div className={`container ${styles.general_column}`}>
                  <Tabs
                    defaultValue={0}
                    aria-label="Basic tabs"
                    sx={{ borderRadius: "lg" }}
                  >
                    <TabList>
                      <Tab>
                        <h1 className={styles.codes_section_title}>
                          Your codes
                        </h1>
                      </Tab>
                      <Tab>
                        <h1 className={styles.codes_section_title}>
                          Public codes
                        </h1>
                      </Tab>
                    </TabList>

                    <TabPanel value={0} sx={{ p: 2 }}>
                      <CodesAccordion
                        codes={publicCodes}
                        handleLoadCode={handleLoadCode}
                      ></CodesAccordion>
                    </TabPanel>
                    <TabPanel value={1} sx={{ p: 2 }}>
                      <CodesAccordion
                        codes={privateCodes}
                        handleLoadCode={handleLoadCode}
                      ></CodesAccordion>
                    </TabPanel>
                  </Tabs>
                </div>
              </div>
              <div className="col">
                <div
                  className={`container ${styles.general_column} ${styles.code_column}`}
                >
                  <JasminInterpreter
                    viewSaveTab={true}
                    session={session}
                    supabase={supabase}
                  ></JasminInterpreter>
                </div>
              </div>
            </div>
          </div>
        </div>
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
