import React, { Component } from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import {
  IconSpotify,
  IconMicrophone,
  IconUser,
  IconMusic,
  IconPlaylist
} from "./icons";
import theme from "../UI/theme";

const { colors, fontSizes, spacing } = theme;

const NavBar = styled.nav`
  z-index: 3;
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
    & > * {
      flex-basis: 33%;
    }
  }
  .home {
    width: 0px;
    visibility: hidden;
  }

  .active {
    a {
      color: ${colors.offGreen};
    }
    svg {
      fill: ${colors.offGreen};
    }
    border-bottom: 5px solid ${colors.green};
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
    .active {
      border-right: 5px solid ${colors.green};
      border-bottom: none;
    }
  }
`;

const NavIcon = styled.li`
  font-size: 12px;
  margin: auto 10px;
  text-align: center;
  svg {
    fill: ${colors.lightGrey};
    height: 40px;
  }
  &:hover {
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

class Navigation extends Component {
  render() {
    return (
      <NavBar>
        <Link to="/" className="home">
          <IconSpotify />
        </Link>
        <ul>
          <NavLink exact to="/" activeClassName="active">
            <NavIcon>
              <IconUser />
              <br />
              Profile
            </NavIcon>
          </NavLink>
          <NavLink to="/artists" activeClassName="active">
            <NavIcon>
              <IconMicrophone />
              <br />
              Top Artists
            </NavIcon>
          </NavLink>
          <NavLink to="/tracks" activeClassName="active">
            <NavIcon>
              <IconMusic />
              <br />
              Top Tracks
            </NavIcon>
          </NavLink>
          <NavLink to="/playlists" activeClassName="active">
            <NavIcon>
              <IconPlaylist />
              <br />
              PlayLists
            </NavIcon>
          </NavLink>
        </ul>
      </NavBar>
    );
  }
}

export default Navigation;
