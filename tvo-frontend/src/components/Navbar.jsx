//@ts-check

import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Watchlist from "../pages/Watchlist";
import Profile from "../pages/Profile";
import Home from "../pages/Home";
import Tv from "../pages/Tv";
import Cms from "../pages/Cms";
import Tv_Watchlist from "../pages/Tv_Watchlist";
import User from "../components/User";

export default function Navbar() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-dark bg-primary navbar-expand font-weight-bold sticky-top">
          <Link to="/" className="navbar-brand  mr-0">
            <img
              src="http://localhost:3001/img/TvO.jpg"
              width="50"
              height="50"
              alt=""
              className="d-inline-block align-top rounded-circle"
            />
          </Link>
          <ul className="navbar-nav flex-grow-1">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                TvO
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/watchlist" className="nav-link">
                Favoritos
              </Link>
            </li>
            <li className="nav-item">
              <User />
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/watchlist">
            <Watchlist />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/cms">
            <Cms />
          </Route>
          <Route path="/tv/watchlist">
            <Tv_Watchlist />
          </Route>
          <Route path="/tv">
            <Tv />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}