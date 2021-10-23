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
import { Users } from "./features/users/Users";
import { SingleUser } from "./features/users/SingleUser";
import { SinglePost } from "./features/posts/SinglePost";

function App() {
  return (
    <Router>
      <Header />
      <div className="App">
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/users/:userId" component={SingleUser} />
          <Route exact path="/posts/:postId" component={SinglePost} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
