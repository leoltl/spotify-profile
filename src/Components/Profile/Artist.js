import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ArtistWrapper = styled.div`
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 0.25rem 1rem;
    object-fit: cover;
  }
  display: flex;
  align-items: center;
  font-weight: 400;
  margin: 5px 0;
`;
export default function Artist(props) {
  return (
    <Link to={`/artist/${props.artistId}`}>
      <ArtistWrapper>
        <img src={props.imgURL} alt="artist" />
        <p>{props.name}</p>
      </ArtistWrapper>
    </Link>
  );
}
