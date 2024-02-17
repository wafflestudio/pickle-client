import { useEffect, useRef } from "react";
import lottie from "lottie-web";

import LoadingSpinnerJSON from "../../../public/splash.json";

import styled from "@emotion/styled";

export const SplashLottie = () => {
  const lottieRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lottieRef.current) return;

    lottie.loadAnimation({
      container: lottieRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: LoadingSpinnerJSON,
    });
  }, []);

  return (
    <Container>
      <Animation ref={lottieRef} />
    </Container>
  );
};

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const Animation = styled.div``;
