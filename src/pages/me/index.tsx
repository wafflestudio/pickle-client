/**
 * @fileoverview 홈 컴포넌트
 *
 * Emotion의 Styled와 Css 방식을 모두 사용할 수 있습니다.
 */

import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Page } from "../../components/common/Page";
import { PostSchema } from "../../services/apis/post";
import { hideScroll } from "../../utils/emotion/scroll";
import { useGetMyPostListQuery } from "../../services/repositories/post";

export default function Me() {
  const [cursor] = useState("");
  const [posts, setPosts] = useState<
    PostSchema["getMyPostList"]["response"]["results"][]
  >([]);
  const { data: myFeedList, isLoading } = useGetMyPostListQuery({
    cursor,
    limit: 3,
  });

  useEffect(() => {
    setPosts(myFeedList?.results ?? []);
  }, [myFeedList?.results]);

  console.log(myFeedList, isLoading);

  return (
    <Main css={hideScroll}>
      <Contents>
        <div> 이 위치에 유저 정보 </div>

        {posts?.length ? (
          <Grid>
            {posts.map(() => {
              return <div>사진 올려야함</div>;
            })}
            <Observer id="observe" />
          </Grid>
        ) : (
          <NoResults>😥 게시물이 없습니다. 😥</NoResults>
        )}
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 32px;
`;

const NoResults = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #797979;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: center;
  margin: auto;
`;

const Observer = styled.div`
  height: 1px;
  width: 100%;
  background: transparent;
`;
