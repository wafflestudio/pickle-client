/**
 * @fileoverview 홈 컴포넌트
 *
 * Emotion의 Styled와 Css 방식을 모두 사용할 수 있습니다.
 */

import styled from "@emotion/styled";
import { Page } from "../../components/common/Page";
import Header from "../../components/common/Header";
// import { useChallengeQuery } from "../../services/repositories/challenge";

export default function Home() {
  // const { isLoading, data: challenge } = useChallengeQuery(1);
  // console.log(challenge);
  // console.log(isLoading);

  return (
    <Main>
      <Header />
    </Main>
  );
}

const Main = styled(Page)`
  display: flex;
  flex-direction: column;
  height: calc(100vh - var(--nav-height) - var(--nav-bottom-margin));
`;
