import React from "react";
import Footer from "./footer";
import Header from "./header";
import SocialShare from "./social-share";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <SocialShare />
      <main>{children}</main>
      <Footer />
    </>
  );
}
