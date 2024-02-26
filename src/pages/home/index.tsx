/**
 * @fileoverview 홈 컴포넌트
 *
 * Emotion의 Styled와 Css 방식을 모두 사용할 수 있습니다.
 */

import styled from "@emotion/styled";
import { Page } from "../../components/common/Page";
import { hideScroll } from "../../utils/emotion/scroll";

import { useContext } from "react";
import Fallback from "../../components/common/Fallback";
import OtherChallenges from "../../components/home/OtherChallenges";
import TodayChallenge from "../../components/home/TodayChallenge";
import { GeolocationContext } from "../../layouts/root/context";
import {
  useOhterChallengesQuery,
  useTodayChallengeQuery,
} from "../../services/repositories/challenge";

export default function Home() {
  const { position, error, status } = useContext(GeolocationContext);
  if (status === "pending")
    return <Fallback message="위치 정보 불러오는 중..." />;
  else if (status === "error")
    return (
      <Fallback
        message={`위치 정보를 불러오지 못했습니다.\n${error.message}`}
      />
    );
  else if (status === "success") return <HomeWithGps position={position} />;
}

interface HomeWithGpsProps {
  position: GeolocationPosition;
}

function HomeWithGps({ position }: HomeWithGpsProps) {
  const { isPending: todayChallengeLoading, data: todayChallenge } =
    useTodayChallengeQuery(position.coords);
  const { isPending: otherChallengesLoading, data: otherChallenges } =
    useOhterChallengesQuery(position.coords);

  if (todayChallengeLoading || otherChallengesLoading)
    return <Fallback message="주변 챌린지 찾는 중..." />;

  return (
    <Main css={hideScroll}>
      <Contents>
        <div css={{ height: "56px" }} />
        <TodayChallenge challenge={todayChallenge} />
        <OtherChallenges posts={otherChallenges} />
      </Contents>
    </Main>
  );
}

const Main = styled(Page)`
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  height: calc(100vh - (var(--nav-height) + var(--nav-bottom-margin)));
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;
  gap: 48px;
  margin-bottom: 120px; // TODO: 임시
`;
