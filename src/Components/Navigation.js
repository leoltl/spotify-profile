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
  border: 1px solid red;
`;

const NavIcon = styled.li`
  text-align: center;
  font-size:${fontSizes.sm}
  margin: ${spacing.md};
  
  a {
    color: ${colors.lightGrey};
    text-decoration: none;
  }
  svg {
    fill: ${colors.lightGrey};
    height: 40px;
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
        </ul>
      </NavBar>
    );
  }
}
