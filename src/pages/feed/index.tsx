/**
 * @fileoverview 홈 컴포넌트
 *
 * Emotion의 Styled와 Css 방식을 모두 사용할 수 있습니다.
 */

import styled from "@emotion/styled";
import { Page } from "../../components/common/Page";
import Card from "../../components/home/Card";
import { hideScroll } from "../../utils/emotion/scroll";

export default function Feed() {
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
        <Greeting>
          <Title>{"둘러보기"}</Title>
          <Desc>{"다른 유저의 사진에도 도전해볼 수 있어요"}</Desc>
        </Greeting>

        <Grid>
          {posts?.map(({ imageUrl, isLiked, likeCount, username }) => {
            const post = { imageUrl, isLiked, likeCount, username };
            return <Card key={imageUrl} {...post} />;
          })}
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
  padding: 20px 16px;
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 32px;
`;
