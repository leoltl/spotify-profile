import React from "react";
import styled from "styled-components";
import TrackList from "../Common/TrackList";

export default function FeatureTableRecommendation(props) {
  const { listOfRecommendations, showRecommendation } = props;
  if (showRecommendation) {
    return (
      <RecommendationListWrapper>
        <TrackList render={listOfRecommendations} />
      </RecommendationListWrapper>
    );
  }
  return null;
}

const RecommendationListWrapper = styled.div`
  margin: 20px auto;
  width: 90%;
`;
