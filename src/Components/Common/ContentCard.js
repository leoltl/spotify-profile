import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import theme from "../../UI/theme";

const { colors, fontSizes } = theme;

const ContentCardWrapper = styled.div`
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
  h1 {
    font-weight: 500;
  }
  h2 {
    margin: 10px;
    color: ${colors.lightGrey};
    font-size: ${fontSizes.xs};
  }
  @media screen and (min-width: 1000px) {
    margin: 20px;
    max-width: 180px;
    img {
      width: 180px;
      height: 180px;
    }
  }
  ${props =>
    props.square &&
    css`
      img {
        border-radius: 0%;
      }
    `}
`;

export default function ContentCard(props) {
  const { linkTo, imgUrl, name, info, square } = props;
  return (
    <ContentCardWrapper square={square ? square : null}>
      <Link to={linkTo ? linkTo : "#"}>
        <img src={imgUrl} alt="" />
        <h1>{name}</h1>
      </Link>
      <h2>{info}</h2>
    </ContentCardWrapper>
  );
}
