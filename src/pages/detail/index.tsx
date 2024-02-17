/**
 * @fileoverview 홈 컴포넌트
 *
 * Emotion의 Styled와 Css 방식을 모두 사용할 수 있습니다.
 */

import { useState } from "react";
import styled from "@emotion/styled";
import { Page } from "../../components/common/Page";
import { hideScroll } from "../../utils/emotion/scroll";
import { useGetPostQuery } from "../../services/repositories/post";
import { useParams } from "react-router-dom";
import Post from "../../components/feed/Post";
import ArrowUpIcon from "../../components/icons/ArrowUp";
import { useGetChallengeList } from "../../services/repositories/homeChallenge";
import CharacterIcon from "../../components/icons/Character";

export default function Detail() {
  // 패스파람 가져오기
  const { feedId } = useParams();
  const [latitude] = useState(37.50324);
  const [longitude] = useState(127.03996);
  const { data: feed } = useGetPostQuery(Number(feedId!));
  const { data: challengeList } = useGetChallengeList({ latitude, longitude });

  const [open, setOpen] = useState(false);

  console.log(challengeList);

  if (!feed) return null;
  const {
    created_at: date,
    author_name: username,
    image: imageUrl,
    like_count: likeCount,
    text: description,
    challenge_count: challengeCount,
  } = feed;

  return (
    <Main css={hideScroll}>
      <Post
        date={date}
        isOdd={true}
        username={username}
        imageUrl={imageUrl}
        likeCount={likeCount}
        description={description}
        challengeCount={challengeCount}
      />
      <Contents $open={open}>
        <InnerContainer>
          <PositionContainer>
            <Icon $open={open} onClick={() => setOpen(!open)}>
              <ArrowUpIcon />
            </Icon>
            <Title>{"챌린지에 도전해보세요."}</Title>
            <Desc>
              {
                "사진 속의 장소에 가서 비슷한 사진을 찍으면\n비밀 메시지를 볼 수 있어요."
              }
            </Desc>
          </PositionContainer>
          <CharacterIcon />
        </InnerContainer>

        {open && <Button>{"도전하기"}</Button>}
      </Contents>
    </Main>
  );
}

const Main = styled(Page)`
  display: flex;
  position: relative;
  flex-direction: column;
  height: calc(
    100vh -
      (var(--nav-height) + var(--nav-bottom-margin) + var(--header-height))
  );
`;

const Contents = styled.div<{ $open: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  width: 100%;
  border-radius: 20px 20px 0px 0px;
  background: #f4f3f0;
  height: ${({ $open }) => ($open ? "506px" : "160px")};
  max-height: 90vh;
  padding: 24px 28px;
  box-shadow: 0px 0px 12px 0px rgba(29, 29, 29, 0.1);
  transition: all 0.3s ease;
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 28px;
`;

const PositionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Icon = styled.div<{ $open: boolean }>`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ $open }) => ($open ? "transform: rotate(180deg);" : "")}
`;

const Title = styled.span`
  color: var(--kakao-logo, #000);
  font-family: "Spoqa Han Sans Neo";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 12px;
`;

const Desc = styled.span`
  color: #797979;
  font-family: "Spoqa Han Sans Neo";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  margin-top: 10px;
  white-space: pre-line;
`;

const Button = styled.button`
  display: flex;
  width: 100%;
  height: 48px;
  padding: 12px 0px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  border: none;
  background: none;
  cursor: pointer;
  outline: none;
  border-radius: 4px;
  background: #1e1e1e;
  color: #fff;
  text-align: center;
  font-family: "Spoqa Han Sans Neo";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
