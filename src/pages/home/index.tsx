/**
 * @fileoverview (예시) 홈 컴포넌트
 *
 * Emotion의 Styled와 Css 방식을 모두 사용할 수 있습니다.
 */

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
