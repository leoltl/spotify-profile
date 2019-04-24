import styled from "styled-components";
import theme from "./theme";
const { colors } = theme;

const PrimaryButton = styled.a`
  display: inline-block;
  background-color: ${colors.green};
  color: ${colors.white};
  border-radius: 30px;
  padding: 17px 35px;
  margin: 20px 0 70px;
  min-width: 160px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-align: center;
  cursor: pointer;
  &:hover,
  &:focus {
    background-color: ${colors.offGreen};
  }
`;

export default PrimaryButton;
