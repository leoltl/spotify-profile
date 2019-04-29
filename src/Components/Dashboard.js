import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ScrollTop from "./ScrollTop";

import Navigation from "./Navigation";
import TopTrack from "./DetailTopViews/TopTrack";
import TopArtists from "./DetailTopViews/TopArtists";
import Playlist from "./Playlist/Playlist";
import Profile from "./Profile/Profile";
import InvArtistView from "./IndividualViews/InvArtistView";
import InvTrackView from "./IndividualViews/InvTrackView";
import InvPlaylistView from "./IndividualViews/InvPlaylistView";

export default class Dashboard extends Component {
  render() {
    return (
      <>
        <Router>
          <Navigation />
          <ScrollTop>
            <Switch>
              <Route exact path="/" component={Profile} />
              <Route exact path="/tracks" component={TopTrack} />
              <Route exact path="/artists" component={TopArtists} />
              <Route exact path="/playlists" component={Playlist} />
              <Route path="/artist/:id" component={InvArtistView} />
              <Route path="/track/:id" component={InvTrackView} />
              <Route path="/playlist/:id" component={InvPlaylistView} />
            </Switch>
          </ScrollTop>
        </Router>
      </>
    );
  }
  handlePageChange = () => {
    window.scrollTo(0, 0);
  };
}
