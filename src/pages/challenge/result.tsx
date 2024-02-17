import styled from "@emotion/styled";
import { Page } from "../../components/common/Page";
import ThumbsUpFillIcon from "../../components/icons/ThumbsUpFill";
import ThumbsUpIcon from "../../components/icons/ThumbsUp";

export function ChallengeResult() {
  return (
    <Main>
      <TitleWrapper>
        <TitleMain>오늘의 챌린지</TitleMain>
        <TitleSub>도전에 성공했어요.</TitleSub>
      </TitleWrapper>
      <ImageContainer>
        <ImageWrapper>
          <Image
            src="https://seeya-server.s3.amazonaws.com/uploads/post_images/2024/02/18/030647_wackathon_1.jpeg"
            width="100%"
            height="100%"
          />
        </ImageWrapper>
        <ImageWrapper>
          <Image
            src="https://seeya-server.s3.amazonaws.com/uploads/post_images/2024/02/18/030647_wackathon_1.jpeg"
            width="100%"
            height="100%"
          />
        </ImageWrapper>
        <Bubble>눌러서 비밀 메시지 보기</Bubble>
      </ImageContainer>
      <ResultWrapper>
        <ResultSub>사진 속 공간과</ResultSub>
        <ResultMain>매우 비슷해요!</ResultMain>
      </ResultWrapper>
      <Prompt>
        이 사진은 같은 조형물을 보여주고 있어요, 하지만 이번에는 밤에 찍은
        듯해요. 조명이 켜져 있고 주변이 어두워진 모습이 인상적이에요. 배경은
        동일하지만 시간대 차이로 인해 낮과 밤의 다른 분위기를 느낄 수 있어요.
      </Prompt>
      <ThumbsContainer>
        <ThumbsUpFillIcon />
        <ThumbsUpFillIcon />
        <ThumbsUpFillIcon />
        <ThumbsUpFillIcon />
        <ThumbsUpIcon />
      </ThumbsContainer>
    </Main>
  );
}

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

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 14px;
  margin-bottom: 40px;
`;
const ImageWrapper = styled.div`
  width: calc((100vw - 46px) / 2);
  height: calc((100vw - 46px) / 2);
  flex-shrink: 1;
  border-radius: 8px;
  overflow: hidden;
`;
const Image = styled.img`
  object-fit: cover;
  object-position: center;
`;
const Bubble = styled.div`
  position: absolute;
  top: -40px;
  width: 267px;
  height: 72px;
  border-radius: 8px;
  background: url("/backgrounds/bubble_bg2.png");
  background-size: cover;
  background-position: center;
  padding-top: 18px;

  color: #1e1e1e;
  text-align: center;
  font-family: "Spoqa Han Sans Neo";
  font-size: 14px;
  font-weight: 400;
`;

const ResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 28px;
`;
const ResultMain = styled.div`
  color: #1e1e1e;
  text-align: center;
  font-family: "Spoqa Han Sans Neo";
  font-size: 28px;
  font-weight: 500;
`;
const ResultSub = styled.div`
  color: #786e5a;
  text-align: center;
  font-family: "Spoqa Han Sans Neo";
  font-size: 20px;
  font-weight: 500;
`;
const Prompt = styled.div`
  width: 283px;
  color: #786e5a;
  text-align: center;
  font-family: "Spoqa Han Sans Neo";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 22.4px */
  margin-bottom: 28px;
`;
const ThumbsContainer = styled.div`
  width: 300px;
  display: flex;
  justify-content: space-between;
`;
