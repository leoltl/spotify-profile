import React from "react";
import styled from "styled-components";

import { MainContentWrapper } from "../../UI/MainContentWrapper";
import FetchData from "../Common/FetchData";
import ContentCard from "../Common/ContentCard";
import TrackList from "../Common/TrackList";
import FeatureTableContainer from "./FeatureTableContainer";

const InvPlaylistView = props => {
  return (
    <MainContentWrapper>
      <FetchData url={`/playlists/${props.match.params.id}`} method="get">
        {({ loading, error, data }) => {
          if (error) {
            console.error(error);
          }
          if (loading) {
            return loading;
          }
          let extractedTracksArray = data.tracks.items.map(item => item.track);
          let extractedTracksId = extractedTracksArray
            .slice(0, 99)
            .map(item => item.id);
          return (
            <InvPlaylistViewWrapper>
              <div className="left">
                <ContentCard
                  square
                  imgUrl={data.images[0].url}
                  name={data.name}
                  info={`By ${data.owner.display_name}`}
                  key={data.id}
                />
                <p>{data.description}</p>
                <p>{data.tracks.items.length} Songs</p>
                <FeatureTableContainer small ids={extractedTracksId} />
              </div>
              <div className="right">
                <h2>Tracks in this playlist</h2>
                <TrackList render={extractedTracksArray} />
              </div>
            </InvPlaylistViewWrapper>
          );
        }}
      </FetchData>
    </MainContentWrapper>
  );
};
export default InvPlaylistView;

const InvPlaylistViewWrapper = styled.div`
  h2 {
    text-align: center;
    font-size: 24px;
    font-weight: 600;
  }
  margin-top: 50px;
  .left {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    p {
      text-align: center;
      font-size: 14px;
    }
    margin-bottom: 30px;
  }
  @media screen and (min-width: 1000px) {
    display: grid;
    grid-template-columns: 1fr 2fr;
    & > div {
      margin: 0 30px;
    }
  }
`;
