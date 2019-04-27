import React from "react";
import styled from "styled-components";
import theme from "../../UI/theme";
import FetchData from "../Common/FetchData";

const { colors, fontSizes } = theme;
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
            <UserInfo>
              <div className="follower">
                <div className="dynamic">{data.followers.total}</div>
                <p>followers</p>
              </div>
              <div className="genre">
                <div className="dynamic">{data.country}</div>
                <p>country</p>
              </div>
              <div className="popularity">
                <div className="dynamic">{data.product}</div>
                <p>product</p>
              </div>
            </UserInfo>
          </Header>
        );
      }}
    </FetchData>
  );
};

export default UserHeader;
