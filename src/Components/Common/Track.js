import React from "react";
import styled from "styled-components";
import theme from "../../UI/theme";
import { Link } from "react-router-dom";

const { colors, fontSizes } = theme;

const TrackWrapper = styled.div`
  img {
    min-width: 50px;
    max-width: 50px;
    height: 50px;
    margin: 0.25rem 1rem;
  }
  display: flex;
  align-items: center;
  margin: 5px 0;
`;
const TrackContent = styled.div`
  display: grid;
  width: 100%;
  grid-template-areas:
    "track-name track-length"
    "track-album none";
  .track-name {
    grid-area: track-name;
    font-weight: 400;
  }
  .track-length {
    grid-area: track-length;
    justify-self: end;
    color: ${colors.lightGrey};
    font-size: ${fontSizes.xs};
  }
  .track-album {
    grid-area: track-album;
    margin-top: 5px;
    color: ${colors.lightGrey};
    font-size: ${fontSizes.xs};
  }
`;

export default function Track(props) {
  return (
    <Link to={`/track/${props.trackId}`}>
      <TrackWrapper>
        <img src={props.imgURL} alt="Artist" />
        <TrackContent>
          <div className="track-name">{props.name}</div>
          <div className="track-length">{props.length}</div>

          <div className="track-album">
            {props.artist} - {props.album}
          </div>
        </TrackContent>
      </TrackWrapper>
    </Link>
  );
}
