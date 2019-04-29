import React, { Component } from "react";
import styled from "styled-components";
import FeatureTable from "./FeatureTable";
import Button from "../../UI/Button";
import { generateReqHeader } from "../../utils";

class FeatureTableContainer extends Component {
  constructor() {
    super();
    this.state = { showRecommendation: false, ListOfAudioFeature: null };
  }

  toggleShowRecommendation = () => {
    this.setState(prevState => ({
      showRecommendation: !prevState.showRecommendation
    }));
  };

  getAudioFeature = id => {
    let idsString = (Array.isArray(id) ? id : [id]).reduce(
      (accumulator, current) => accumulator + "," + current
    );
    fetch(
      `https://api.spotify.com/v1/audio-features?ids=${idsString}`,
      generateReqHeader("get")
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ ListOfAudioFeature: data.audio_features });
      });
  };

  componentDidMount() {
    this.getAudioFeature(this.props.ids);
  }

  render() {
    if (this.state.ListOfAudioFeature) {
      return (
        <FeaturetableContainer>
          <FeatureTable
            ListOfAudioFeature={this.state.ListOfAudioFeature}
            showRecommendation={this.state.showRecommendation}
            small={this.props.small ? this.props.small : null}
            ids={
              Array.isArray(this.props.ids) ? this.props.ids : [this.props.ids]
            }
          />
          {this.state.showRecommendation ? (
            <Button onClick={this.toggleShowRecommendation}>
              Hide recommendations
            </Button>
          ) : (
            <Button onClick={this.toggleShowRecommendation}>
              {Array.isArray(this.props.ids)
                ? "Show recommendations based on this playlist"
                : "Show recommendations based on this song"}
            </Button>
          )}
        </FeaturetableContainer>
      );
    }
    return null;
  }
}

export default FeatureTableContainer;

const FeaturetableContainer = styled.div`
  margin: 40px auto;
  button {
    text-align: center;
    margin: 30px auto 0 auto;
  }
  @media screen and (min-width: 1000px) {
    width: 70%;
  }
`;
