/**
 * @fileoverview 홈 컴포넌트
 *
 * Emotion의 Styled와 Css 방식을 모두 사용할 수 있습니다.
 */

import styled from "@emotion/styled";
import { Page } from "../../components/common/Page";
import { hideScroll } from "../../utils/emotion/scroll";
import { useGetPostQuery } from "../../services/repositories/post";
import { useParams } from "react-router-dom";
import Post from "../../components/feed/Post";

export default function Detail() {
  // 패스파람 가져오기
  const { feedId } = useParams();
  const { data: feed } = useGetPostQuery(Number(feedId!));

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
      <Contents>
        <Post
          date={date}
          isOdd={true}
          username={username}
          imageUrl={imageUrl}
          likeCount={likeCount}
          description={description}
          challengeCount={challengeCount}
        />
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
