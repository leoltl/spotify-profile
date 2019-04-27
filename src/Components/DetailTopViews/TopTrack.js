import React, { Component } from "react";
import styled from "styled-components";

import { MainContentWrapper } from "../../UI/MainContentWrapper";
import FetchData from "../Common/FetchData";
import TrackList from "../Common/TrackList";
import Header from "./Header";

export default class TopTracks extends Component {
  state = { time_range: "long_term" };

  selectTimeRange = timerange => {
    this.setState({ time_range: timerange });
  };

  render() {
    return (
      <MainContentWrapper>
        <Header title="Top Tracks" selectTimeRange={this.selectTimeRange} />
        <FetchData
          url="/me/top/tracks"
          params={{ time_range: this.state.time_range, limit: 40 }}
          method="get"
        >
          {({ loading, data, error }) => {
            if (loading) {
              return <TopTrackBody>{loading}</TopTrackBody>;
            }
            if (error) {
              console.error(error);
              return null;
            }
            return (
              <TopTrackBody>
                <TrackList render={data.items} />
              </TopTrackBody>
            );
          }}
        </FetchData>
      </MainContentWrapper>
    );
  }
}

const TopTrackBody = styled.div`
  @media screen and (min-width: 1000px) {
    width: 70%;
    margin: 0 auto;
  }
`;
