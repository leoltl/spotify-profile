import React, { Component } from "react";
import styled from "styled-components";
import Button from "../../UI/Button";
import { MainContentWrapper } from "../../UI/MainContentWrapper";
import TrackList from "../Common/TrackList";
import { generateReqHeader, formatComma } from "../../utils";
import FetchData from "../Common/FetchData";
import HighlightThreeColumn from "../Common/HighlightThreeColumn";

const Header = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    border-radius: 50%;
    height: 250px;
    width: 250px;
    margin-bottom: 20px;
  }
  h3 {
    margin: 10px;
    font-size: 32px;
    font-weight: 800;
  }
`;

const Body = styled.div`
  h2 {
    text-align: center;
    font-size: 24px;
    font-weight: 600;
  }
  @media screen and (min-width: 1000px) {
    width: 70%;
    margin: 20px auto;
    h2 {
      font-size: 28px;
      font-weight: 600;
    }
  }
`;

export default class InvArtistView extends Component {
  constructor() {
    super();
    this.state = { Artist: null, artistsTopTrack: null, Followed: false };
  }

  getArtist = artistId => {
    fetch(
      `https://api.spotify.com/v1/artists/${artistId}`,
      generateReqHeader("GET")
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ Artist: data });
      });
  };

  getFollowStatus = artistId => {
    fetch(
      `https://api.spotify.com/v1/me/following/contains?type=artist&ids=${artistId}`,
      generateReqHeader("GET")
    )
      .then(res => res.json())
      .then(data => this.setState({ Followed: data[0] }));
  };

  followArtist = artistId => {
    let reqMethod = this.state.Followed ? "DELETE" : "PUT";
    fetch(
      `https://api.spotify.com/v1/me/following?type=artist&ids=${artistId}`,
      generateReqHeader(reqMethod)
    ).then(this.setState({ Followed: !this.state.Followed }));
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.getArtist(id);
    this.getFollowStatus(id);
  }

  render() {
    const ArtistId = this.props.match.params.id;
    let { Artist } = this.state;
    if (Artist) {
      return (
        <MainContentWrapper>
          <Header>
            <img src={Artist.images[0].url} alt="" />
            <br />
            <h3>{Artist.name}</h3>

            <HighlightThreeColumn
              name={["followers", "Main Genre", "Popularity"]}
              value={[
                formatComma(Artist.followers.total),
                Artist.genres[0],
                Artist.popularity
              ]}
            />
            {this.state.Followed ? (
              <Button danger onClick={() => this.followArtist(Artist.id)}>
                Following
              </Button>
            ) : (
              <Button primary onClick={() => this.followArtist(Artist.id)}>
                Follow
              </Button>
            )}
          </Header>
          <Body>
            <h2>{Artist.name}'s Top 10 Tracks</h2>
            <FetchData
              url={`/artists/${ArtistId}/top-tracks`}
              method="get"
              params={{ country: "CA" }}
            >
              {({ loading, data, error }) => {
                if (error) {
                  console.error(error);
                }
                if (loading) {
                  return loading;
                }
                return (
                  <>
                    <TrackList render={data.tracks} />
                  </>
                );
              }}
            </FetchData>
          </Body>
        </MainContentWrapper>
      );
    } else {
      return null;
    }
  }
}
