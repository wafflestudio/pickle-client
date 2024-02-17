import styled from "@emotion/styled";

/*
 * Base
 */
export const ButtonBase = styled.button`
  border: none;
  background-color: transparent;

  cursor: pointer;
  transition: 0.1s ease;

  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.6;
  }
`;
