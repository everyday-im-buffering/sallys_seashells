import "./App.css";
import React from "react";
import Menus from "./components/NonPages/Menus";
import Routes from "./Routes";
import GlobalCSS from './global.css'

function App() {
  return (
    <div>
      <Menus />
      <Routes />
    </div>
  );
}

export default App;
