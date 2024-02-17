/**
 * @fileoverview 라우터의 최상단에 렌더되는 루트 레이아웃 컴포넌트
 *
 * 레이아웃 컴포넌트는 페이지와 달리 <Outlet />을 이용하여 자식 라우터를 렌더합니다.
 * 루트 레이아웃에서는 emotion-normalize를 확장한 전역 스타일을 적용합니다.
 */

import { Global } from "@emotion/react";
import globalStyle from "../../utils/emotion/globalStyle";
import { Outlet } from "react-router-dom";
import styled from "@emotion/styled";

export default function RootLayout() {
  return (
    <>
      <Main>
        <Global styles={globalStyle} />
        <Outlet />
      </Main>
    </>
  );
}

const Main = styled.main`
  position: relative;
  width: 100vw;
  overflow: hidden;
  max-width: var(--max-width);
  margin: auto;
`;
