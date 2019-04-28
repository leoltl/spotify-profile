import React from "react";
import styled from "styled-components";

import FetchData from "../Common/FetchData";
import ContentCard from "../Common/ContentCard";
import { MainContentWrapper } from "../../UI/MainContentWrapper";

export default function Playlist() {
  return (
    <MainContentWrapper>
      <FetchData url="/me/playlists" method="get" params={{ limit: 40 }}>
        {({ loading, data, error }) => {
          if (error) {
            console.error(error);
          }
          if (loading) {
            return loading;
          }
          console.log(data);
          return (
            <>
              <h2>Your Playlists</h2>
              <TopArtistBody>
                {data.items.map(item => (
                  <ContentCard
                    square
                    imgUrl={item.images[0].url}
                    name={item.name}
                    info={`${item.tracks.total} Tracks`}
                    key={item.id}
                    linkTo={`/playlist/${item.id}`}
                  />
                ))}
              </TopArtistBody>
            </>
          );
        }}
      </FetchData>
    </MainContentWrapper>
  );
}

const TopArtistBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media screen and (min-width: 1000px) {
    display: flex;
    width: 80%;
    margin: 0 auto;
    flex-wrap: wrap;
  }
`;
