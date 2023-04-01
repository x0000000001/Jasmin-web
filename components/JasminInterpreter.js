import Script from "next/script";
import InterpreterButton from "./InterpreterButton";
import InterpreterTextField from "./InterpreterTextField";
import styles from "./JasminInterpreter.module.css";
import Divider from "@mui/joy/Divider";
import Checkbox from "@mui/joy/Checkbox";

export default function JasminInterpreter({
  default_code,
  viewSaveTab = false,
  session = null,
  supabase = null,
  userData = null,
  privateCodes = [],
  updateNewCode = null,
  updateDeletedCode = null,
}) {
  const isThereACodeWithName = (title) => {
    return privateCodes.filter((code) => code.title == title).length > 0;
  };

  const cleanHtmlText = (intrinsicsText) => {
    let lines = intrinsicsText
      .replaceAll("</li>", "")
      .replaceAll("<ul>", "")
      .replaceAll("</ul>", "")
      .split("<li>")
      .join("\n")
      .split("\n");
    let cleanLines = lines.filter((line) => {
      return line.length > 0;
    });

    return cleanLines.join("\n");
  };

  const handleExec = () => {
    let execField = document.getElementsByName("evalinput")[0];
    let result = jasmini.exec(execField.value);
    document.getElementsByName("output")[0].value = cleanHtmlText(result);
  };

  const handleViewIntrinsics = () => {
    let intrinsicsText = cleanHtmlText(jasmini.intrinsics(true));
    let output = document.getElementsByName("output")[0];
    output.value = intrinsicsText;
  };

  const handleLoad = () => {
    let codeField = document.getElementsByName("input")[0];
    let result = jasmini.load(codeField.value);
    document.getElementsByName("output")[0].value = result;
  };

  const handleCT = () => {
    let result = jasmini.checkCT();
    let text = cleanHtmlText(result.sigs.c);
    document.getElementsByName("output")[0].value = text;
  };

  const handleReset = () => {
    document.getElementsByName("output")[0].value = "";
    jasmini.clear();
  };

  const handleSave = async () => {
    try {
      const code = document.getElementsByName("input")[0].value;
      const saveName = document.getElementsByName("saveName")[0].value;
      const is_public = document.getElementsByName("is_public")[0].checked;

      if (saveName.length == 0) {
        alert("Please enter a name for your code");
        return;
      }

      let codeObj = {
        title: saveName,
        code: code,
        user_id: session.user.id,
        is_public: is_public,
      };

      if (isThereACodeWithName(saveName)) {
        if (
          !confirm(
            "There is already a code with this name, do you want to overwrite it ?"
          )
        ) {
          return;
        } else {
          const { error } = await supabase
            .from("codes")
            .update(codeObj)
            .eq("title", saveName)
            .eq("user_id", session.user.id);
          if (error) throw error;
        }
      } else {
        let { error } = await supabase.from("codes").upsert(codeObj);
        if (error) throw error;
      }

      codeObj = {
        ...codeObj,
        profiles: {
          username: userData.username,
        },
      };
      updateNewCode(codeObj);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async () => {
    if (!session) return;

    try {
      const saveName = document.getElementsByName("saveName")[0].value;

      if (!isThereACodeWithName(saveName)) {
        alert("There is no code with this name on the database.");
        return;
      } else {
        if (confirm("This code's data will be lost forever, are you sure ?")) {
          await supabase
            .from("codes")
            .delete()
            .match({ title: saveName, user_id: session.user.id });
          updateDeletedCode(saveName, session.user.id);
        }
      }
    } catch (error) {
      alert(error.message);
    }
  };

  let codePlaceHolder = "export\nfn add(reg u64 x, reg u64 y) -> u64 \n{   ...";

  let evalPlaceHolder = "eval your code here : add(1, 2) ...";

  return (
    <>
      {/* https://dave.dev/blog/2022/08/04-08-2022-react_ix_js/ */}
      <Script
        src="scripts/web.bc.js"
        onLoad={() => {
          console.log("jasmin loaded");
        }}
      />
      <div className={`row align-items-start ${styles.box}`}>
        <InterpreterTextField
          name="input"
          default_code={default_code}
          disabled={false}
          placeHolder={codePlaceHolder}
          minRows={12}
          maxRows={12}
        ></InterpreterTextField>
      </div>

      <Divider />

      {viewSaveTab ? (
        <div className={`row align-items-start ${styles.box}`}>
          <div className="col">
            <InterpreterTextField
              name="evalinput"
              placeHolder={evalPlaceHolder}
              disabled={false}
              minRows={4}
              maxRows={4}
            ></InterpreterTextField>
          </div>
          <div className="col">
            <div className={`row align-items-start ${styles.box}`}>
              <InterpreterTextField
                name="saveName"
                placeHolder="name your code here"
                disabled={false}
                minRows={1}
                maxRows={1}
              ></InterpreterTextField>
            </div>
            <div className={`row align-items-start`}>
              <div className="col">
                <Checkbox
                  label="Public"
                  name="is_public"
                  variant="soft"
                  className={`${styles.button}`}
                />
              </div>
              <div className="col">
                <InterpreterButton
                  name="Save"
                  onClick={handleSave}
                ></InterpreterButton>
              </div>
              <div className="col">
                <InterpreterButton
                  name="Delete"
                  onClick={handleDelete}
                ></InterpreterButton>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={`row align-items-start ${styles.box}`}>
          <InterpreterTextField
            name="evalinput"
            placeHolder={evalPlaceHolder}
            disabled={false}
            minRows={4}
            maxRows={4}
          ></InterpreterTextField>
        </div>
      )}
      <Divider />

      <div className="row align-items-start">
        <div className="col">
          <InterpreterButton name="Load" onClick={handleLoad} />
        </div>
        <div className="col">
          <InterpreterButton name="CT ?" onClick={handleCT} />
        </div>
        <div className="col">
          <InterpreterButton name="Reset" onClick={handleReset} />
        </div>
        <div className="col">
          <InterpreterButton name="Exec" onClick={handleExec} />
        </div>
        <div className="col">
          <InterpreterButton name="Intrinsics" onClick={handleViewIntrinsics} />
        </div>
      </div>

      <Divider />

      <div className={`row align-items-start ${styles.box}`}>
        <InterpreterTextField
          name="output"
          disabled={false}
          minRows={7}
          maxRows={7}
        ></InterpreterTextField>
      </div>
    </>
  );
}
