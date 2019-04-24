import React, { Component } from "react";
import styled from "styled-components";

import theme from "../UI/theme";
import Button from "../UI/PrimaryButton";

const { fontSizes, colors, spacing } = theme;

const Login = styled.div`
  width: 100%;
  height: 100%
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  h1 {
    color: ${colors.white};
    font-size: ${fontSizes.xxl};
    font-weight: 1000;
    margin: ${spacing.sm}
  }
`;

export default class LoginPage extends Component {
  render() {
    return (
      <Login>
        <h1>Spotify Profile</h1>
        <Button>Log in To Spotify</Button>
      </Login>
    );
  }
}
