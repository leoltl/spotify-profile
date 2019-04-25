import React, { Component } from "react";
import styled from "styled-components";
import Button from "../../UI/Button";
import { MainContentWrapper } from "../../UI/MainContentWrapper";
import theme from "../../UI/theme";

const { colors, fontSizes } = theme;

export default class InvArtistView extends Component {
  state = { Artist: null };
  getTopTracks = artistId => {
    const token = localStorage.getItem("token");
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

  componentDidMount() {
    this.getTopTracks(this.props.match.params.id);
  }

  render() {
    let { Artist } = this.state;
    if (this.state.Artist) {
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
            <Button primary>Follow</Button>
          </Header>
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
    height: 300px;
    width: 300px;
    margin-bottom: 20px;
  }
  h3 {
    margin: 10px;
    font-size: 32px;
    font-weight: 800;
  }
  height: 100vh;
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
