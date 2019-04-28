import React from "react";
import styled, { css } from "styled-components";

import theme from "../../UI/theme";
const { colors, fontSizes } = theme;

export const HighlightWrapper = styled.div`
  display: flex;
  justify-content: center;
  p {
    margin: 20px;
    text-transform: uppercase;
    color: ${colors.lightGrey};
    font-size: ${fontSizes.sm} !important;
  }
  .genre {
    text-transform: capitalize;
  }
  .dynamic {
    font-weight: 600;
    text-transform: capitalize;
    font-size: ${fontSizes.md}
    color: ${colors.blue};
    margin: 10px;
  }

  ${props =>
    props.user &&
    css`
      .dynamic {
        color: ${colors.offGreen};
      }
    `}
`;

const HightlightThreeColumn = props => {
  const { name, value, user } = props;
  return (
    <HighlightWrapper user={user ? user : null}>
      <div className="followers">
        <div className="dynamic">{value[0]}</div>
        <p>{name[0]}</p>
      </div>
      <div className="genre">
        <div className="dynamic">{value[1]}</div>
        <p>{name[1]}</p>
      </div>
      <div className="popularity">
        <div className="dynamic">{value[2]}</div>
        <p>{name[2]}</p>
      </div>
    </HighlightWrapper>
  );
};
export default HightlightThreeColumn;
