import React, { Component } from "react";
import styled from "styled-components";

import Track from "../Profile/Track";
import { MainContentWrapper } from "../../UI/MainContentWrapper";
import Artist from "./Artist";

const TopArtistHeader = styled.div`
  display: flex;
  width: 70%;
  margin: 0 auto;
  margin-bottom: 25px;
  padding: 0 20px 20px 20px;
  ul {
    display: flex;
    margin-left: auto;
    & > li {
      margin-left: 20px;
      text-decoration: underline;
      cursor: pointer;
    }
  }
  h2 {
    font-size: 24px;
    font-weight: 600;
  }
`;

const TopArtistBody = styled.div`
  width: 70%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
`;
export default class TopTracks extends Component {
  state = { time_range: "long_term" };
  componentDidMount() {
    this.getTopTracks();
  }

  getTopTracks = () => {
    fetch(
      `https://api.spotify.com/v1/me/top/artists?time_range=${
        this.state.time_range
      }&limit=30`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_BEARER}`
        }
      }
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ topArtists: data.items });
      });
  };
  selectTimeRange = timerange => {
    this.setState({ time_range: timerange }, () => this.getTopTracks());
  };

  render() {
    console.log(this.state);
    let { topArtists } = this.state;
    return (
      <MainContentWrapper>
        <TopArtistHeader>
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
        </TopArtistHeader>
        <TopArtistBody>
          {topArtists
            ? topArtists.map(artist => (
                <Artist
                  imgURL={artist.images[0].url}
                  name={artist.name}
                  key={artist.id}
                />
              ))
            : null}
        </TopArtistBody>
      </MainContentWrapper>
    );
  }
}

function formatDuration(millis) {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
