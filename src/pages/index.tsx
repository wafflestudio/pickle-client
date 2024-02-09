import { css } from "@emotion/react";
import styled from "@emotion/styled";

export default function Home() {
  return (
    <Main>
      <h1 css={heading}>예지누나 화이팅~</h1>
    </Main>
  );
}

const Main = styled.main`
  position: relative;
  width: 100vw;
  min-height: 100vh;
  background-color: #f0f0f0;
`;

const heading = css`
  font-size: 2rem;
  font-weight: 700;
  font-family: sans-serif;
`;
