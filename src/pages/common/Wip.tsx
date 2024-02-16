/**
 * @fileoverview Working-In-Progress 페이지
 *
 * 아직 작업 중인 페이지를 표시합니다. 색상과 텍스트를 변경할 수 있습니다.
 */

import styled from "@emotion/styled";
import { Page } from "../../components/common/Page";

type WipProps = {
  name: string;
  color?: string;
};

export default function Wip({ name, color }: WipProps) {
  return (
    <Main style={{ backgroundColor: color ?? "white" }}>
      {name} on progress (modified)
    </Main>
  );
}

const Main = styled(Page)`
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
