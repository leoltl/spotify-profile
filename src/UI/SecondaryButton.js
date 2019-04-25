import styled from "styled-components";
import theme from "./theme";
const { colors, fontSizes } = theme;

const SecondaryButton = styled.button`
  display: inline-block;
  background: none;
  border: 1px solid ${colors.white}
  color: ${colors.white};
  font-size: ${fontSizes.xs};
  letter-spacing: 1px;
  padding: 11px 24px
  border-radius: 40px;
  font-weight: 600;
  text-transform: uppercase;
  text-align: center;
  cursor: pointer;
  &:hover,
  &:focus {
    color: ${colors.darkGrey};
    background-color: ${colors.white};
  }
  a {
    color: ${colors.white};
    font-size: ${fontSizes.xs};
    &:hover,
    &:focus {
      color: ${colors.darkGrey};
    }
  }
`;

export default SecondaryButton;
