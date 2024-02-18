/**
 * @fileoverview 슬라이드 전환 애니메이션을 기본으로 적용한 컨테이너 컴포넌트
 */

import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { PropsWithChildren } from "react";

type SlideContainerProps = PropsWithChildren & {
  slideDirection: "LEFT" | "RIGHT" | "NONE";
  animationDuration?: number;
};

export default function SlideContainer({
  children,
  slideDirection,
  animationDuration = 1000,
}: SlideContainerProps) {
  return (
    <Container
      $slideDirection={slideDirection}
      $animationDuration={animationDuration}
    >
      {children}
    </Container>
  );
}

const Container = styled.div<{
  $slideDirection: "LEFT" | "RIGHT" | "NONE";
  $animationDuration: number;
}>`
  /* position: fixed; */
  position: relative;
  display: flex;
  animation-fill-mode: forwards;
  /* top: var(--header-height); */

  ${(props) => {
    if (props.$slideDirection === "LEFT")
      return css`
        flex-direction: row-reverse;
        animation: ${toLeft} ${props.$animationDuration / 1000}s ease;
      `;
    if (props.$slideDirection === "RIGHT")
      return css`
        flex-direction: row;
        animation: ${toRight} ${props.$animationDuration / 1000}s ease;
      `;
    return css`
      transform: translateX(0);
    `;
  }}
`;

// 전환 애니메이션 (커스터마이징 가능)
const toLeft = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;
const toRight = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;
