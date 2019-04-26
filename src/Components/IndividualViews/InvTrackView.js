import React, { Component } from "react";
import styled from "styled-components";
import { MainContentWrapper } from "../../UI/MainContentWrapper";
import Button from "../../UI/Button";
import theme from "../../UI/theme";

import { generateReqHeader } from "../../utils";

const { colors, fontSizes } = theme;

export default class InvTrackView extends Component {
  state = { TrackFeature: {}, TrackInfo: {}, TrackAnalysis: {} };
  getTrackFeature = trackId => {
    fetch(
      `https://api.spotify.com/v1/audio-features/${trackId}`,
      generateReqHeader("GET")
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ TrackFeature: data });
      });
  };

  getTrackInfo = trackId => {
    fetch(
      `https://api.spotify.com/v1/tracks/${trackId}`,
      generateReqHeader("GET")
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ TrackInfo: data });
      });
  };

  getTrackAnalysis = trackId => {
    fetch(
      `https://api.spotify.com/v1/audio-analysis/${trackId}`,
      generateReqHeader("GET")
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ TrackAnalysis: data });
      });
  };

  componentDidMount() {
    this.getTrackFeature(this.props.match.params.id);
    this.getTrackInfo(this.props.match.params.id);
    this.getTrackAnalysis(this.props.match.params.id);
  }

  render() {
    const { TrackInfo, TrackFeature, TrackAnalysis } = this.state;
    return (
      <MainContentWrapper>
        {TrackInfo.album && TrackFeature.id && TrackAnalysis.track ? (
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
                <h3>{formatDuration(TrackFeature.duration_ms)}</h3>
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
          </>
        ) : null}
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

const formatDuration = millis => {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export const parsePitchClass = note => {
  const key = ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"];
  return key[note];
};