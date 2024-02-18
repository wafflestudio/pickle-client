import styled from "@emotion/styled";
import { Page } from "../../components/common/Page";
import { useChallengeQuery } from "../../services/repositories/challenge";
import { useParams } from "react-router";
import { css, keyframes } from "@emotion/react";
import { FullButton } from "../../components/button/FullButton";
import ChalkackIcon from "../../components/icons/chalkack";
import { useNavigate } from "react-router-dom";

export function ChallengeSecret() {
  const params = useParams();
  const { challenge } = useChallengeQuery(Number(params.challengeId));
  const navigate = useNavigate();

  if (!challenge.data) return null;

  return (
    <Main>
      <TitleWrapper>
        <TitleMain>오늘의 챌린지</TitleMain>
        <TitleSub>도전에 성공했어요.</TitleSub>
      </TitleWrapper>

      <ImageWrapper>
        <Image src={challenge.data.post.image} width="100%" height="100%" />
        <SecretMessage>
          <SecretText>{challenge.data.post.secret_text}</SecretText>
          <ChalkackIcon />
        </SecretMessage>
      </ImageWrapper>

      <FullButton
        theme="black"
        onClick={() => navigate("/")}
        css={css`
          animation: ${Reveal} 0.6s ease;
          animation-fill-mode: backwards;
          animation-delay: 1.5s;
        `}
      >
        도전 마치기
      </FullButton>
    </Main>
  );
}

const Reveal = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Main = styled(Page)`
  padding: 16px;
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 72px;
  animation: ${Reveal} 0.7s ease;
  animation-fill-mode: backwards;
  animation-delay: 0.2s;
`;
const TitleSub = styled.div`
  color: #786e5a;
  font-family: "Spoqa Han Sans Neo";
  font-size: 14px;
  font-weight: 400;
`;
const TitleMain = styled.div`
  color: #1e1e1e;
  font-family: "Spoqa Han Sans Neo";
  font-size: 24px;
  font-weight: 500;
  line-height: 140%; /* 33.6px */
`;

const ImageWrapper = styled.div`
  position: relative;
  width: calc(390px - 32px);
  height: calc(390px - 32px);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 38px;
  display: flex;
  flex-direction: column;
  align-items: center;

  animation: ${Reveal} 1s ease;
  animation-fill-mode: backwards;
  animation-delay: 0.6s;
`;

const Image = styled.img`
  object-fit: cover;
  object-position: center;
`;
const SecretMessage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  border-radius: 8px;
  background: rgba(246, 242, 235, 0.9);
  box-shadow: 0px 0px 20px 0px rgba(29, 29, 29, 0.3);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  padding: 40px 64px;
`;

const SecretText = styled.div`
  color: var(--kakao-logo, #000);
  text-align: center;
  font-family: "UhBeemysen";
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
