import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Artistcard = styled.div`
  display: flex;
  padding: 10px;
  font-weight: 500;
  flex-direction: column;
  text-align: center;
  align-items: center;
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-bottom: 10px;
  }
  @media screen and (min-width: 1000px) {
    margin: 20px;
    max-width: 200px;
    img {
      width: 200px;
      height: 200px;
    }
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
