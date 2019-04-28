import React from "react";
import styled from "styled-components";

import { MainContentWrapper } from "../../UI/MainContentWrapper";
import Button from "../../UI/Button";
import FetchData from "../Common/FetchData";
import ContentCard from "../Common/ContentCard";
import TrackList from "../Common/TrackList";
import FeatureTable from "./FeatureTable";

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
            .slice(0, 98)
            .map(item => item.id)
            .reduce((accumulator, current) => accumulator + "," + current);
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
                <Button primary>Get Recommendations</Button>
                <FeatureTable small ids={extractedTracksId} />
              </div>
              <div className="right">
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
