import React from "react";
import Track from "./Track";

import { formatDuration } from "../../utils";

const TrackList = props => {
  return (
    <>
      {props.render.map(track => (
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
    </>
  );
};

export default TrackList;
