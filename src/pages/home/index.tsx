/**
 * @fileoverview 홈 컴포넌트
 *
 * Emotion의 Styled와 Css 방식을 모두 사용할 수 있습니다.
 */

import styled from "@emotion/styled";
import { Page } from "../../components/common/Page";
import Card from "../../components/home/Card";
import { hideScroll } from "../../utils/emotion/scroll";
// import { useChallengeQuery } from "../../services/repositories/challenge";

export default function Home() {
  // const { isLoading, data: challenge } = useChallengeQuery(1);
  // console.log(challenge);
  // console.log(isLoading);
  const posts = [
    {
      imageUrl: "https://via.placeholder.com/150",
      username: "닉네임1930",
      likeCount: 10,
      isLiked: true,
    },
    {
      imageUrl: "https://via.placeholder.com/150",
      username: "닉네임1930",
      likeCount: 24,
      isLiked: false,
    },
    {
      imageUrl: "https://via.placeholder.com/150",
      username: "닉네임1930",
      likeCount: 24,
      isLiked: false,
    },
    {
      imageUrl: "https://via.placeholder.com/150",
      username: "닉네임1930",
      likeCount: 24,
      isLiked: true,
    },
  ];

  return (
    <Main css={hideScroll}>
      <Contents>
        <Section>
          <Title>{"오늘의 챌린지"}</Title>
          <RepresenChallenge>
            <ChallDesc>{"비밀 메시지가 기다리고 있는"}</ChallDesc>
            <ChallTitle>{"사진 속 공간을 찾아 떠나보세요!"}</ChallTitle>
            <ChallButton>{"도전하러 가기 >"}</ChallButton>
          </RepresenChallenge>
        </Section>

        <Section>
          <Title>{"더 도전해보세요!"}</Title>
          <CardGrid>
            {posts?.map(({ imageUrl, isLiked, likeCount, username }) => {
              const post = { imageUrl, isLiked, likeCount, username };
              return <Card key={imageUrl} {...post} />;
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
  flex: 1;
  gap: 48px;
  padding: 11px 16px;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: max-content;
  gap: 15px;
`;

const Title = styled.header`
  color: var(--kakao-logo, #000);
  font-family: "Spoqa Han Sans Neo";
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

// TODO: 사진
const RepresenChallenge = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 201px;
  flex-shrink: 0;
  padding: 20px 24px;
  gap: 7px;
  border-radius: 4px;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(255, 255, 255, 0) 102.74%
  );
  backdrop-filter: blur(10px);
`;

const ChallDesc = styled.span`
  color: #fff;
  font-family: "Spoqa Han Sans Neo";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ChallTitle = styled.h3`
  display: flex;
  flex: 1;
  color: #fff;
  font-family: "Spoqa Han Sans Neo";
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 130%; /* 26px */
  margin: 0;
`;

const ChallButton = styled.button`
  width: max-content;
  height: auto;
  background: none;
  border: none;
  outline: none;
  padding: 0;
  color: #fff;
  font-family: "Spoqa Han Sans Neo";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
`;
