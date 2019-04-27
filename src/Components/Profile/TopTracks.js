import React from "react";
import Track from "./Track";
import { Link } from "react-router-dom";

import ListHeader from "../../UI/ListHeader";
import Button from "../../UI/Button";
import ListRail from "../../UI/ListRail";

import FetchData from "../FetchData";

const TopTracks = () => {
  return (
    <FetchData
      url="https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10"
      method="GET"
    >
      {({ data, loading, error }) => {
        if (loading) {
          return <ListRail>{loading}</ListRail>;
        }
        if (error) {
          console.error(error);
          return;
        }
        return (
          <ListRail className="top-track">
            <ListHeader>
              <h2>Top Tracks of All Time</h2>
              <Button className="button">
                <Link to="/tracks">See more</Link>
              </Button>
            </ListHeader>
            {data.items.map(track => (
              <Track
                imgURL={track.album.images[1].url}
                name={track.name}
                artist={track.artists[0].name}
                album={track.album.name}
                length={formatDuration(track.duration_ms)}
                key={track.id}
                trackId={track.id}
              />
            ))}
          </ListRail>
        );
      }}
    </FetchData>
  );
};

export default TopTracks;

function formatDuration(millis) {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// state = { topTracks: [] };

// componentDidMount() {
//   this.getTopTracks();
// }

// getTopTracks = () => {
//   fetch(
//     "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10",
//     generateReqHeader("GET")
//   )
//     .then(res => res.json())
//     .then(data => {
//       this.setState({ topTracks: data.items });
//     });
// };
