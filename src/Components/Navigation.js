import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { IconSpotify, IconMicrophone, IconUser, IconMusic } from "./icons";
import theme from "../UI/theme";

const { colors, fontSizes, spacing } = theme;

const NavBar = styled.nav`
  position: fixed;
  display: flex;
  bottom: 0;
  width: 100vw;
  height: 70px;
  background: ${colors.navBlack};
  svg {
    fill: ${colors.offGreen};
    width: 30px;
  }
  ul {
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
  }
  .home {
    width: 0px;
    visibility: hidden;
  }

  @media screen and (min-width: 1000px) {
    position: fixed;
    display: flex;
    height: 100vh;
    width: 120px;
    flex-direction: column;
    .home {
      visibility: visible;
      width: 100%;
    }
    svg {
      width: 70px;
      margin: 0 auto;
    }
    a {
      text-align: center;
      margin-top: 25px;
    }
    ul {
      margin: auto 0;
      padding: 0;
      flex-direction: column;
    }
  }
`;

const NavIcon = styled.li`
  width: calc(100%/3);
  font-size: 12px;
  padding: 5px;
  margin: auto 10px;
  text-align: center;
  svg {
    fill: ${colors.lightGrey};
    height: 40px;
  }
  &:hover, &:focus {
    background:${colors.lightestGrey};
    a {
      color: ${colors.offGreen};
    }
    svg {
      fill: ${colors.offGreen};
    }
  }
  a {
    color: ${colors.lightGrey};
    text-decoration: none;
  }
@media screen and (min-width: 1000px) {
  box-sizing: border-box;
  width: 120px;
  margin: auto 10px;
  margin: 0;
  text-align: center;
  font-size:${fontSizes.sm}
  padding: ${spacing.md} 0;
  transition: ease-in-out 0.3s;
  svg {
    fill: ${colors.lightGrey};
    height: 40px;
  }
}
  
`;

export default class Navigation extends Component {
  render() {
    return (
      <NavBar>
        <Link to="/" className="home">
          <IconSpotify />
        </Link>
        <ul>
          <NavIcon>
            <Link to="/">
              <IconUser />
              <br />
              Profile
            </Link>
          </NavIcon>
          <NavIcon>
            <Link to="/artists">
              <IconMicrophone />
              <br />
              Top Artists
            </Link>
          </NavIcon>
          <NavIcon>
            <Link to="/tracks">
              <IconMusic />
              <br />
              Top Tracks
            </Link>
          </NavIcon>
          <div />
        </ul>
      </NavBar>
    );
  }
}
