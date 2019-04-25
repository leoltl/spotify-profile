import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { IconSpotify, IconMicrophone, IconUser, IconMusic } from "./icons";
import theme from "../UI/theme";

const { colors, fontSizes, spacing } = theme;

const NavBar = styled.nav`
  position: fixed;
  display: flex;
  height: 100vh;
  width: 120px;
  flex-direction: column;
  background: ${colors.navBlack};
  svg {
    fill: ${colors.offGreen};
    width: 70px;
    margin: 0 auto;
  }
`;

const NavIcon = styled.li`
  width: 100%;
  text-align: center;
  font-size:${fontSizes.sm}
  padding: ${spacing.md} 0;
  transition: ease-in-out 0.3s;
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
`;

export default class Navigation extends Component {
  render() {
    return (
      <NavBar>
        <IconSpotify />
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
