import React from "react";
import styled from "styled-components";

import LoginPage from "./Components/LoginPage";
import Dashboard from "./Components/Dashboard";

import { getHashParams } from "./utils";

const GlobalStyle = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 0 70px 0;
  font-family: "Montserrat", sans-serif;
  color: white;
  background-color: rgb(25, 20, 20);
`;

class App extends React.Component {
  state = { token: false };
  componentDidMount() {
    let token = getHashParams(window.location.hash);
    if (token.access_token) {
      sessionStorage.setItem("token", token.access_token);
      this.setState({ token: token });
    }
  }

  render() {
    return (
      <GlobalStyle>
        {this.state.token ? <Dashboard /> : <LoginPage />}
      </GlobalStyle>
    );
  }
}

export default App;
