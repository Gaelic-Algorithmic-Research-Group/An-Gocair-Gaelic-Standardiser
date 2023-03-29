import React from "react";
import Footer from "./footer";
import Header from "./header";
import SocialShare from "./social-share";
import NavigationLinks from "./navigation-links";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div id="main_container" className="font-sans antialiased text-gray-900">
      <Header />
      <SocialShare />
      <NavigationLinks />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
