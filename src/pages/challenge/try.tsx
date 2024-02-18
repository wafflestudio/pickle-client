import styled from "@emotion/styled";
import { Page } from "../../components/common/Page";
import { useState } from "react";
import { useChallengeQuery } from "../../services/repositories/challenge";
import { useNavigate, useParams } from "react-router";
// import { useGeolocation } from "../../utils/geolocation/hooks";

export function ChallengeTry() {
  const params = useParams();
  const { challenge, submit } = useChallengeQuery(Number(params.challengeId));
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  // const geolocation = useGeolocation();

  if (!challenge.data) return null;

  return (
    <Main>
      <TitleWrapper>
        <TitleMain>오늘의 챌린지</TitleMain>
        <TitleSub>도전 중이에요.</TitleSub>
      </TitleWrapper>

      <ImageWrapper>
        <Bubble>근처에 가면 비밀 메시지를 볼 수 있어요.</Bubble>
        <Image src={challenge.data.post.image} width="100%" height="100%" />
      </ImageWrapper>

      {!isSubmit ? (
        <ResultFar>
          <DistanceWrapper>
            <DistanceSub>현재 위치에서</DistanceSub>
            <DistanceMain>16분</DistanceMain>
            <DistanceSub>이면 갈 수 있어요.</DistanceSub>
          </DistanceWrapper>
          <DistanceDialogue onClick={() => setIsSubmit(true)}>
            점점 가까워지고 있어요!
          </DistanceDialogue>
        </ResultFar>
      ) : (
        <ResultFar>
          <SuccessWrapper>
            <SuccessMain>도착했어요!</SuccessMain>
            <SuccessSub>
              챌린지 사진과 최대한 비슷한 구도로
              <br /> 사진을 찍어주세요.
            </SuccessSub>
          </SuccessWrapper>
          <InputButton htmlFor="challengeFileInput">사진 찍기</InputButton>
          <FileInput
            id="challengeFileInput"
            type="file"
            accept="image/*"
            capture="environment"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file)
                submit.mutateAsync({ image: file }).then(() => {
                  navigate("../result");
                });
            }}
          />
        </ResultFar>
      )}
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
  margin-bottom: 28px;
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
  width: calc(100vw - 32px);
  height: calc(100vw - 32px);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 38px;
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

const ResultFar = styled.div`
  width: 100%;
`;

const DistanceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin-bottom: 38px;
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
const DistanceDialogue = styled.div`
  display: flex;
  width: 100%;
  height: 48px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;

  border-radius: 132px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0px 0px 12px 0px rgba(29, 29, 29, 0.08);

  color: #af2356;
  text-align: center;
  font-family: "Spoqa Han Sans Neo";
  font-size: 16px;
  font-weight: 500;
`;
const SuccessWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 49px;
`;
const SuccessMain = styled.div`
  color: #1e1e1e;
  text-align: center;
  font-family: "Spoqa Han Sans Neo";
  font-size: 24px;
  font-weight: 500;
`;
const SuccessSub = styled.div`
  color: #786e5a;
  text-align: center;
  font-family: "Spoqa Han Sans Neo";
  font-size: 16px;
  font-weight: 400;
  line-height: 140%; /* 22.4px */
`;
const InputButton = styled.label`
  display: flex;
  width: 350px;
  height: 48px;
  padding: 12px 0px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  border-radius: 4px;
  background: #1e1e1e;

  color: #fff;
  text-align: center;
  font-family: "Spoqa Han Sans Neo";
  font-size: 16px;
  font-weight: 400;
`;
const FileInput = styled.input`
  display: none;
`;
