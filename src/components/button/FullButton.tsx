import styled from "@emotion/styled";
import { ButtonBase } from "./ButtonBase";
import { ButtonHTMLAttributes, PropsWithChildren, useMemo } from "react";
import { css } from "@emotion/react";

type FullProps = PropsWithChildren &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    theme?: "default" | "black" | "white" | "stroked" | "text";
  };

export function FullButton({
  children,
  theme = "default",
  disabled,
  ...props
}: FullProps) {
  const themeCss = useMemo(() => {
    switch (theme) {
      case "default":
        return css`
          color: black;
          background-color: #d9d9d9;
        `;
      case "black":
        return css`
          color: white;
          background-color: #1e1e1e;
          border: 1px solid #1e1e1e;
        `;
      case "white":
        return css`
          color: black;
          background-color: white;
          border: 1px solid white;
        `;
      case "stroked":
        return css`
          color: white;
          background-color: transparent;
          border: 1px solid white;
        `;
    }
  }, [theme]);

  return (
    <Button css={themeCss} disabled={disabled} {...props}>
      {children}
    </Button>
  );
}

const Button = styled(ButtonBase)`
  width: 100%;
  height: 48px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;

  color: black;
  text-align: center;
  font-family: "Spoqa Han Sans Neo";
  font-size: 16px;
  font-weight: 400;
`;
