import React, { Component } from "react";
import styled from "styled-components";

import { MainContentWrapper } from "../../UI/MainContentWrapper";
import ArtistCard from "./ArtistCard";

import { generateReqHeader } from "../../utils";
import FetchData from "../FetchData";

const TopArtistHeader = styled.div`
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

const TopArtistBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media screen and (min-width: 1000px) {
    display: flex;
    width: 70%;
    margin: 0 auto;
    flex-wrap: wrap;
  }
`;
export default class TopArtists extends Component {
  state = { time_range: "long_term" };

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
        <FetchData
          url="/me/top/artists"
          method="get"
          params={{ time_range: this.state.time_range, limit: 30 }}
        >
          {({ loading, error, data }) => {
            if (loading) {
              return <TopArtistBody>{loading}</TopArtistBody>;
            }
            if (error) {
              console.error(error);
              return null;
            }
            return (
              <TopArtistBody>
                {data.items.map(artist => (
                  <ArtistCard
                    imgURL={artist.images[0].url}
                    name={artist.name}
                    key={artist.id}
                    artistId={artist.id}
                  />
                ))}
              </TopArtistBody>
            );
          }}
        </FetchData>
      </MainContentWrapper>
    );
  }
}
