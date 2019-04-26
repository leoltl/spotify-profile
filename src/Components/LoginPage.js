import React, { Component } from "react";
import styled from "styled-components";

import theme from "../UI/theme";
import Button from "../UI/Button";

const { fontSizes, colors, spacing } = theme;

const Login = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  h1 {
    color: ${colors.white};
    font-size: ${fontSizes.xxl};
    font-weight: 1000;
    margin: ${spacing.sm};
  }
`;

export default class LoginPage extends Component {
  render() {
    const url =
      "https://accounts.spotify.com/authorize?client_id=8a53001c7d644fd7ab229d509039ec22&redirect_uri=http://localhost:3000&scope=user-read-private%20user-read-email%20user-read-birthdate%20user-top-read%20user-follow-read%20user-follow-modify&response_type=token";
    return (
      <Login>
        <h1>Spotify Profile</h1>
        <a href={url}>
          <Button primary>Grant one-time access to Spotify</Button>
        </a>
      </Login>
    );
  }
}
