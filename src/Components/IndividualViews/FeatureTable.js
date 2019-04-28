import React from "react";
import styled from "styled-components";
import theme from "../../UI/theme";

const { colors } = theme;

const FeatureTable = props => {
  let {
    acousticness,
    danceability,
    energy,
    instrumentalness,
    liveness,
    speechiness,
    valence
  } = props.value;

  acousticness = acousticness * 100;
  danceability = danceability * 100;
  energy = energy * 100;
  instrumentalness = instrumentalness * 100;
  liveness = liveness * 100;
  speechiness = speechiness * 100;
  valence = valence * 100;
  return (
    <>
      <h4
        style={{
          margin: " 40px auto",
          fontSize: "24px",
          fontWeight: "600",
          textAlign: "center"
        }}
      >
        Audio Feature of {props.track.name} by {props.track.artists[0].name}
      </h4>
      <FeatureTableWrapper>
        <div
          style={{
            width: `${acousticness}%`,
            backgroundColor: "rgba(255, 99, 132, 0.3)",
            border: "1px solid rgba(255, 99, 132, 1)"
          }}
        >
          <span>Acousticness</span>
        </div>
        <div
          style={{
            width: `${danceability}%`,
            backgroundColor: "rgba(255, 159, 64, 0.3)",
            border: "1px solid rgba(255, 159, 64, 1)"
          }}
        >
          <span>Danceability</span>
        </div>
        <div
          style={{
            width: `${energy}%`,
            backgroundColor: "rgba(255, 206, 86, 0.3)",
            border: "1px solid rgba(255, 206, 86, 1)"
          }}
        >
          <span>Energy</span>
        </div>
        <div
          style={{
            width: `${instrumentalness}%`,
            backgroundColor: "rgba(75, 192, 192, 0.3)",
            border: "1px solid rgba(75, 192, 192, 1)"
          }}
        >
          <span>Instrumentalness</span>
        </div>
        <div
          style={{
            width: `${liveness}%`,
            backgroundColor: "rgba(54, 162, 235, 0.3)",
            border: "1px solid rgba(54, 162, 235, 1)"
          }}
        >
          <span>Liveness</span>
        </div>
        <div
          style={{
            width: `${speechiness}%`,
            backgroundColor: "rgba(104, 132, 245, 0.3)",
            border: "1px solid rgba(104, 132, 245, 1)"
          }}
        >
          <span>Speechiness</span>
        </div>
        <div
          style={{
            width: `${valence}%`,
            backgroundColor: "rgba(153, 102, 255, 0.3)",
            border: "1px solid rgba(153, 102, 255, 1)"
          }}
        >
          <span>Valence</span>
        </div>
      </FeatureTableWrapper>
    </>
  );
};

export default FeatureTable;

const FeatureTableWrapper = styled.div`
  width: 70%;
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
    height: 50px;
    margin: 10px 0;
  }
`;
