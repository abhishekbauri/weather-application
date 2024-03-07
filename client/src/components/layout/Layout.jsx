/* eslint-disable react/prop-types */
import Footer from "./Footer";
import Header from "./Header";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main style={{ minHeight: "80vh" }} className="main-container">
        {children}
        <Toaster />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
