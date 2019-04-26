import React, { Component } from "react";

import Artist from "./Artist";
import Button from "../../UI/Button";
import ListHeader from "../../UI/ListHeader";
import ListRail from "../../UI/ListRail";
import { Link } from "react-router-dom";

export default class TopArtist extends Component {
  state = { topArtists: [] };
  componentDidMount() {
    this.getTopArtist();
  }

  getTopArtist = () => {
    const token = sessionStorage.getItem("token");
    console.log(token);
    fetch("https://api.spotify.com/v1/me/top/artists?limit=10", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ topArtists: data.items });
      });
  };
  render() {
    const { topArtists } = this.state;

    return (
      <ListRail className="top-artist">
        <ListHeader>
          <h2>Top Artists of All Time</h2>

          <Button className="button">
            <Link to="/artists">See more</Link>
          </Button>
        </ListHeader>
        {topArtists
          ? topArtists.map(artist => (
              <Artist
                imgURL={artist.images[2].url}
                name={artist.name}
                key={artist.id}
                artistId={artist.id}
              />
            ))
          : null}
      </ListRail>
    );
  }
}
