/**
 * @fileoverview 전역 헤더 컴포넌트
 */

import styled from "@emotion/styled";
import LogoIcon from "../icons/Logo";
import { useNavigate } from "react-router-dom";

interface Props {
  icon?: React.ReactNode;
  color?: string;
}

export default function Header({ icon, color }: Props) {
  const router = useNavigate();

  return (
    <Container>
      <Button onClick={() => router("/")}>
        {icon ?? <LogoIcon color={color} />}
      </Button>
    </Container>
  );
}

/* STYLES */
const Container = styled.header<{ $color?: string }>`
  position: sticky;
  display: flex;
  align-items: center;
  width: 100%;
  height: 104px;
  padding: 64px 16px 12px 18px;
  background-color: transparent;
  z-index: 100;
`;

const Button = styled.button`
  width: auto;
  height: auto;
  background: none;
  border: none;
  padding: 0;
  outline: none;
  cursor: pointer;
`;
