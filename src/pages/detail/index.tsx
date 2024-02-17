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
import { useGetRank } from "../../services/repositories/homeChallenge";
import CharacterIcon from "../../components/icons/Character";
import FlagFillIcon from "../../components/icons/FlagFill";
import { HomeChallengeSchema } from "../../services/apis/homeChallenge";
import ProfileIcon from "../../components/icons/Profile";

export default function Detail() {
  // 패스파람 가져오기
  const { feedId } = useParams();
  const { data: feed } = useGetPostQuery(Number(feedId!));
  const { data: rankList } = useGetRank(Number(feedId!));

  const [open, setOpen] = useState(false);

  console.log(feed);
  console.log(rankList);

  if (!feed) return null;
  const {
    created_at: date,
    author_name: username,
    image: imageUrl,
    like_count: likeCount,
    text: description,
    challenge_count: challengeCount,
    my_challenge_id: isChallenged,
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

        {open && (
          <Challenges>
            {rankList
              ?.slice(0, 3)
              ?.map(
                (
                  {
                    image,
                    similarity,
                    username: challengedUsername,
                  }: HomeChallengeSchema["getRank"]["response"][0],
                  index: number,
                ) => {
                  return (
                    <Challenge>
                      <ChallText>{`${index + 1}위`}</ChallText>
                      {image ? (
                        <ChallImage src={image} alt="결과 사진" />
                      ) : (
                        <ProfileIcon width={48} height={48} />
                      )}
                      <ChallDetail>
                        <ChallText>{`${similarity ?? " - "}점`}</ChallText>
                        <UserInfo>
                          <ProfileIcon width={20} height={20} />
                          <Username>{challengedUsername}</Username>
                        </UserInfo>
                      </ChallDetail>
                    </Challenge>
                  );
                },
              )}
          </Challenges>
        )}

        {open && (
          <>
            {isChallenged ? (
              // 기록 받아와야하는데 일단 후순위
              <ChallengedButton>
                <FlagFillIcon color={"#FFC800"} width={22} height={22} />
                {"도전완료!"}
              </ChallengedButton>
            ) : (
              // TODO: 여기에 네비게이트
              <Button>
                <FlagFillIcon color={"#fff"} width={22} height={22} />
                {"도전하기"}
              </Button>
            )}
          </>
        )}
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

const Challenges = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 8px;
  align-items: flex-start;
  gap: 12px;
`;

const Challenge = styled.div`
  display: flex;
  align-items: flex-start;

  width: 100%;
  height: 64px;
  border-radius: 4px;
  background: #fff;
  padding: 8px;
  gap: 12px;
  box-shadow: 0px 0px 12px 0px rgba(29, 29, 29, 0.08);
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

  &:active {
    background: #3f3f3f;
  }
`;

const ChallengedButton = styled(Button)`
  color: #ffc800;
`;

const ChallImage = styled.img`
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 4px;
`;

const ChallText = styled.span`
  color: var(--kakao-logo, #000);
  font-family: "Spoqa Han Sans Neo";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const ChallDetail = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-between;
  flex-direction: column;
  gap: 4px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Username = styled.span`
  color: var(--kakao-logo, #000);
  font-family: "Spoqa Han Sans Neo";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
