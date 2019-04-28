import React, { Component } from "react";

import { MainContentWrapper } from "../../UI/MainContentWrapper";
import { ContentCardGrid } from "../../UI/ContentCardGrid";
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
              return <ContentCardGrid>{loading}</ContentCardGrid>;
            }
            return (
              <ContentCardGrid>
                {data.items.map(artist => (
                  <ContentCard
                    imgUrl={artist.images[0].url}
                    name={artist.name}
                    key={artist.id}
                    linkTo={`/artist/${artist.id}`}
                  />
                ))}
              </ContentCardGrid>
            );
          }}
        </FetchData>
      </MainContentWrapper>
    );
  }
}
