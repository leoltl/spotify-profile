import React, { Component } from "react";
import styled from "styled-components";

import TrackList from "../_test/TrackList";
import { MainContentWrapper } from "../../UI/MainContentWrapper";

import FetchData from "../FetchData";

export default class TopTracks extends Component {
  state = { time_range: "long_term" };

  selectTimeRange = timerange => {
    this.setState({ time_range: timerange });
  };

  render() {
    return (
      <MainContentWrapper>
        <TopTrackHeader>
          <h2>Top Tracks</h2>
          <ul>
            <li onClick={() => this.selectTimeRange("long_term")}>All Time</li>
            <li onClick={() => this.selectTimeRange("medium_term")}>
              Last 6 Months
            </li>
            <li onClick={() => this.selectTimeRange("short_term")}>
              Last 4 Weeks
            </li>
          </ul>
        </TopTrackHeader>
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

const TopTrackHeader = styled.div`
  margin-bottom: 20px;
  h2 {
    font-size: 30px;
    font-weight: 600;
    margin: 20px 0 30px;
    text-align: center;
  }
  ul {
    display: flex;
    margin-left: auto;
    justify-content: space-around;
    & > li {
      font-size: 14px;
      margin-left: 20px;
      text-decoration: underline;
      cursor: pointer;
    }
  }

  @media screen and (min-width: 1000px) {
    display: flex;
    width: 70%;
    margin: 0 auto;
    margin-bottom: 25px;
    padding: 0 20px 20px 20px;
  }
`;

const TopTrackBody = styled.div`
  @media screen and (min-width: 1000px) {
    width: 70%;
    margin: 0 auto;
  }
`;
