import React, { Component } from "react";
import styled from "styled-components";

import { MainContentWrapper } from "../../UI/MainContentWrapper";
import FetchData from "../Common/FetchData";
import ContentCard from "../Common/ContentCard";
import Header from "./Header";

export default class TopArtists extends Component {
  state = { time_range: "long_term" };

  selectTimeRange = timerange => {
    this.setState({ time_range: timerange });
  };

  render() {
    return (
      <MainContentWrapper>
        <Header title="Top Artists" selectTimeRange={this.selectTimeRange} />
        <FetchData
          url="/me/top/artists"
          method="get"
          params={{ time_range: this.state.time_range, limit: 30 }}
        >
          {({ loading, error, data }) => {
            if (error) {
              console.error(error);
            }
            if (loading) {
              return <TopArtistBody>{loading}</TopArtistBody>;
            }
            return (
              <TopArtistBody>
                {data.items.map(artist => (
                  <ContentCard
                    imgUrl={artist.images[0].url}
                    name={artist.name}
                    key={artist.id}
                    linkTo={`/artist/artist.id`}
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
