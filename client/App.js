import React from "react";
import Home from "./components/Home"
import Navbar from "./components/NonPages/Navbar";
import Footer from "./components/NonPages/Footer";
import Routes from "./Routes";

const App = () => {
  return (
    <div>
      <Navbar />
      <Home />
      <Routes />
      <Footer />
    </div>
  );
};

export default App;
