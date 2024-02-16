import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { HTMLAttributes, PropsWithChildren, useMemo } from "react";

/*
 * Base
 */
const ButtonBase = styled.button`
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

/*
 * Full
 */
const ButtonFullBase = styled(ButtonBase)`
  width: 100%;
  height: 48px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type FullProps = PropsWithChildren &
  HTMLAttributes<HTMLButtonElement> & {
    theme?: "default" | "filled";
  };

function Full({ children, theme = "default", ...props }: FullProps) {
  const themeCss = useMemo(() => {
    switch (theme) {
      case "default":
        return css`
          color: black;
          background-color: #f5f5f5;
        `;
      case "filled":
        return css`
          color: white;
          background-color: #1e1e1e;
        `;
    }
  }, [theme]);

  return (
    <ButtonFullBase css={themeCss} {...props}>
      {children}
    </ButtonFullBase>
  );
}

/*
 * Default Export
 */
const Button = {
  Full,
};

export default Button;
