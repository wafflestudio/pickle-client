import styled from "@emotion/styled";
import { Page } from "../../components/common/Page";
import ThumbsUpFillIcon from "../../components/icons/ThumbsUpFill";
import ThumbsUpIcon from "../../components/icons/ThumbsUp";
import { useChallengeQuery } from "../../services/repositories/challenge";
import { useParams } from "react-router";
import { useEffect, useMemo, useState } from "react";
import { keyframes } from "@emotion/react";

export function ChallengeResult() {
  const params = useParams();
  const { challenge, getEvaluation } = useChallengeQuery(
    Number(params.challengeId),
  );

  const [rawComment, setRawComment] = useState("");

  const parsedComment = useMemo(() => {
    console.log(rawComment);
    const splitted = rawComment.split("result: ");
    if (splitted.length < 2) return { score: -1, text: "" };
    const score = Number(splitted[0].slice(12));
    const text = splitted[1];
    return { score, text };
  }, [rawComment]);

  const parsedThumb = useMemo(() => {
    if (parsedComment.score < 20) return [true, false, false, false, false];
    if (parsedComment.score < 40) return [true, true, false, false, false];
    if (parsedComment.score < 60) return [true, true, true, false, false];
    if (parsedComment.score < 80) return [true, true, true, true, false];
    return [true, true, true, true, true];
  }, [parsedComment.score]);

  useEffect(() => {
    if (challenge.data) {
      getEvaluation.mutateAsync().then((stream) => {
        if (!stream) return;
        const reader = stream.getReader();
        reader.read().then(function processText(str): Promise<void> {
          if (str.done) {
            return Promise.resolve();
          }
          const decoded = new TextDecoder("utf-8").decode(str.value);
          setRawComment((prev) => prev + decoded);
          return reader.read().then(processText);
        });
      });
    }
  }, [challenge.data]);

  if (!challenge.data) return null;

  return (
    <Main>
      <TitleWrapper>
        <TitleMain>오늘의 챌린지</TitleMain>
        <TitleSub>도전에 성공했어요.</TitleSub>
      </TitleWrapper>
      <ImageContainer>
        <ImageWrapper>
          <Image src={challenge.data.post.image} width="100%" height="100%" />
        </ImageWrapper>
        <ImageWrapper>
          <Image src={challenge.data.image ?? ""} width="100%" height="100%" />
        </ImageWrapper>
        <Bubble>눌러서 비밀 메시지 보기</Bubble>
      </ImageContainer>
      <ResultWrapper>
        <ResultSub>사진 속 공간과</ResultSub>
        <ResultMain>매우 비슷해요!</ResultMain>
      </ResultWrapper>
      <Prompt>
        {/* 이 사진은 같은 조형물을 보여주고 있어요, 하지만 이번에는 밤에 찍은
        듯해요. 조명이 켜져 있고 주변이 어두워진 모습이 인상적이에요. 배경은
        동일하지만 시간대 차이로 인해 낮과 밤의 다른 분위기를 느낄 수 있어요. */}
        {parsedComment.text}
      </Prompt>
      {parsedComment.score > 0 && (
        <ThumbsContainer>
          {parsedThumb.map((val, idx) =>
            val ? <ThumbsUpFillIcon key={idx} /> : <ThumbsUpIcon key={idx} />,
          )}
        </ThumbsContainer>
      )}
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

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 14px;
  margin-bottom: 40px;
  animation: ${Reveal} 1s ease;
  animation-fill-mode: backwards;
  animation-delay: 0.6s;
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
  animation: ${Reveal} 0.9s ease;
  animation-fill-mode: backwards;
  animation-delay: 2.4s;
`;

const ResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 28px;
  animation: ${Reveal} 0.6s ease;
  animation-fill-mode: backwards;
  animation-delay: 1.5s;
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
  animation: ${Reveal} 1s ease;
  animation-fill-mode: backwards;
`;
