import styled from "@emotion/styled";
import { PostSchema } from "../../services/apis/post";
import Card from "./Card";
import { useNavigate } from "react-router";

type Props = {
  posts?: (PostSchema & {
    my_challenge_id?: number;
  })[];
};

export default function OtherChallenges({ posts }: Props) {
  const navigate = useNavigate();
  return (
    <Section>
      <Greeting>
        <Title>{"더 도전해보세요!"}</Title>
        <Desc>{"다른 유저의 사진에도 도전해볼 수 있어요"}</Desc>
      </Greeting>

      <CardGrid>
        {posts?.map(
          ({
            id,
            image,
            is_liked,
            like_count,
            author_name,
            my_challenge_id,
          }) => {
            return (
              <Card
                key={id}
                image={image}
                username={author_name}
                likeCount={like_count}
                isLiked={is_liked}
                onClick={() => {
                  my_challenge_id
                    ? navigate(`/challenge/${id}/${my_challenge_id}/try`)
                    : navigate(`/challenge/${id}`);
                }}
              />
            );
          },
        )}
      </CardGrid>
    </Section>
  );
}

const Section = styled.section`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 28px;
  padding: 0 16px;
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

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
`;
