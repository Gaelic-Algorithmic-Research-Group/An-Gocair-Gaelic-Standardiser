import React from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <nav>
        <Header />
      </nav>
      <div>
        <main>{children}</main>
      </div>

      <Footer />
    </div>
  );
}
