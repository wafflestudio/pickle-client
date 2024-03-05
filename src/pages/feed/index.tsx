/**
 * @fileoverview 홈 컴포넌트
 *
 * Emotion의 Styled와 Css 방식을 모두 사용할 수 있습니다.
 */

import styled from "@emotion/styled";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Fallback from "../../components/common/Fallback";
import { Page } from "../../components/common/Page";
import Post from "../../components/feed/Post";
import { GeolocationContext } from "../../layouts/root/context";
import { PostApiSchema } from "../../services/apis/post";
import { useGetPostListQuery } from "../../services/repositories/post";
import { hideScroll } from "../../utils/emotion/scroll";

export default function Feed() {
  const { position, error, status } = useContext(GeolocationContext);

  if (status === "pending")
    return <Fallback message="위치 정보 불러오는 중..." />;
  else if (status === "error")
    return (
      <Fallback
        message={`위치 정보를 불러오지 못했습니다.\n${error.message}`}
      />
    );
  else if (status === "success") return <FeedWithGps position={position} />;
}

interface FeedWithGpsProps {
  position: GeolocationPosition;
}

export function FeedWithGps({ position }: FeedWithGpsProps) {
  const { latitude, longitude } = position.coords;
  const navigate = useNavigate();
  const observer = useRef<IntersectionObserver | null>(null);
  const [cursor, setCursor] = useState("");
  const posts = useRef<PostApiSchema["getPostList"]["response"]["results"]>([]);
  const postIdSet = useRef<Set<number>>(new Set());
  const updatedAt = useRef<number>(0);

  const {
    data: feedList,
    isLoading,
    dataUpdatedAt,
  } = useGetPostListQuery({
    latitude,
    longitude,
    cursor,
    limit: 10,
  });

  if (updatedAt.current !== dataUpdatedAt) {
    updatedAt.current = dataUpdatedAt;
    const addedPosts =
      feedList?.results.filter(({ id }) => !postIdSet.current.has(id)) ?? [];
    posts.current = [...posts.current, ...addedPosts];
    addedPosts.forEach(({ id }) => postIdSet.current.add(id));
  }

  useEffect(() => {
    if (isLoading) return;

    const observerOptions = {
      root: null,
      rootMargin: "20px",
      threshold: 1,
    };

    const handleObserver: IntersectionObserverCallback = (entities) => {
      const target = entities[0];
      if (target.isIntersecting && !isLoading) {
        setCursor(feedList?.next ?? "");
      }
    };

    observer.current = new IntersectionObserver(
      handleObserver,
      observerOptions,
    );

    if (observer.current !== null && feedList?.next) {
      observer.current.observe(document.getElementById("observe")!); // 타입 단언을 사용하여 null 이 아님을 보장
    }

    return () => {
      observer.current?.disconnect();
    };
  }, [isLoading, feedList]);

  return (
    <Main css={hideScroll}>
      <Contents>
        <Greeting>
          <Title>{"둘러보기"}</Title>
          <Desc>{"현재 위치에서 가까운 게시물이 보입니다."}</Desc>
        </Greeting>
        {posts.current.length ? (
          <Grid>
            {posts.current.map(
              (
                {
                  id,
                  created_at: date,
                  image: imageUrl,
                  text: description,
                  author_name: username,
                  like_count: likeCount,
                  challenge_count: challengeCount,
                }: PostApiSchema["getPostList"]["response"]["results"][0],
                index: number,
              ) => {
                const post = {
                  id,
                  date,
                  username,
                  imageUrl,
                  likeCount,
                  description,
                  challengeCount,
                };
                return (
                  <Post
                    {...post}
                    key={id}
                    isOdd={index % 2 !== 0}
                    onClick={() => navigate(`/feed/${id}`)}
                  />
                );
              },
            )}
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
