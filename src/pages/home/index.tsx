/**
 * @fileoverview 홈 컴포넌트
 *
 * Emotion의 Styled와 Css 방식을 모두 사용할 수 있습니다.
 */

import styled from "@emotion/styled";
import { Page } from "../../components/common/Page";
import Card from "../../components/home/Card";
import { hideScroll } from "../../utils/emotion/scroll";
import MainClipper from "../../components/home/MainClipper";
import { useLayoutEffect, useRef, useState } from "react";

import {
  useOhterChallengesQuery,
  useTodayChallengeQuery,
} from "../../services/repositories/challenge";
import { useGeolocation } from "../../utils/geolocation/hooks";
import { AxiosError } from "axios";

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

  if (todayChallenge instanceof AxiosError) console.log(todayChallenge.message);

  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (ref.current) {
      setHeight((ref.current?.clientWidth / 390) * 480);
    }
  }, []);

  const posts = otherChallenges;

  if (todayChallengeLoading || otherChallengesLoading)
    return <Loading message="주변 챌린지 찾는 중..." />;

  return (
    <Main css={hideScroll}>
      <Contents>
        <ClipperContainer
          ref={ref}
          $height={height}
          $url={
            "https://lh3.googleusercontent.com/p/AF1QipMAPCsCC7Gq16x3g0KIPsUQ-fwxFcDHcbUlXFhg=s1360-w1360-h1020"
          }
        >
          <Clipper>
            <MainClipper color={"red"} />
          </Clipper>

          <ColorBlender />

          <RepresenChallenge>
            <Title>{"오늘의 챌린지"}</Title>

            <ChallDesc>{"비밀 메시지가 기다리고 있는"}</ChallDesc>
            <ChallTitle>{"사진 속 공간을 찾아 떠나보세요!"}</ChallTitle>
          </RepresenChallenge>
        </ClipperContainer>

        <Section>
          <Greeting>
            <Title>{"더 도전해보세요!"}</Title>
            <Desc>{"다른 유저의 사진에도 도전해볼 수 있어요"}</Desc>
          </Greeting>

          <CardGrid>
            {posts?.map(({ id, image, is_liked, like_count, author_name }) => {
              return (
                <Card
                  key={id}
                  image={image}
                  username={author_name}
                  likeCount={like_count}
                  isLiked={is_liked}
                />
              );
            })}
          </CardGrid>
        </Section>
      </Contents>
    </Main>
  );
}

const Main = styled(Page)`
  display: flex;
  flex-direction: column;
  height: calc(
    100vh -
      (var(--nav-height) + var(--nav-bottom-margin) + var(--header-height))
  );
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;
  gap: 48px;
  margin-bottom: 120px; // TODO: 임시
`;

const ClipperContainer = styled.div<{ $url?: string; $height: number }>`
  width: 100%;
  height: ${({ $height }) => $height}px;
  background-image: url(${({ $url }) => $url});
  background-size: cover;
  padding: 0;
  margin-top: calc((-1) * var(--header-height));
  padding-top: var(--header-height);
  position: relative;
`;

const ColorBlender = styled.div`
  display: flex;
  flex: 1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: aqua;
`;

const Clipper = styled.div`
  display: flex;
  flex: 1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

const Section = styled.section`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 28px;
  padding: 0 16px;
`;

const Greeting = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.header`
  color: #000;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Desc = styled.span`
  color: #797979;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

// TODO: 사진
const RepresenChallenge = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  flex-shrink: 0;
  padding: 20px 24px;
  gap: 10px;
  border-radius: 4px;
  z-index: 10;
`;

const ChallDesc = styled.span`
  /* color: #fff; */
  text-align: right;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ChallTitle = styled.h3`
  display: flex;
  justify-content: flex-end;
  /* color: #fff; */
  text-align: right;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  margin: 0;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
`;

type LoadingProps = {
  message: string;
};

function Loading({ message }: LoadingProps) {
  return <LoadingContainer>{message}</LoadingContainer>;
}

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;

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
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;
