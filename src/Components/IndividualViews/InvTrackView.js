import React, { Component } from "react";
import styled from "styled-components";

import FeatureTableContainer from "./FeatureTableContainer";
import { MainContentWrapper } from "../../UI/MainContentWrapper";
import Button from "../../UI/Button";
import theme from "../../UI/theme";
import { BarLoader } from "react-spinners";

import {
  generateReqHeader,
  parsePitchClass,
  formatDuration
} from "../../utils";

const { colors, fontSizes } = theme;

export default class InvTrackView extends Component {
  state = { TrackInfo: {}, TrackAnalysis: {} };

  getAllTrackDetail = trackId => {
    const urlsToFetch = [
      `https://api.spotify.com/v1/audio-analysis/${trackId}`,
      `https://api.spotify.com/v1/tracks/${trackId}`
    ];
    Promise.all(
      urlsToFetch.map(url => {
        return fetch(url, generateReqHeader("GET"))
          .then(res => res.json())
          .catch(err => console.error(err));
      })
    ).then(parsedResponses =>
      this.setState({
        TrackAnalysis: parsedResponses[0],
        TrackInfo: parsedResponses[1]
      })
    );
  };

  componentDidMount() {
    this.getAllTrackDetail(this.props.match.params.id);
  }

  render() {
    const { TrackInfo, TrackAnalysis } = this.state;

    return (
      <MainContentWrapper>
        {TrackInfo.album && TrackAnalysis.track ? (
          <>
            <TrackInfoWrapper>
              <img src={TrackInfo.album.images[0].url} alt="album" />
              <div>
                <h1>{TrackInfo.name}</h1>
                <h2>{TrackInfo.artists[0].name}</h2>
                <p>
                  {TrackInfo.album.name} - {TrackInfo.album.release_date}
                </p>
                <a
                  href={TrackInfo.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button primary>Play on Spotify</Button>
                </a>
              </div>
            </TrackInfoWrapper>
            <TrackAnalysisWrapper>
              <div className="">
                <h3>{formatDuration(TrackInfo.duration_ms)}</h3>
                <p>duration</p>
              </div>
              <div className="">
                <h3>{parsePitchClass(TrackAnalysis.track.key)}</h3>
                <p>Key</p>
              </div>
              <div className="">
                <h3>{TrackAnalysis.track.mode === 1 ? "Major" : "Minor"}</h3>
                <p>Modality</p>
              </div>
              <div className="">
                <h3>{TrackAnalysis.track.tempo.toFixed()}</h3>
                <p>Tempo (BPM) </p>
              </div>
              <div className="">
                <h3>{TrackInfo.popularity}%</h3>
                <p>Popularity</p>
              </div>
              <div className="">
                <h3>{TrackAnalysis.track.time_signature}</h3>
                <p>Time Signature</p>
              </div>
            </TrackAnalysisWrapper>
            <h4
              style={{
                margin: " 40px auto",
                fontSize: "20px",
                fontWeight: "600",
                textAlign: "center"
              }}
            >
              Audio Feature of {TrackInfo.name} by {TrackInfo.artists[0].name}
            </h4>
            <FeatureTableContainer ids={this.props.match.params.id} />
          </>
        ) : (
          <TrackInfoWrapper>
            <BarLoader loading sizeUnit={"px"} size={150} color={"#1ed760"} />
          </TrackInfoWrapper>
        )}
      </MainContentWrapper>
    );
  }
}

const TrackAnalysisWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  & > * {
    border: 1px solid rgb(64, 64, 64);

    padding: 20px;
    text-align: center;
  }
  & h3 {
    font-weight: 800;
    font-size: 24px;
    margin-bottom: 5px;
  }
  & p {
    text-transform: Capitalize;
    font-size: 12px;
    color: ${colors.lightGrey};
  }
  @media screen and (min-width: 1000px) {
    width: 70%;
    margin: 0 auto;
  }
`;

const TrackInfoWrapper = styled.div`
 text-align: center;
  h1 {
    font-size: ${fontSizes.xl};
    font-weight: 1000;
    margin: 20px 0;
  }
  h2 {
    color: ${colors.lightGrey};
    font-size: ${fontSizes.sm};
    font-weight: 700;
    margin: 10px 0;
  }

  p {
    color: ${colors.lightGrey};
    font-size: ${fontSizes.xs};
  }
  img {
    width: 250px;
    height: 250px;
  }

  @media screen and (min-width: 1000px) {
    text-align: left;
    width: 70%
    margin: 25px auto;
    display: flex;
    & > div {
      margin-left: 200px;
    }
  }
`;
