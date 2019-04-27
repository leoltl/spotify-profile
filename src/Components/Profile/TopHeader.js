import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Button from "../../UI/Button";

const TopHeader = props => {
  return (
    <ListHeader>
      <h2>{props.title}</h2>

      <Button className="button">
        <Link to={props.to}>See more</Link>
      </Button>
    </ListHeader>
  );
};

export default TopHeader;

const ListHeader = styled.div`
  display: flex;
  align-items: center;
  h2 {
    font-weight: 600;
  }
  .button {
    margin-left: auto;
  }
`;
