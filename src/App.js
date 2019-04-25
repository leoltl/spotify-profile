import React from "react";
import styled from "styled-components";

import LoginPage from "./Components/LoginPage";
import Profile from "./Components/Profile/Profile";

const GlobalStyle = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 0;
  font-family: "Montserrat", sans-serif;
  color: white;
  background-color: rgb(25, 20, 20);
`;

function App() {
  return (
    <GlobalStyle>
      <Profile />
    </GlobalStyle>
  );
}

export default App;
