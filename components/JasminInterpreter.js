import Script from "next/script";
import "./InterpreterButton";
import InterpreterButton from "./InterpreterButton";
import InterpreterTextField from "./InterpreterTextField";
import { useState } from "react";

export default function JasminInterpreter({ default_code }) {
  const handleExec = () => {
    let execField = document.getElementById("evalinput");
    let result = jasmini.exec(execField.value);
    document.getElementById("output").innerHTML = result;
  };

  const handleViewIntrinsics = () => {
    let outputField = document.getElementById("output");
    outputField.innerHTML = jasmini.intrinsics(true);
  };

  const handleLoad = () => {
    let codeField = document.getElementById("input");
    let result = jasmini.load(codeField.value);
    console.log("loaded functions");
    document.getElementById("output").value = result;
  };

  const handleCT = () => {
    let result = jasmini.checkCT();
    console.log("checked CT");
    document.getElementById("output").value = result.sigs;
  };

  const handleReset = () => {
    document.getElementById("output").value = "";
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
          let field = document.getElementById("instrinsics-input");
          if (field != null) {
            console.log(jasmini.intrinsics(true));
            // field.innerHTML = jasmini.intrinsics(true);
          }
        }}
      />

      <div className="row align-items-start">
        <InterpreterTextField
          id="input"
          default_code={default_code}
          disabled={false}
          placeHolder={codePlaceHolder}
          minRows={12}
        ></InterpreterTextField>
      </div>

      <div className="row align-items-start">
        <InterpreterTextField
          id="evalinput"
          placeHolder={evalPlaceHolder}
          disabled={false}
        ></InterpreterTextField>
      </div>

      <div className="row align-items-start">
        <div className="col">
          <div className={`container`}>
            <InterpreterButton name="Load" onClick={handleLoad} />
          </div>
        </div>
        <div className="col">
          <div className={`container`}>
            <InterpreterButton name="CT ?" onClick={handleCT} />
          </div>
        </div>
        <div className="col">
          <div className={`container`}>
            <InterpreterButton name="Reset" onClick={handleReset} />
          </div>
        </div>
        <div className="col">
          <div className={`container`}>
            <InterpreterButton name="Exec" onClick={handleExec} />
          </div>
        </div>
      </div>

      <div className="row align-items-start">
        <div className={`container`}>
          <InterpreterTextField
            id="output"
            disabled={true}
            minRows={8}
          ></InterpreterTextField>
        </div>
      </div>
    </>
  );
}
