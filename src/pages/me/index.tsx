import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { Page } from "../../components/common/Page";
import { PostApiSchema } from "../../services/apis/post";
import { hideScroll } from "../../utils/emotion/scroll";
import ProfileIcon from "../../components/icons/Profile";
import { useUserQuery } from "../../services/repositories/user";
import {
  useGetMyLikedPostListQuery,
  useGetMyPostListQuery,
} from "../../services/repositories/post";

type AlignType = "left" | "right";

export default function Me() {
  const [cursor] = useState("");
  const [selectedTab, setSelectedTab] = useState<"myFeed" | "liked">("myFeed");
  const [posts, setPosts] = useState<
    PostApiSchema["getMyPostList"]["response"]["results"]
  >([]);

  const { me } = useUserQuery();
  const { data: myFeedList } = useGetMyPostListQuery({
    cursor,
    limit: 200, // TODO 무한스크롤 수정
  });
  const { data: myLikedFeedList } = useGetMyLikedPostListQuery({
    cursor,
    limit: 200, // TODO 무한스크롤 수정
  });

  useEffect(() => {
    if (selectedTab === "myFeed") {
      setPosts(myFeedList?.results ?? []);
    } else if (selectedTab === "liked") {
      setPosts(myLikedFeedList?.results ?? []);
    }
  }, [myFeedList?.results, myLikedFeedList?.results, selectedTab]);

  return (
    <Main css={hideScroll}>
      <Contents>
        <Profile>
          <ProfileSection>
            <Information>
              <Title>{me?.data?.username ?? "익명"}</Title>
              <ImageCount>{`사진 ${myFeedList?.results?.length ?? 0}`}</ImageCount>
            </Information>

            <UserImage>
              {me?.data?.image ? (
                <User src={me?.data?.image} alt="유저 이미지" />
              ) : (
                <ProfileIcon width={80} height={80} />
              )}
            </UserImage>
          </ProfileSection>

          <TabList>
            <Tab
              onClick={() => setSelectedTab("myFeed")}
              $selected={selectedTab === "myFeed"}
            >
              내 피드
            </Tab>
            <Tab
              onClick={() => setSelectedTab("liked")}
              $selected={selectedTab === "liked"}
            >
              좋아요한 사진
            </Tab>
          </TabList>
        </Profile>
        {/* TODO: 로딩처리 및 무한스크롤 */}

        {posts?.length ? (
          <Grid>
            {posts?.map(({ id, image }, index) => {
              return (
                <ImageContainer
                  key={image}
                  to={`/${id}`} // TODO: 라우트
                  $align={
                    index % 2 === 0
                      ? ("left" as AlignType)
                      : ("right" as AlignType)
                  }
                >
                  <Image src={image} alt="내 사진 왜 안 보이지 😥" />
                </ImageContainer>
              );
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
  gap: 12px;
  margin-bottom: 120px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 12px;
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

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 156px;
  padding: 20px 16px 24px 16px;
  justify-content: space-between;
  align-items: flex-start;
  flex-shrink: 0;
`;

const Information = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  flex-shrink: 0;
`;

const ProfileSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`;

const Title = styled.span`
  color: var(--kakao-logo, #000);
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 6px;
`;

const ImageCount = styled.span`
  display: flex;
  flex: 1;
  color: var(--kakao-logo, #000);
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const UserImage = styled.div`
  width: auto;
  height: auto;
`;

const User = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 3000px;
  object-fit: cover;
  object-position: center;
  flex-shrink: 0;
`;

const TabList = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: space-between;
`;

const Tab = styled.button<{ $selected?: boolean }>`
  border: none;
  background: none;
  outline: none;
  padding: 0;
  padding-bottom: 12px;
  transition: border-bottom 0.3s;
  border-bottom: ${({ $selected }) =>
    $selected ? "2px solid #000" : "2px solid transparent"};
  color: var(--kakao-logo, #000);
  font-family: "Spoqa Han Sans Neo";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  cursor: pointer;
`;

const ImageContainer = styled(Link)<{ $align: AlignType }>`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: ${({ $align }) =>
    $align === "left" ? "flex-start" : "flex-end"};
`;

const Image = styled.img`
  width: 320px;
  height: 240px;
  object-fit: cover;
`;
