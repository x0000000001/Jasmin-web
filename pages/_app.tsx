import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css"; // enables bootstraps classes globally
// import "bootstrap/dist/js/bootstrap.bundle.min.js"; // remove if errors (used for animations)
import type { AppProps } from "next/app";
import Layout from "../components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
