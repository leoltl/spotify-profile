import React, { Component } from "react";
import styled from "styled-components";

import { MainContentWrapper } from "../../UI/MainContentWrapper";
import ArtistCard from "./ArtistCard";

import { generateReqHeader } from "../../utils";

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
export default class TopArtists extends Component {
  state = { time_range: "long_term" };
  componentDidMount() {
    this.getTopArtists();
  }

  getTopArtists = () => {
    fetch(
      `https://api.spotify.com/v1/me/top/artists?time_range=${
        this.state.time_range
      }&limit=30`,
      generateReqHeader("GET")
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ topArtists: data.items });
      });
  };
  selectTimeRange = timerange => {
    this.setState({ time_range: timerange }, () => this.getTopArtists());
  };

  render() {
    let { topArtists } = this.state;
    return (
      <MainContentWrapper>
        <TopArtistHeader>
          <h2>Top Artists</h2>
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
                <ArtistCard
                  imgURL={artist.images[0].url}
                  name={artist.name}
                  key={artist.id}
                  artistId={artist.id}
                />
              ))
            : null}
        </TopArtistBody>
      </MainContentWrapper>
    );
  }
}
