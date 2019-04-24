import React, { Component } from "react";

import Artist from "./Artist";
import SecondaryButton from "../UI/SecondaryButton";
import ListHeader from "../UI/ListHeader";

export default class TopTracks extends Component {
  state = { topArtists: [] };
  componentDidMount() {
    fetch("https://api.spotify.com/v1/me/top/artists?limit=10", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer BQBuWxjXjeBSkw-3v1QuSknbUQE14p4l-PXjnAotASd99FLaG3UzHR-6Lj47-hHxsO0HMkEUKhP9jDTKgmb2QoNhcokKWAxnml-wuNRBmfEXq_4607xu_Rb1oXPfZPI1UpPAx8CQeVZDEokgDnpBcTRVx8tbNPgMxLLhFKdqiLT-18Zaf7GamJGnncsBnF2UMtrSIm08JQGewTiFZCWJPBU0ZkDs9h9tPz_lKq9rcdkpnOrbHsdOdeBFrqpoAlbsdlQsGxM_S5nkLi4"
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ topArtists: data.items });
      });
  }
  render() {
    const { topArtists } = this.state;

    return (
      <>
        <ListHeader>
          <h2>Top Artists of All Time</h2>
          <SecondaryButton className="button">See more</SecondaryButton>
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
      </>
    );
  }
}
