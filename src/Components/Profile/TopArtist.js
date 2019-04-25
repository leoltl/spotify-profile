import React, { Component } from "react";

import Artist from "../Artist";
import SecondaryButton from "../../UI/SecondaryButton";
import ListHeader from "../../UI/ListHeader";
import ListRail from "../../UI/ListRail";
import { Link } from "react-router-dom";

export default class TopTracks extends Component {
  state = { topArtists: [] };
  componentDidMount() {
    fetch("https://api.spotify.com/v1/me/top/artists?limit=10", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_BEARER}`
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ topArtists: data.items });
      });
  }
  render() {
    const { topArtists } = this.state;

    return (
      <ListRail className="top-artist">
        <ListHeader>
          <h2>Top Artists of All Time</h2>

          <SecondaryButton className="button">
            <Link to="/artists">See more</Link>
          </SecondaryButton>
        </ListHeader>
        {topArtists
          ? topArtists.map(artist => (
              <Artist
                imgURL={artist.images[2].url}
                name={artist.name}
                key={artist.id}
              />
            ))
          : null}
      </ListRail>
    );
  }
}
