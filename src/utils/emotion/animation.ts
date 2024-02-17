/**
 * @fileoverview 애니메이션 스타일을 정의합니다.
 *
 * commonly 사용되는 애니메이션 스타일을 css 방식으로 제공합니다.
 * usage e.g <Component css={skeleton} />
 *
 */

import { css } from "@emotion/react";

export const skeleton = css`
  overflow: hidden;
  background: #e5e5e5;

  &::before {
    content: "";
    display: block;
    height: 100%;
    width: 100%;
    animation: glance 1.5s infinite;
    background: linear-gradient(to right, transparent, #eeeeee, transparent);
  }

  @keyframes glance {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;
