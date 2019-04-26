import React, { Component } from "react";
import styled from "styled-components";
import Button from "../../UI/Button";
import { MainContentWrapper } from "../../UI/MainContentWrapper";
import theme from "../../UI/theme";
import Track from "../Profile/Track";
import { generateReqHeader } from "../../utils";

const { colors, fontSizes } = theme;

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

  getArtistTopTracks = artistId => {
    fetch(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=CA`,
      generateReqHeader("GET")
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ artistsTopTrack: data.tracks });
      });
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
    this.getArtistTopTracks(id);
    this.getFollowStatus(id);
  }

  render() {
    let { Artist, artistsTopTrack } = this.state;
    if (Artist && artistsTopTrack) {
      return (
        <MainContentWrapper>
          <Header>
            <img src={Artist.images[0].url} alt="" />
            <br />
            <h3>{Artist.name}</h3>
            <ArtistInfo>
              <div className="followers">
                <div className="dynamic">
                  {formatComma(Artist.followers.total)}
                </div>
                <p>followers</p>
              </div>
              <div className="genre">
                <div className="dynamic">{Artist.genres[0]}</div>
                <p>Genres</p>
              </div>
              <div className="popularity">
                <div className="dynamic">{Artist.popularity}%</div>
                <p>Popularity</p>
              </div>
            </ArtistInfo>
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
            {artistsTopTrack
              ? artistsTopTrack.map(track => (
                  <Track
                    imgURL={track.album.images[1].url}
                    name={track.name}
                    artist={track.artists[0].name}
                    album={track.album.name}
                    length={formatDuration(track.duration_ms)}
                    key={track.id}
                    trackId={track.id}
                  />
                ))
              : null}
          </Body>
        </MainContentWrapper>
      );
    } else {
      return null;
    }
  }
}

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

const ArtistInfo = styled.div`
  display: flex;
  justify-content: center;
  p {
    margin: 20px;
    text-transform: uppercase;
    color: ${colors.lightGrey};
    font-size: ${fontSizes.sm};
  }
  .genre {
    text-transform: capitalize;
  }
  .dynamic {
    color: ${colors.blue};
    font-weight: 600;
    font-size: ${fontSizes.md};
    margin: 10px;
  }
`;

const formatDuration = millis => {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const formatComma = number =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
