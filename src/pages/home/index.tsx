import { css } from "@emotion/react";
import styled from "@emotion/styled";

export default function Home() {
  return (
    <Page>
      <h1 css={heading}>예지누나 화이팅~</h1>
    </Page>
  );
}

const Page = styled.div`
  padding: 100px;
  background-color: #f0f0f0;
`;

const heading = css`
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  font-family: sans-serif;
`;
