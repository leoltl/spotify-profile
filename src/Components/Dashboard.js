import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navigation from "./Navigation";
import TopTrack from "./DetailTopViews/TopTrack";
import TopArtists from "./DetailTopViews/TopArtists";
import Profile from "./Profile/Profile";
import InvArtistView from "./IndividualViews/InvArtistView";
import InvTrackView from "./IndividualViews/InvTrackView";

export default class Dashboard extends Component {
  render() {
    return (
      <>
        <Router>
          <Navigation />
          <Switch>
            <Route exact path="/" component={Profile} />
            <Route exact path="/tracks" component={TopTrack} />
            <Route exact path="/artists" component={TopArtists} />
            <Route path="/artist/:id" component={InvArtistView} />
            <Route path="/track/:id" component={InvTrackView} />
          </Switch>
        </Router>
      </>
    );
  }
}
