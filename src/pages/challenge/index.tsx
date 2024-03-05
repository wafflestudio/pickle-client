import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { useContext, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { FullButton } from "../../components/button/FullButton";
import Fallback from "../../components/common/Fallback";
import { Page } from "../../components/common/Page";
import { GeolocationContext } from "../../layouts/root/context";
import { useChallengeStartQuery } from "../../services/repositories/challenge";
import { useGetPostQuery } from "../../services/repositories/post";
import { distance } from "../../utils/geolocation/utils";

export function Challenge() {
  const { position, error, status } = useContext(GeolocationContext);
  if (status === "pending")
    return <Fallback message="위치 정보 불러오는 중..." />;
  else if (status === "error")
    return (
      <Fallback
        message={`위치 정보를 불러오지 못했습니다.\n${error.message}`}
      />
    );
  else if (status === "success")
    return <ChallengeWithGps position={position} />;
}

interface ChallengeWithGpsProps {
  position: GeolocationPosition;
}

function ChallengeWithGps({ position }: ChallengeWithGpsProps) {
  const { start } = useChallengeStartQuery();
  const params = useParams();
  const navigate = useNavigate();
  const query = useGetPostQuery(Number(params.postId));

  const min = useMemo(() => {
    {
      if (position) {
        const dist = distance(position.coords, {
          latitude: query.data.latitude,
          longitude: query.data.longitude,
        });
        const min = dist / 100;
        return min > 99 ? 99 : min.toFixed(0);
      }
    }
  }, [position, query.data]);

  if (query.status !== "success") return null;

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
        <Image src={query.data.image} width={340} height={340} />
      </ImageWrapper>
      <DistanceWrapper>
        <DistanceSub>현재 위치에서</DistanceSub>
        <DistanceMain>{min}분</DistanceMain>
        <DistanceSub>이면 갈 수 있어요.</DistanceSub>
      </DistanceWrapper>

      <FullButton
        css={css`
          animation: ${Reveal} 0.6s ease;
          animation-fill-mode: backwards;
          animation-delay: 2.1s;
        `}
        theme="black"
        onClick={() => {
          if (params.postId)
            start
              .mutateAsync({ post_id: Number(params.postId) })
              .then((res) => {
                if (res.id) navigate(`./${res.id}/try`);
              });
        }}
      >
        도전하기
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
  animation: ${Reveal} 0.7s ease;
  animation-fill-mode: backwards;
  animation-delay: 0.2s;
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
  animation: ${Reveal} 1s ease;
  animation-fill-mode: backwards;
  animation-delay: 0.6s;
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

  animation: ${Reveal} 0.9s ease;
  animation-fill-mode: backwards;
  animation-delay: 2.4s;
`;

const DistanceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin-bottom: 36px;
  animation: ${Reveal} 0.6s ease;
  animation-fill-mode: backwards;
  animation-delay: 1.8s;
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
