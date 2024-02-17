/**
 * @fileoverview 홈 컴포넌트
 *
 * Emotion의 Styled와 Css 방식을 모두 사용할 수 있습니다.
 */

import styled from "@emotion/styled";
import Post from "../../components/feed/Post";
import { Page } from "../../components/common/Page";
import { hideScroll } from "../../utils/emotion/scroll";

export default function Feed() {
  const posts = [
    {
      username: "cocoball",
      date: "24 2 17 SAT",
      isLiked: true,
      likeCount: 20,
      challengeCount: 3,
      imageUrl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMjAxMjVfMjAy/MDAxNjQzMTAyOTk2NjE0.gw_H_jjBM64svaftcnheR6-mHHlmGOyrr6htAuxPETsg.8JJSQNEA5HX2WmrshjZ-VjmJWqhmgE40Qm5csIud9VUg.JPEG.minziminzi128/IMG_7374.JPG?type=w800",
      description:
        "이것은 50자 테스트입니다람쥐 와커톤 파이팅 피클팀 최고입니다 파이팅팅팅 50자 채워보자",
    },
    {
      username: "cocoball",
      date: "24 2 17 SAT",
      isLiked: true,
      likeCount: 20,
      challengeCount: 3,
      imageUrl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMjAxMjVfMjAy/MDAxNjQzMTAyOTk2NjE0.gw_H_jjBM64svaftcnheR6-mHHlmGOyrr6htAuxPETsg.8JJSQNEA5HX2WmrshjZ-VjmJWqhmgE40Qm5csIud9VUg.JPEG.minziminzi128/IMG_7374.JPG?type=w800",
      description:
        "이것은 50자 테스트입니다람쥐 와커톤 파이팅 피클팀 최고입니다 파이팅팅팅 50자 채워보자",
    },
    {
      username: "cocoball",
      date: "24 2 17 SAT",
      isLiked: true,
      likeCount: 20,
      challengeCount: 3,
      imageUrl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMjAxMjVfMjAy/MDAxNjQzMTAyOTk2NjE0.gw_H_jjBM64svaftcnheR6-mHHlmGOyrr6htAuxPETsg.8JJSQNEA5HX2WmrshjZ-VjmJWqhmgE40Qm5csIud9VUg.JPEG.minziminzi128/IMG_7374.JPG?type=w800",
      description:
        "이것은 50자 테스트입니다람쥐 와커톤 파이팅 피클팀 최고입니다 파이팅팅팅 50자 채워보자",
    },
  ];

  return (
    <Main css={hideScroll}>
      <Contents>
        <Greeting>
          <Title>{"둘러보기"}</Title>
          <Desc>{"현재 위치에서 가까운 게시물이 보입니다."}</Desc>
        </Greeting>

        <Grid>
          {posts?.map(
            (
              {
                date,
                isLiked,
                username,
                imageUrl,
                likeCount,
                description,
                challengeCount,
              },
              index,
            ) => {
              const post = {
                date,
                isLiked,
                username,
                imageUrl,
                likeCount,
                description,
                challengeCount,
              };
              return <Post {...post} isOdd={index % 2 !== 0} />;
            },
          )}
        </Grid>
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
  margin-bottom: 120px;
`;

const Greeting = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px 16px 0;
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 32px;
`;
