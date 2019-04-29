import React from "react";
import TrackList from "./TrackList";
import FetchData from "./FetchData";

import styled from "styled-components";

export default function RecommendationList(props) {
  const { featuresVector, ids } = props;
  return (
    <FetchData
      url="/recommendations"
      method="get"
      params={{
        seed_tracks: ids,
        target_acousticness: featuresVector[0],
        target_danceability: featuresVector[1],
        target_energy: featuresVector[2],
        target_instrumentalness: featuresVector[3],
        target_liveness: featuresVector[4],
        target_speechiness: featuresVector[5],
        target_valence: featuresVector[6],
        limit: 10,
        market: "CA"
      }}
    >
      {({ loading, data, error }) => {
        if (error) {
          console.error(error);
        }
        if (loading) {
          return loading;
        }
        return (
          <RecommendationListWrapper>
            <TrackList render={data.tracks} />
          </RecommendationListWrapper>
        );
      }}
    </FetchData>
  );
}

const RecommendationListWrapper = styled.div`
  margin: 20px auto 0 auto;
  width: 90%;
  border: white 1px solid;
`;
