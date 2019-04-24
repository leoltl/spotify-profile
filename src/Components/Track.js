import React from "react";
import styled from "styled-components";

const TrackWrapper = styled.div`
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 0.25rem 1rem;
  }
  display: flex;
  align-items: center;
`;
const TrackContent = styled.div`
  display: grid;
  width: 100%;
  grid-template-areas:
    "track-name track-length"
    "track-album none";
  .track-name {
    grid-area: track-name;
  }
  .track-length {
    grid-area: track-length;
    justify-self: end;
  }
  .track-album {
    grid-area: track-album;
  }
`;

export default function Track(props) {
  return (
    <TrackWrapper>
      <img src={props.imgURL} />
      <TrackContent>
        <div className="track-name">{props.name}</div>
        <div className="track-length">{props.length}</div>

        <div className="track-album">
          {props.artist} - {props.album}
        </div>
      </TrackContent>
    </TrackWrapper>
  );
}
