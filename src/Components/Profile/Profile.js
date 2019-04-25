import React, { Component } from "react";
import TopArtist from "./TopArtist";
import TopTracks from "./TopTracks";
import UserHeader from "./UserHeader";
import Navigation from "../Navigation";

import styled from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";

const TopTenWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 50px;
`;

const MainContentWrapper = styled.div`
  padding-left: 120px;
`;

export default class Profile extends Component {
  render() {
    return (
      <>
        <Router>
          <Navigation />
          <MainContentWrapper>
            <UserHeader />
            <TopTenWrapper>
              <TopArtist />
              <TopTracks />
            </TopTenWrapper>
          </MainContentWrapper>
        </Router>
      </>
    );
  }
}
