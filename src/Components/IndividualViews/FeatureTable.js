import React from "react";
import styled, { css } from "styled-components";
import theme from "../../UI/theme";
import FetchData from "../Common/FetchData";

const { colors } = theme;

const FeatureTable = props => {
  return (
    <FetchData url="/audio-features" params={{ ids: props.ids }} method="get">
      {({ data, loading, error }) => {
        if (error) {
          console.error(error);
        }
        if (loading) {
          return loading;
        }
        const features = [
          "acousticness",
          "danceability",
          "energy",
          "instrumentalness",
          "liveness",
          "speechiness",
          "valence"
        ];

        let featuresOutput = features.map(feature => {
          return (
            (data.audio_features
              .map(track => track[feature])
              .reduce((acc, cur) => acc + cur) /
              data.audio_features.length) *
            100
          );
        });
        return (
          <FeatureTableWrapper smallView={props.small ? props.small : null}>
            <div
              style={{
                width: `${featuresOutput[0]}%`,
                backgroundColor: "rgba(255, 99, 132, 0.3)",
                border: "1px solid rgba(255, 99, 132, 1)"
              }}
            >
              <span>Acousticness</span>
            </div>
            <div
              style={{
                width: `${featuresOutput[1]}%`,
                backgroundColor: "rgba(255, 159, 64, 0.3)",
                border: "1px solid rgba(255, 159, 64, 1)"
              }}
            >
              <span>Danceability</span>
            </div>
            <div
              style={{
                width: `${featuresOutput[2]}%`,
                backgroundColor: "rgba(255, 206, 86, 0.3)",
                border: "1px solid rgba(255, 206, 86, 1)"
              }}
            >
              <span>Energy</span>
            </div>
            <div
              style={{
                width: `${featuresOutput[3]}%`,
                backgroundColor: "rgba(75, 192, 192, 0.3)",
                border: "1px solid rgba(75, 192, 192, 1)"
              }}
            >
              <span>Instrumentalness</span>
            </div>
            <div
              style={{
                width: `${featuresOutput[4]}%`,
                backgroundColor: "rgba(54, 162, 235, 0.3)",
                border: "1px solid rgba(54, 162, 235, 1)"
              }}
            >
              <span>Liveness</span>
            </div>
            <div
              style={{
                width: `${featuresOutput[5]}%`,
                backgroundColor: "rgba(104, 132, 245, 0.3)",
                border: "1px solid rgba(104, 132, 245, 1)"
              }}
            >
              <span>Speechiness</span>
            </div>
            <div
              style={{
                width: `${featuresOutput[6]}%`,
                backgroundColor: "rgba(153, 102, 255, 0.3)",
                border: "1px solid rgba(153, 102, 255, 1)"
              }}
            >
              <span>Valence</span>
            </div>
          </FeatureTableWrapper>
        );
      }}
    </FetchData>
  );
};

export default FeatureTable;

const FeatureTableWrapper = styled.div`
  margin: 40px auto;
  border: 2px ${colors.lightGrey};
  border-style: none none solid solid;
  border-width: 2px;
  span {
    text-align: right;
  }
  h4 {
    margin: 20px auto;
    font-size: 24px;
    font-weight: 600;
    text-align: center;
  }
  & > div {
    display: flex;
    align-items: center;
    height: 30px;
    margin: 10px 0;
  }

  @media screen and (min-width: 1000px) {
    width: 70%;
    & > div {
      height: 50px;
    }
  }
  ${props =>
    props.smallView &&
    css`
      margin: 0 auto;
      width: 90%;
      & > div {
        height: 20px;
      }
    `}
`;
