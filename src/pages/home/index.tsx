/**
 * @fileoverview 홈 컴포넌트
 *
 * Emotion의 Styled와 Css 방식을 모두 사용할 수 있습니다.
 */

import styled from "@emotion/styled";
import { Page } from "../../components/common/Page";
import { hideScroll } from "../../utils/emotion/scroll";

import {
  useOhterChallengesQuery,
  useTodayChallengeQuery,
} from "../../services/repositories/challenge";
import { useGeolocation } from "../../utils/geolocation/hooks";
import TodayChallenge from "../../components/home/TodayChallenge";
import OtherChallenges from "../../components/home/OtherChallenges";

export default function Home() {
  const { position, error, status } = useGeolocation();
  if (status === "pending")
    return <Loading message="위치 정보 불러오는 중..." />;
  else if (status === "error") return <Error message={error.message} />;
  else if (status === "success") return <HomeWithGps position={position} />;
}

interface HomeWithGpsProps {
  position: GeolocationPosition;
}

function HomeWithGps({ position }: HomeWithGpsProps) {
  const { isLoading: todayChallengeLoading, data: todayChallenge } =
    useTodayChallengeQuery(position.coords);
  const { isLoading: otherChallengesLoading, data: otherChallenges } =
    useOhterChallengesQuery(position.coords);

  if (todayChallengeLoading || otherChallengesLoading)
    return <Loading message="주변 챌린지 찾는 중..." />;

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

type LoadingProps = {
  message: string;
};

function Loading({ message }: LoadingProps) {
  return <LoadingContainer>{message}</LoadingContainer>;
}

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

type ErrorProps = {
  message: string;
};
function Error({ message }: ErrorProps) {
  return <ErrorContainer>{message}</ErrorContainer>;
}

const ErrorContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;
