import React from "react";
import styled from "styled-components";

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
`;
export default function Artist(props) {
  return (
    <ArtistWrapper>
      <img src={props.imgURL} alt="artist picture" />

      <p>{props.name}</p>
    </ArtistWrapper>
  );
}
