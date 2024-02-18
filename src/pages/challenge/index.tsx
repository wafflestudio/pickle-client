import styled from "@emotion/styled";
import { Page } from "../../components/common/Page";
import { FullButton } from "../../components/button/FullButton";
import { useChallengeStartQuery } from "../../services/repositories/challenge";
import { useNavigate, useParams } from "react-router";
import { css, keyframes } from "@emotion/react";
import { useGetPostQuery } from "../../services/repositories/post";
import { getGeolocation } from "../../utils/geolocation/hooks";
import { distance } from "../../utils/geolocation/utils";
import { useEffect, useMemo, useState } from "react";

export function Challenge() {
  const { start } = useChallengeStartQuery();
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const params = useParams();
  const navigate = useNavigate();
  const query = useGetPostQuery(Number(params.postId));

  const min = useMemo(() => {
    {
      if (currentLocation) {
        const dist = distance(currentLocation, {
          latitude: query.data.latitude,
          longitude: query.data.longitude,
        });
        const min = dist / 100;
        return min > 99 ? 99 : min.toFixed(0);
      }
    }
  }, []);

  useEffect(() => {
    getGeolocation().then((position) => {
      setCurrentLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);

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
