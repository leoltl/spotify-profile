import React from "react";
import styled from "styled-components";

const Header = props => {
  const { title, selectTimeRange } = props;
  return (
    <StyledHeader>
      <h2>{title}</h2>
      <ul>
        <li onClick={() => selectTimeRange("long_term")}>All Time</li>
        <li onClick={() => selectTimeRange("medium_term")}>Last 6 Months</li>
        <li onClick={() => selectTimeRange("short_term")}>Last 4 Weeks</li>
      </ul>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.div`
  margin-bottom: 20px;
  h2 {
    font-size: 30px;
    font-weight: 600;
    margin: 20px 0 30px;
    text-align: center;
  }
  ul {
    display: flex;
    margin-left: auto;
    justify-content: space-around;
    & > li {
      font-size: 14px;
      margin-left: 20px;
      text-decoration: underline;
      cursor: pointer;
    }
  }

  @media screen and (min-width: 1000px) {
    display: flex;
    width: 70%;
    margin: 0 auto;
    margin-bottom: 25px;
    padding: 0 20px 20px 20px;
  }
`;
