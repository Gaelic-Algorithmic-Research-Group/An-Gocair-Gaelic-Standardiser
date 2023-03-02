import Footer from "@/components/Footer";
import React from "react";

//  the below is necessary because the FunctionalComponent interface has changed in React>=18
interface Props {
  children: React.ReactNode;
}

const Layout: React.FunctionComponent<Props> = (props) => (
  <div id="main_container" className="font-sans antialiased text-gray-900">
    <main>{props.children}</main>
    <Footer />
  </div>
);

export default Layout;
