import React from "react";

import Navbar from "./components/NonPages/Navbar";
import Routes from "./Routes";
import Footer from "./components/NonPages/Footer";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <Footer />
    </div>
  );
};

export default App;
