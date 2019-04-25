import React, { Component } from "react";
import Track from "./Track";
import { Link } from "react-router-dom";

import ListHeader from "../../UI/ListHeader";
import SecondaryButton from "../../UI/SecondaryButton";
import ListRail from "../../UI/ListRail";

export default class TopTracks extends Component {
  state = { topTracks: [] };
  componentDidMount() {
    fetch(
      "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_BEARER}`
        }
      }
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ topTracks: data.items });
      });
  }
  render() {
    let { topTracks } = this.state;
    return (
      <ListRail className="top-track">
        <ListHeader>
          <h2>Top Tracks of All Time</h2>
          <SecondaryButton className="button">
            <Link to="/tracks">See more</Link>
          </SecondaryButton>
        </ListHeader>
        {topTracks
          ? topTracks.map(track => (
              <Track
                imgURL={track.album.images[1].url}
                name={track.name}
                artist={track.artists[0].name}
                album={track.album.name}
                length={formatDuration(track.duration_ms)}
                key={track.id}
              />
            ))
          : null}
      </ListRail>
    );
  }
}

function formatDuration(millis) {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
