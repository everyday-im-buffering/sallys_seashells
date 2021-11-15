import './App.css'
import React from "react";
import Home from "./components/Nonpages/Home"
import SignUp from "./components/SignUp"
import AllShells from "./components/AllShells"
import { BrowserRouter as Router, Switch, Route,Link } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/SignUp" component={SignUp} />
        <Route path="/AllShells" component={AllShells} />
      </Switch>
    </Router>
  )
}

export default App;
