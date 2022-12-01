//nextjs.org/docs/basic-features/layouts

import Navbar from "./Navbar";
import Footer from "./Footer";
import React from "react";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
