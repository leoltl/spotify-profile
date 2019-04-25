import React from "react";
import styled from "styled-components";

import LoginPage from "./Components/LoginPage";
import Dashboard from "./Components/Dashboard";
import { thisTypeAnnotation } from "@babel/types";

const GlobalStyle = styled.div`
  width: 100%;
  height: 100%;
  padding: 0;
  font-family: "Montserrat", sans-serif;
  color: white;
  background-color: rgb(25, 20, 20);
`;

class App extends React.Component {
  state = { token: null };
  componentDidMount() {
    let token = this.getHashParams(window.location.hash);
    if (token.access_token) {
      localStorage.setItem("token", token.access_token);
      localStorage.setItem("expires", token.expires_in);

      this.setState({ token: token });
    }
  }

  render() {
    console.log(this.state.token);
    return (
      <GlobalStyle>
        {this.state.token ? <Dashboard /> : <LoginPage />}
      </GlobalStyle>
    );
  }

  getHashParams = url => {
    const hashParams = {};
    let e;
    const r = /([^&;=]+)=?([^&;]*)/g;
    const q = url.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  };
}

export default App;
