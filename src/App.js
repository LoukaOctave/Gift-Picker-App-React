import './App.css';
import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import CreateEvent from "./components/CreateEvent";
import ReadEvent from "./components/ReadEvent";
import { FirestoreFunctions } from "./firestore.js";

// Create an instance of FirestoreFunctions
export const fsFunc = new FirestoreFunctions();

const Profile = () => (
  <div>
    <h2>Profile</h2>
  </div>
);

export default function App() {
  return (
    <div>
      <nav className="navbar navbar-light">
        <ul className="nav navbar-nav">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/createEvent">Add</Link>
          </li>
          <li>
            <Link to="/readProfile">Profile</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route exact path="/createEvent"><CreateEvent /></Route>
        <Route path="/readProfile"><Profile /></Route>
        <Route path="/readEvent/:id"><ReadEvent /></Route>
      </Switch>
    </div>
  );
};