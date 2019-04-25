import React from "react";
import styled from "styled-components";

import LoginPage from "./Components/LoginPage";
import Dashboard from "./Components/Dashboard";

const GlobalStyle = styled.div`
  width: 100%;
  height: 100%;
  padding: 0;
  font-family: "Montserrat", sans-serif;
  color: white;
  background-color: rgb(25, 20, 20);
`;

function App() {
  return (
    <GlobalStyle>
      <Dashboard />
    </GlobalStyle>
  );
}

export default App;
