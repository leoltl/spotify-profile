import styled from "styled-components";

export const ContentCardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media screen and (min-width: 1000px) {
    display: flex;
    width: 80%;
    margin: 0 auto;
    flex-wrap: wrap;
  }
`;
