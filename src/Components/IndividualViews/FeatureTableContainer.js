import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";

import FeatureTable from "./FeatureTable";
import FeatureTableRecommendation from "./FeatureTableRecommendation";

import Button from "../../UI/Button";
import { BarLoader } from "react-spinners";

class FeatureTableContainer extends Component {
  constructor() {
    super();
    this.state = {
      showRecommendation: false,
      featuresOutput: null,
      ListOfRecommendations: null
    };
  }

  componentDidMount() {
    this.setAudioFeatureAndRecommendations(this.props.ids);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.ids !== this.props.ids) {
      this.setAudioFeatureAndRecommendations(this.props.ids);
    }
  }

  setAudioFeatureAndRecommendations = async ids => {
    const idsString = (Array.isArray(ids) ? ids : [ids]).reduce(
      (accumulator, current) => accumulator + "," + current
    );

    const featuresOutput = this.featuresOutput(
      await this.getAudioFeatures(idsString)
    );

    // Spotify recommendation api only takes max 5 tracks as seed to generate recommendation
    const idsTrimmedString = (Array.isArray(ids)
      ? ids.slice(0, 5)
      : [ids]
    ).reduce((accumulator, current) => accumulator + "," + current);
    const recommendations = await this.getRecommendation(
      idsTrimmedString,
      featuresOutput
    );

    this.setState({
      ListOfRecommendations: recommendations,
      featuresOutput: featuresOutput
    });
  };

  getAudioFeatures(ids) {
    return axios
      .get("https://api.spotify.com/v1/audio-features", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        },
        params: {
          ids: ids
        }
      })
      .then(res => res.data.audio_features);
  }

  getRecommendation(ids, featuresOutput) {
    return axios
      .get("https://api.spotify.com/v1/recommendations", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        },
        params: {
          seed_tracks: ids,
          target_acousticness: featuresOutput[0],
          target_danceability: featuresOutput[1],
          target_energy: featuresOutput[2],
          target_instrumentalness: featuresOutput[3],
          target_liveness: featuresOutput[4],
          target_speechiness: featuresOutput[5],
          target_valence: featuresOutput[6],
          limit: 10,
          market: "CA"
        }
      })
      .then(res => res.data.tracks);
  }

  //Map a track's or a list of tracks 's audio feature to a single feature array for rendering feature table
  featuresOutput = ListOfAudioFeature => {
    const FEATURES = [
      "acousticness",
      "danceability",
      "energy",
      "instrumentalness",
      "liveness",
      "speechiness",
      "valence"
    ];
    return FEATURES.map(feature => {
      return (
        (ListOfAudioFeature.map(track => track[feature]).reduce(
          (acc, cur) => acc + cur
        ) /
          ListOfAudioFeature.length) *
        100
      );
    });
  };

  toggleShowRecommendation = () => {
    this.setState(prevState => ({
      showRecommendation: !prevState.showRecommendation
    }));
  };

  render() {
    const {
      featuresOutput,
      showRecommendation,
      ListOfRecommendations
    } = this.state;
    if (featuresOutput && ListOfRecommendations) {
      return (
        <FeaturetableContainer>
          <FeatureTable
            featuresOutput={featuresOutput}
            small={this.props.small ? this.props.small : null}
          />
          <FeatureTableRecommendation
            showRecommendation={showRecommendation}
            listOfRecommendations={ListOfRecommendations}
          />
          {showRecommendation ? (
            <div className="button">
              <Button onClick={this.toggleShowRecommendation}>
                Hide recommendations
              </Button>
            </div>
          ) : (
            <div className="button">
              <Button onClick={this.toggleShowRecommendation}>
                {Array.isArray(this.props.ids)
                  ? "Show recommendations based on this playlist"
                  : "Show recommendations based on this song"}
              </Button>
            </div>
          )}
        </FeaturetableContainer>
      );
    }
    return <BarLoader loading sizeUnit={"px"} size={150} color={"#1ed760"} />;
  }
}

export default FeatureTableContainer;

const FeaturetableContainer = styled.div`
  margin: 40px auto;
  .button {
    text-align: center;
    margin: 30px auto 0 auto;
  }
  @media screen and (min-width: 1000px) {
    width: 70%;
  }
`;
