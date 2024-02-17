import styled from "@emotion/styled";
import { Page } from "../../components/common/Page";
import { FullButton } from "../../components/button/FullButton";

export function Challenge() {
  return (
    <Main>
      <TitleWrapper>
        <TitleSub>오늘의 챌린지</TitleSub>
        <TitleMain>
          사진 속 공간을 찾아
          <br /> 떠나보세요!
        </TitleMain>
      </TitleWrapper>

      <ImageWrapper>
        <Bubble>근처에 가면 비밀 메시지를 볼 수 있어요.</Bubble>
        <Image
          src="https://seeya-server.s3.amazonaws.com/uploads/post_images/2024/02/18/030647_wackathon_1.jpeg"
          width={340}
          height={340}
        />
      </ImageWrapper>

      <DistanceWrapper>
        <DistanceSub>현재 위치에서</DistanceSub>
        <DistanceMain>16분</DistanceMain>
        <DistanceSub>이면 갈 수 있어요.</DistanceSub>
      </DistanceWrapper>

      <FullButton theme="black">도전하기</FullButton>
    </Main>
  );
}

const Main = styled(Page)`
  padding: 20px;
  padding-top: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;
  margin-bottom: 28px;
`;
const TitleSub = styled.div`
  color: #786e5a;
  text-align: center;
  font-family: "Spoqa Han Sans Neo";
  font-size: 14px;
  font-weight: 400;
`;
const TitleMain = styled.div`
  color: #1e1e1e;
  text-align: center;
  font-family: "Spoqa Han Sans Neo";
  font-size: 24px;
  font-weight: 500;
  line-height: 140%; /* 33.6px */
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 340px;
  height: 340px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  object-fit: cover;
  object-position: center;
`;

const Bubble = styled.div`
  position: absolute;
  top: 24px;
  width: 267px;
  height: 72px;
  border-radius: 8px;
  background: url("/backgrounds/bubble_bg.png");
  background-size: cover;
  background-position: center;
  padding-top: 18px;

  color: #1e1e1e;
  text-align: center;
  font-family: "Spoqa Han Sans Neo";
  font-size: 14px;
  font-weight: 400;
`;

const DistanceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin-bottom: 36px;
`;
const DistanceSub = styled.div`
  color: #786e5a;
  text-align: center;
  font-family: "Spoqa Han Sans Neo";
  font-size: 16px;
  font-weight: 500;
`;
const DistanceMain = styled.div`
  color: #1e1e1e;
  text-align: center;
  font-family: "Spoqa Han Sans Neo";
  font-size: 48px;
  font-weight: 500;
`;
