import React, { Component } from "react";
import TopArtist from "./TopArtist";
import TopTracks from "./TopTracks";
import UserHeader from "./UserHeader";

import styled from "styled-components";
import { MainContentWrapper } from "../../UI/MainContentWrapper";

const TopTenWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 50px;
`;

export default class Profile extends Component {
  render() {
    return (
      <>
        <MainContentWrapper>
          <UserHeader />
          <TopTenWrapper>
            <TopArtist />
            <TopTracks />
          </TopTenWrapper>
        </MainContentWrapper>
      </>
    );
  }
}
