import "./App.css";
import React from "react";
import Menus from "./components/NonPages/Menus";
import Routes from "./Routes";
import GlobalStyle from './global.css'

function App() {
  return (
    <div>
      <GlobalStyle />
      <Menus />
      <Routes />
    </div>
  );
}

export default App;
