import React, { Component } from "react";
import styled from "styled-components";

import Track from "../Profile/Track";
import { MainContentWrapper } from "../../UI/MainContentWrapper";

import { generateReqHeader } from "../../utils";

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
export default class TopTracks extends Component {
  state = { time_range: "long_term" };
  componentDidMount() {
    this.getTopTracks();
  }

  getTopTracks = () => {
    fetch(
      `https://api.spotify.com/v1/me/top/tracks?time_range=${
        this.state.time_range
      }&limit=40`,
      generateReqHeader("GET")
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ topTracks: data.items });
      });
  };
  selectTimeRange = timerange => {
    this.setState({ time_range: timerange }, () => this.getTopTracks());
  };

  render() {
    let { topTracks } = this.state;
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
        <TopTrackBody>
          {topTracks
            ? topTracks.map(track => (
                <Track
                  imgURL={track.album.images[1].url}
                  name={track.name}
                  artist={track.artists[0].name}
                  album={track.album.name}
                  length={formatDuration(track.duration_ms)}
                  key={track.id}
                  trackId={track.id}
                />
              ))
            : null}
        </TopTrackBody>
      </MainContentWrapper>
    );
  }
}

function formatDuration(millis) {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
