import Script from "next/script";
import InterpreterButton from "./InterpreterButton";
import InterpreterTextField from "./InterpreterTextField";
import styles from "./JasminInterpreter.module.css";
import { useState } from "react";
import Divider from "@mui/joy/Divider";

export default function JasminInterpreter({
  default_code,
  isUserLoggedIn = false,
}) {
  const cleanHtmlText = (intrinsicsText) => {
    let lines = intrinsicsText
      .replace("<ul>", "")
      .replace("</ul>", "")
      .split("<li>")
      .join("\n")
      // FIXME it doesn't remove </li>... why ?
      .replace("</li>", "")
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
    console.log("intrinsics");
  };

  const handleLoad = () => {
    let codeField = document.getElementsByName("input")[0];
    let result = jasmini.load(codeField.value);
    console.log("loaded functions");
    document.getElementsByName("output")[0].value = result;
  };

  const handleCT = () => {
    let result = jasmini.checkCT();
    console.log("checked CT");
    document.getElementsByName("output")[0].value = result.sigs;
  };

  const handleReset = () => {
    document.getElementsByName("output")[0].value = "";
    jasmini.clear();
    console.log("reset");
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

      {isUserLoggedIn ? (
        <div className={`row align-items-start ${styles.box}`}>
          <div className="col">
            <InterpreterTextField
              name="input"
              default_code={default_code}
              disabled={false}
              placeHolder={codePlaceHolder}
              minRows={12}
              maxRows={12}
            ></InterpreterTextField>
          </div>
          <div className="col"></div>
        </div>
      ) : (
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
      )}

      <Divider />

      <div className={`row align-items-start ${styles.box}`}>
        <InterpreterTextField
          name="evalinput"
          placeHolder={evalPlaceHolder}
          disabled={false}
          minRows={4}
          maxRows={4}
        ></InterpreterTextField>
      </div>

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
