import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navigation from "./Navigation";
import TopTrack from "./TopTrack/TopTrack";
import Profile from "./Profile/Profile";

export default class Dashboard extends Component {
  render() {
    return (
      <>
        <Router>
          <Navigation />
          <Switch>
            <Route exact path="/" component={Profile} />
            <Route exact path="/tracks" component={TopTrack} />
          </Switch>
        </Router>
      </>
    );
  }
}
