import './App.css';
import React from "react";
import M from "materialize-css";
import { Link, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import CreateEvent from "./components/CreateEvent";
import ReadEvent from "./components/ReadEvent";
import UpdateEvent from "./components/UpdateEvent";
import { FirestoreFunctions } from "./firestore.js";

// Create an instance of FirestoreFunctions
export const fsFunc = new FirestoreFunctions();

const Profile = () => (
  <div>
    <h2>Profile</h2>
  </div>
);

export default function App() {

  document.addEventListener('DOMContentLoaded', function() {
    var sidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenav);
  });

  /**
   * Toggles the "active" CSS class on all navbar <li/> elements when one of them is clicked.
   */
  function changeActiveTab() {
    document.querySelectorAll('.nav-links li').forEach(li => {
      if(li.getAttribute("href") === window.location.pathname) { li.classList.add("active"); }
      else { li.classList.remove("active"); }
    })
  }

  /**
   * Returns a <ul/> when called. Uses a parameter to determine the right classes and ids to apply on the <ul/>.
   * This <ul/> has two possible forms: regular display navbar (mobile = false) & mobile display hamburger menu (mobile = true).
   * @param   {Boolean}           mobile  Indicates whether the return <ul/> is for mobile devices
   * @returns {HTMLUListElement}          <ul/> that contains several <li><Link><i/></Link></li> (these are the items on the navbar)
   */
  const navLinks = (mobile) => {
    return (
      <ul className={`nav-links ${(mobile) ? "sidenav" : "hide-on-med-and-down"}`} id={(mobile) ? "mobile-demo" : ""}>
        <li href="/" className={(window.location.pathname === "/") ? "active" : ""} onClick={changeActiveTab}>
          <Link to="/"><i className="material-icons left">home</i>Home</Link>
        </li>
        <li href="/createEvent/" className={(window.location.pathname === "/createEvent/") ? "active" : "" } onClick={changeActiveTab}><Link to="/createEvent/"><i className="material-icons left">add</i>Add</Link>
        </li>
        <li href="/readProfile/" className={(window.location.pathname === "/readProfile/") ? "active" : ""} onClick={changeActiveTab}>
          <Link to="/readProfile/"><i className="material-icons left">person</i>Profile</Link>
        </li>
      </ul>
    );
  }

  return (
    <div>
      <nav>
        <div className="nav-wrapper">
          <a href="/" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
          {navLinks(false)}
        </div>
      </nav>

      {navLinks(true)}

      <Switch>
        <Route exact path="/"><Home/></Route>
        <Route exact path="/createEvent/"><CreateEvent/></Route>
        <Route path="/readEvent/:id"><ReadEvent/></Route>
        <Route path="/updateEvent/:id"><UpdateEvent/></Route>
        <Route path="/readProfile/"><Profile/></Route>
      </Switch>
    </div>
  );
};