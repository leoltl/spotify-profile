import styled, { css } from "styled-components";
import theme from "./theme";
const { colors, fontSizes } = theme;

const Button = styled.button`
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
    a {
      color:${colors.darkGrey};
    }
  }
  a {
    text-decoration: none;
    color: ${colors.white};
    font-size: ${fontSizes.xs};
    &:hover,
    &:focus {
      color: ${colors.darkGrey};
    }
  }

  ${props =>
    props.primary &&
    css`
      display: inline-block;
      background-color: ${colors.green};
      color: ${colors.white};
      border: none;
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
    `}

    ${props =>
      props.danger &&
      css`
        text-transform: Capitalize;
        display: inline-block;
        &:hover,
        &:focus {
          border-color: #d9534f;
          background-color: #d9534f;
        }
      `}
`;

export default Button;
