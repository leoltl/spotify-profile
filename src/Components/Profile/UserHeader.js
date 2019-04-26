import React from "react";
import styled from "styled-components";
import theme from "../../UI/theme";
import { generateReqHeader } from "../../utils";

const { colors, fontSizes } = theme;
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
    followers: "",
    country: ""
  };

  getUserProfile = () => {
    fetch("https://api.spotify.com/v1/me", generateReqHeader("GET"))
      .then(res => res.json())
      .then(data => {
        this.setState({
          displayURL: data.images[0].url,
          product: data.product,
          followers: data.followers.total,
          username: data.id,
          country: data.country
        });
      });
  };

  componentDidMount() {
    this.getUserProfile();
  }

  render() {
    return (
      <Header>
        <img src={this.state.displayURL} alt="" />
        <br />
        <p>{this.state.username}</p>
        <UserInfo>
          <div className="follower">
            <div className="dynamic">{this.state.followers}</div>
            <p>followers</p>
          </div>
          <div className="genre">
            <div className="dynamic">{this.state.country}</div>
            <p>country</p>
          </div>
          <div className="popularity">
            <div className="dynamic">{this.state.product}</div>
            <p>product</p>
          </div>
        </UserInfo>
      </Header>
    );
  }
}

const UserInfo = styled.div`
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
    color: ${colors.offGreen};
    font-weight: 600;
    font-size: ${fontSizes.md};
    margin: 10px;
    text-transform: capitalize;
  }
`;
