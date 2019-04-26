import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Artistcard = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 20px;
  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    margin-bottom: 20px;
  }
`;

export default function Artist(props) {
  return (
    <Link to={`/artist/${props.artistId}`}>
      <Artistcard>
        <img src={props.imgURL} alt="" />
        {props.name}
      </Artistcard>
    </Link>
  );
}
