import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
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
import InterpreterTextField from "@/components/InterpreterTextField";
import InterpreterButton from "@/components/InterpreterButton";

export default function PrivateSpace() {
  const session = useSession();
  const supabase = useSupabaseClient();

  const [publicCodes, setPublicCodes] = useState([]);
  const [privateCodes, setPrivateCodes] = useState([]);
  const [userData, setUserData] = useState(null);
  const [userNameFieldString, setUserNameFieldString] = useState(
    userData ? userData.username : ""
  );

  useEffect(() => {
    getProps();
    getUserData();
  }, [session]);

  const getUserData = async () => {
    if (!session) return;
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id);

    if (error) {
      console.log(error);
      return;
    }

    setUserData(data[0]);
    setUserNameFieldString(data[0].username);
  };

  const getProps = async () => {
    try {
      if (!session) return;

      const { data: publicData, error: publicError } = await supabase
        .from("codes")
        .select(`*, profiles (username)`)
        .eq("is_public", true);
      if (publicError) throw publicError;
      if (publicData) setPublicCodes(publicData);

      const { data: privateData, error: privateError } = await supabase
        .from("codes")
        .select(`*, profiles (username)`)
        .eq("user_id", session.user.id);
      if (privateError) throw privateError;
      if (privateData) setPrivateCodes(privateData);
    } catch (error) {
      console.log(error);
    }
  };

  // visually updates codes lists when the user changes a code
  const updateNewCode = (codeObj) => {
    let newPrivateCodes = structuredClone(privateCodes);
    let index = newPrivateCodes.findIndex(
      (code) => code.user_id == codeObj.user_id && code.title == codeObj.title
    );
    console.log(index);
    if (index != -1) {
      newPrivateCodes[index] = codeObj;
    } else {
      newPrivateCodes.push(codeObj);
    }
    setPrivateCodes(newPrivateCodes);

    let newPublicCodes = structuredClone(publicCodes);
    index = newPublicCodes.findIndex(
      (code) => code.user_id == codeObj.user_id && code.title == codeObj.title
    );
    if (index != -1) {
      if (codeObj.is_public) {
        newPublicCodes[index] = codeObj;
      } else {
        newPublicCodes.splice(index, 1);
      }
    } else if (codeObj.is_public) {
      newPublicCodes.push(codeObj);
    }
    setPublicCodes(newPublicCodes);
  };

  const updateDeletedCode = (title, user_id) => {
    let newPrivateCodes = structuredClone(privateCodes);
    let index = newPrivateCodes.findIndex(
      (code) => code.user_id == user_id && code.title == title
    );
    if (index != -1) {
      newPrivateCodes.splice(index, 1);
      setPrivateCodes(newPrivateCodes);
    }

    let newPublicCodes = structuredClone(publicCodes);
    index = newPublicCodes.findIndex(
      (code) => code.user_id == user_id && code.title == title
    );
    if (index != -1) {
      newPublicCodes.splice(index, 1);
      setPublicCodes(newPublicCodes);
    }
  };

  const handleLoadCode = (codeObj) => {
    document.getElementsByName("input")[0].value = codeObj.code;
    document.getElementsByName("saveName")[0].value = codeObj.title;
    document.getElementsByName("is_public")[0].checked = codeObj.is_public;
    console.log("loaded code");
  };

  const handleChangeName = () => {
    let newUsername = document.getElementsByName("username_field")[0].value;
    supabase
      .from("profiles")
      .update({ username: newUsername })
      .eq("id", session.user.id)
      .then((res) => {
        console.log(res);
        setUserData({ ...userData, username: newUsername });
      })
      .catch((err) => {
        console.log(err);
      });

    setUserNameFieldString(newUsername);
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
                <div className="row align-items-start">
                  <div className="col">
                    <InterpreterTextField
                      name="username_field"
                      default_code={userNameFieldString}
                      disabled={false}
                      minRows={1}
                      maxRows={11}
                    ></InterpreterTextField>
                  </div>
                  <div className="col">
                    <InterpreterButton
                      name="Change username"
                      onClick={handleChangeName}
                    ></InterpreterButton>
                  </div>
                </div>
                <div className="row align-items-start">
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
                          codes={privateCodes}
                          handleLoadCode={handleLoadCode}
                        ></CodesAccordion>
                      </TabPanel>
                      <TabPanel value={1} sx={{ p: 2 }}>
                        <CodesAccordion
                          codes={publicCodes}
                          handleLoadCode={handleLoadCode}
                        ></CodesAccordion>
                      </TabPanel>
                    </Tabs>
                  </div>
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
                    userData={userData}
                    privateCodes={privateCodes}
                    updateNewCode={updateNewCode}
                    updateDeletedCode={updateDeletedCode}
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
