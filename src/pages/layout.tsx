import { Global } from "@emotion/react";
import globalStyle from "../utils/emotion/globalStyle";
import { Outlet } from "react-router-dom";
import styled from "@emotion/styled";

export default function DefaultLayout() {
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
  min-height: 100vh;
`;
