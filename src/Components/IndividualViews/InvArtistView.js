import React, { Component } from "react";
import styled from "styled-components";
import Button from "../../UI/Button";
import { MainContentWrapper } from "../../UI/MainContentWrapper";
import theme from "../../UI/theme";
import Track from "../Profile/Track";

const { colors, fontSizes } = theme;

export default class InvArtistView extends Component {
  state = { Artist: null, artistsTopTrack: null, Followed: false };
  getArtist = artistId => {
    const token = sessionStorage.getItem("token");
    fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ Artist: data });
      });
  };

  checkFollowArtist = artistId => {
    const token = sessionStorage.getItem("token");
    fetch(
      `https://api.spotify.com/v1/me/following/contains?type=artist&ids=${artistId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    )
      .then(res => res.json())
      .then(data => this.setState({ Followed: data[0] }));
  };

  followArtist = artistId => {
    const token = sessionStorage.getItem("token");
    if (this.state.Followed) {
      fetch(
        `https://api.spotify.com/v1/me/following?type=artist&ids=${artistId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );
      this.setState({ Followed: false });
    } else {
      fetch(
        `https://api.spotify.com/v1/me/following?type=artist&ids=${artistId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );
      this.setState({ Followed: true });
    }
  };

  getArtistTopTracks = artistId => {
    const token = sessionStorage.getItem("token");
    fetch(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=CA`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ artistsTopTrack: data.tracks });
      });
  };

  componentDidMount() {
    this.getArtist(this.props.match.params.id);
    this.getArtistTopTracks(this.props.match.params.id);
    this.checkFollowArtist(this.props.match.params.id);
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
                <div className="dynamic">{Artist.followers.total}</div>
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
                UnFollow
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
  width: 70%;
  margin: 20px auto;
  h2 {
    text-align: center;
    font-size: 28px;
    font-weight: 600;
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
