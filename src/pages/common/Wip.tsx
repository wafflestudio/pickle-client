/**
 * @fileoverview Working-In-Progress 페이지
 *
 * 아직 작업 중인 페이지를 표시합니다. 색상과 텍스트를 변경할 수 있습니다.
 */

import styled from "@emotion/styled";

type WipProps = {
  name: string;
  color?: string;
};

export default function Wip({ name, color }: WipProps) {
  return (
    <Main style={{ backgroundColor: color ?? "white" }}>
      {name} on progress
    </Main>
  );
}

const Main = styled.main`
  width: 100%;
  height: 400px;
  flex-grow: 0;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
