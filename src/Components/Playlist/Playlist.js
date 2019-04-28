import React from "react";

import FetchData from "../Common/FetchData";
import ContentCard from "../Common/ContentCard";
import { MainContentWrapper } from "../../UI/MainContentWrapper";
import { ContentCardGrid } from "../../UI/ContentCardGrid";

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
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: "600",
                  marginLeft: "100px",
                  marginBottom: "50px"
                }}
              >
                Your Playlists
              </h2>
              <ContentCardGrid>
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
              </ContentCardGrid>
            </>
          );
        }}
      </FetchData>
    </MainContentWrapper>
  );
}
