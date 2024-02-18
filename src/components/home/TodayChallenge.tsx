import { useLayoutEffect, useRef, useState } from "react";
import MainClipper from "../../components/home/MainClipper";
import styled from "@emotion/styled";
import { PostSchema } from "../../services/apis/post";

type Props = {
  challenge?: PostSchema;
};

export default function TodayChallenge({ challenge }: Props) {
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (ref.current) {
      setHeight((ref.current?.clientWidth / 390) * 480);
    }
  }, []);

  return (
    <ClipperContainer ref={ref} $height={height} $url={challenge?.image}>
      <Clipper>
        <MainClipper isBlendLayer={false} />
      </Clipper>
      <Clipper>
        <MainClipper isBlendLayer={true} />
      </Clipper>

      <RepresenChallenge>
        <Title>{"오늘의 챌린지"}</Title>

        <Chall>
          <ChallDesc>{"비밀 메시지가 기다리고 있는"}</ChallDesc>
          <ChallTitle>{"사진 속 공간을 찾아 떠나보세요!"}</ChallTitle>
        </Chall>
      </RepresenChallenge>
    </ClipperContainer>
  );
}

const ClipperContainer = styled.div<{ $url?: string; $height: number }>`
  width: 100%;
  height: ${({ $height }) => $height}px;
  background-image: url(${({ $url }) => $url});
  background-size: cover;
  padding: 0;
  margin-top: calc((-1) * var(--header-height));
  padding-top: var(--header-height);
  position: relative;
`;

const Clipper = styled.div`
  display: flex;
  flex: 1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

// TODO: 사진
const RepresenChallenge = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  padding: 20px 24px;
  gap: 10px;
  border-radius: 4px;
`;

const Title = styled.header`
  color: #fff;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Chall = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ChallDesc = styled.span`
  color: #fff;
  text-align: right;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ChallTitle = styled.h3`
  display: flex;
  justify-content: flex-end;
  color: #fff;
  text-align: right;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  margin: 0;
`;
