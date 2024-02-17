import styled from "@emotion/styled";
import { HTMLAttributes, InputHTMLAttributes, useMemo } from "react";
import { InputBase } from "./InputBase";
import User from "../icons/User";
import Email from "../icons/Email";
import Key from "../icons/Key";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  containerProps?: HTMLAttributes<HTMLDivElement>;
  icon?: "user" | "email" | "key";
};

export default function FullInput({ icon, containerProps, ...props }: Props) {
  const hintIcon = useMemo(() => {
    if (!icon) return null;
    switch (icon) {
      case "user":
        return <User />;
      case "email":
        return <Email />;
      case "key":
        return <Key />;
      default:
        return null;
    }
  }, [icon]);

  return (
    <Container {...containerProps}>
      {hintIcon && <IconWrapper>{hintIcon}</IconWrapper>}
      <Input {...props} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 48px;
  background-color: #f5f5f5;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 24px;
`;

const IconWrapper = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled(InputBase)`
  width: 100%;
  height: 100%;
  &::placeholder {
    color: #a0a0a0;
  }
`;
