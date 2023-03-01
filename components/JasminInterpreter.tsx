import Head from "next/head";
import Script from "next/script";
import styles from "./JasminInterpreter.module.css";
import "./InterpreterButton";
import InterpreterButton from "./InterpreterButton";

type Props = { default_code: string };

const handleClick = () => {
  console.log("hello you clicked me");
};

export default function JasminInterpreter({ default_code }: Props) {
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
            field.innerHTML = jasmini.intrinsics(true);
          }
        }}
      />

      <div className="row align-items-start">
        <div className="col">
          <div className={`container`}>
            <textarea id="input"></textarea>
          </div>
        </div>

        <div className="col">
          <div className="row align-items-start">
            <div className={`container`}>
              {/* <button type="button" onClick={handleClick}>
                Load
              </button> */}
              <InterpreterButton name="Load" onClick={handleClick} />
            </div>
          </div>
          <div className="row align-items-start">
            <div className={`container`}>
              <button type="button" onClick={handleClick}>
                CT?
              </button>
            </div>
          </div>
          <div className="row align-items-start">
            <div className={`container`}>
              <button type="button" onClick={handleClick}>
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row align-items-start">
        <div className="col">
          <div className={`container`}>
            <textarea id="evalinput"></textarea>
          </div>
        </div>

        <div className="col">
          <div className={`container`}>
            <button type="button" onClick={handleClick}>
              Exec
            </button>
          </div>
        </div>

        <div className="col">
          <div className={`container`}>
            <div id="instrinsics-input"></div>
          </div>
        </div>
      </div>
    </>
  );
}
