import React, { Component } from "react";
import ListHeader from "../UI/ListHeader";
import SecondaryButton from "../UI/SecondaryButton";
import Track from "./Track";

export default class TopTracks extends Component {
  state = { topTracks: [] };
  componentDidMount() {
    fetch(
      "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer BQBuWxjXjeBSkw-3v1QuSknbUQE14p4l-PXjnAotASd99FLaG3UzHR-6Lj47-hHxsO0HMkEUKhP9jDTKgmb2QoNhcokKWAxnml-wuNRBmfEXq_4607xu_Rb1oXPfZPI1UpPAx8CQeVZDEokgDnpBcTRVx8tbNPgMxLLhFKdqiLT-18Zaf7GamJGnncsBnF2UMtrSIm08JQGewTiFZCWJPBU0ZkDs9h9tPz_lKq9rcdkpnOrbHsdOdeBFrqpoAlbsdlQsGxM_S5nkLi4"
        }
      }
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ topTracks: data.items });
      });
  }
  render() {
    let { topTracks } = this.state;
    return (
      <>
        <ListHeader>
          <h2>Top Tracks of All Time</h2>
          <SecondaryButton className="button">See more</SecondaryButton>
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
      </>
    );
  }
}

function formatDuration(millis) {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
