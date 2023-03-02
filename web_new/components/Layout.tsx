import Footer from "@/components/Footer";

const Layout: React.FunctionComponent = (props) => (
  <div id="main_container" className="font-sans antialiased text-gray-900">
    <main>{props.children}</main>
    <Footer />
  </div>
);
