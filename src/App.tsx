import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { Header } from "./components/Header";
import { Posts } from "./features/posts/Posts";

function App() {
  return (
    <Router>
      <Header />
      <div className="App">
        <Switch>
          <Route exact path="/" component={Posts} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
