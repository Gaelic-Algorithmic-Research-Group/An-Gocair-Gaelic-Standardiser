import React from "react";
import Footer from "./footer";
import Header from "./header";
import SocialShare from "./social-share";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div id="main_container" className="font-sans antialiased text-gray-900">
      <Header />
      <SocialShare />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
