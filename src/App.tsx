import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "./App.css";
import { Header } from "./components/Header";
import { Posts } from "./features/posts/Posts";
import { SingleUser } from "./features/users/SingleUser";
import { SinglePost } from "./features/posts/SinglePost";
import { EditUserForm } from "./features/users/EditUser";
import { Users } from "./features/users/Users";

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
          <Route exact path="/edituser/:userId" component={EditUserForm} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
