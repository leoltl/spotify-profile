import React from "react";
import styled from "styled-components";
import FetchData from "../Common/FetchData";
import HighlightThreeColumn from "../Common/HighlightThreeColumn";

const Header = styled.div`
  text-align: center;
  & > div {
    margin: 0 auto;
  }
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

const UserHeader = () => {
  return (
    <FetchData url="https://api.spotify.com/v1/me" method="GET">
      {({ loading, data, error }) => {
        if (loading) {
          return <Header>{loading}</Header>;
        }
        if (error) {
          console.error(error);
          return;
        }
        return (
          <Header>
            <img src={data.images[0].url} alt="" />
            <br />
            <p>{data.display_name}</p>
            <HighlightThreeColumn
              user
              name={["followers", "country", "product"]}
              value={[data.followers.total, data.country, data.product]}
            />
          </Header>
        );
      }}
    </FetchData>
  );
};

export default UserHeader;
