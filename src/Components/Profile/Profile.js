import React, { Component } from "react";
import styled from "styled-components";

import { MainContentWrapper } from "../../UI/MainContentWrapper";
import TopArtist from "./TopArtist";
import TopTracks from "./TopTracks";
import UserHeader from "./UserHeader";

const TwoAcrossWrapper = styled.div`
  & > div {
    margin-top: 50px;
  }
  @media screen and (min-width: 1000px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 50px;
  }
`;

export default class Profile extends Component {
  render() {
    return (
      <>
        <MainContentWrapper>
          <UserHeader />
          <TwoAcrossWrapper>
            <TopArtist />
            <TopTracks />
          </TwoAcrossWrapper>
        </MainContentWrapper>
      </>
    );
  }
}
