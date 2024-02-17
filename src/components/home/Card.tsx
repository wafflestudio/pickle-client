import styled from "@emotion/styled";

interface Props {
  username: string;
  imageUrl: string;
  likeCount: number;
  isLiked?: boolean;
}

export default function Card({ username, imageUrl }: Props) {
  return (
    <Container>
      <Information>
        <Image src={imageUrl} />
        <Username>{username ?? "익명"}</Username>
      </Information>

      <Interaction></Interaction>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 8px;
  padding: 10px;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(255, 255, 255, 0) 104.1%
  );
`;

const Information = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Image = styled.img`
  width: 20px;
  height: 20px;
  object-fit: cover;
  border-radius: 50%;
`;

const Username = styled.span`
  color: #fff;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Interaction = styled.div``;
