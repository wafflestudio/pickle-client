/**
 * @fileoverview 라우터의 최상단에 렌더되는 루트 레이아웃 컴포넌트
 *
 * 레이아웃 컴포넌트는 페이지와 달리 <Outlet />을 이용하여 자식 라우터를 렌더합니다.
 * 루트 레이아웃에서는 emotion-normalize를 확장한 전역 스타일을 적용합니다.
 */

import { Global } from "@emotion/react";
import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";
import globalStyle from "../../utils/emotion/globalStyle";
import { useGeolocation } from "../../utils/geolocation/hooks";
import { GeolocationContext } from "./context";

export default function RootLayout() {
  const geolocationData = useGeolocation();

  return (
    <GeolocationContext.Provider value={geolocationData}>
      <Main>
        <Global styles={globalStyle} />
        <Outlet />
      </Main>
    </GeolocationContext.Provider>
  );
}

const Main = styled.main`
  position: relative;
  width: 390px;
  height: 100vh;
  overflow: hidden;
  max-width: var(--max-width);
  margin: auto;
`;
