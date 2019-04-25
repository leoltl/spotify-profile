import React from "react";
import styled from "styled-components";
import SecondaryButton from "../../UI/SecondaryButton";

const Header = styled.div`
  text-align: center;
  img {
    border-radius: 50%;
    height: 150px;
    width: 150px;
  }
  p {
    margin: 10px;
    font-size: 32px;
    font-weight: 800;
  }
`;
export default class UserHeader extends React.Component {
  state = {
    displayURL: "",
    product: "",
    followers: ""
  };

  componentDidMount() {
    fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_BEARER}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          displayURL: data.images[0].url,
          product: data.product,
          followers: data.followers.total,
          username: data.id
        });
      });
  }
  render() {
    return (
      <Header>
        <img src={this.state.displayURL} alt="" />
        <br />
        <p>{this.state.username}</p>
        {/* <div>
          <div className="followers">
            {this.state.followers}
            <span>followers</span>
          </div>
          <div className="following">
            0<span>following</span>
          </div>
          <div className="playlists">
            0<span>playlists</span>
          </div>
        </div> */}
        <br />
        <SecondaryButton>Logout</SecondaryButton>
      </Header>
    );
  }
}
