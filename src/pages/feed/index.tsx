/**
 * @fileoverview 홈 컴포넌트
 *
 * Emotion의 Styled와 Css 방식을 모두 사용할 수 있습니다.
 */

import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import Post from "../../components/feed/Post";
import { Page } from "../../components/common/Page";
import { PostSchema } from "../../services/apis/post";
import { hideScroll } from "../../utils/emotion/scroll";
import { useGetPostListQuery } from "../../services/repositories/post";

export default function Feed() {
  const observer = useRef<IntersectionObserver | null>(null);
  const [cursor, setCursor] = useState("");
  const [latitude, setLatitude] = useState(37.50324);
  const [longitude, setLongitude] = useState(127.03996);
  const [isFetching, setIsFetching] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [posts, setPosts] = useState<
    PostSchema["getPostList"]["response"]["results"]
  >([]);

  const { data: feedList, isLoading } = useGetPostListQuery({
    latitude,
    longitude,
    cursor,
    limit: 3,
  });

  // TODO: 무한 스크롤 디버깅해야함
  // 로딩처리
  useEffect(() => {
    const fetchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            setLatitude(lat);
            setLongitude(lng);
          },
          () => {
            console.error("위치 정보를 가져오는데 실패했습니다.");
            setLoadingLocation(false);
          },
        );
      } else {
        console.error("브라우저가 위치 정보를 지원하지 않습니다.");
        setLoadingLocation(false);
      }
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    if (!feedList) return;
    setPosts((prevPosts) => [...prevPosts, ...feedList.results]);
    setIsFetching(false);
  }, [feedList]);

  useEffect(() => {
    if (!isFetching || isLoading) return;

    const observerOptions = {
      root: null,
      rootMargin: "20px",
      threshold: 0.5,
    };

    const handleObserver: IntersectionObserverCallback = (entities) => {
      const target = entities[0];
      if (target.isIntersecting) {
        setIsFetching(true);
        setCursor(feedList?.next ?? "");
      }
    };

    observer.current = new IntersectionObserver(
      handleObserver,
      observerOptions,
    );
    if (observer.current && feedList?.next) {
      observer.current.observe(document.getElementById("observe")!); // 타입 단언을 사용하여 null 이 아님을 보장
    }

    return () => {
      observer.current?.disconnect();
    };
  }, [isFetching, isLoading, feedList]);

  return (
    <Main css={hideScroll}>
      <Contents>
        <Greeting>
          <Title>{"둘러보기"}</Title>
          <Desc>{"현재 위치에서 가까운 게시물이 보입니다."}</Desc>
        </Greeting>

        {loadingLocation ? (
          <>로딩중..</>
        ) : (
          <>
            {posts?.length ? (
              <Grid>
                {posts.map(
                  (
                    {
                      id,
                      updated_at: date,
                      image: imageUrl,
                      text: description,
                      author_name: username,
                      like_count: likeCount,
                      challenge_count: challengeCount,
                    }: PostSchema["getPostList"]["response"]["results"][0],
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
                      <Post {...post} key={imageUrl} isOdd={index % 2 !== 0} />
                    );
                  },
                )}
                <Observer id="observe" />
              </Grid>
            ) : (
              <NoResults>😥 게시물이 없습니다. 😥</NoResults>
            )}
          </>
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
