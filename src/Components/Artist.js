import React from "react";
import styled from "styled-components";

const ArtistWrapper = styled.div`
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 0.25rem 1rem;
  }
  display: flex;
  align-items: center;
`;
export default function Artist(props) {
  return (
    <ArtistWrapper>
      <img src={props.imgURL} />
      <p>{props.artistName}</p>
    </ArtistWrapper>
  );
}
