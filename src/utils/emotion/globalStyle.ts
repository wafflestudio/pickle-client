/**
 * @fileoverview Emotion-Normalize를 확장한 글로벌 스타일. <RootLayout />에서 사용합니다.
 *
 * 기본 CSS 설정을 아예 초기화시키는 과격한 Reset보다는, 브라우저 간 일관성만을 유지시키는 Noramlize를 적용했습니다.
 * 자주 사용되는 것 같은 emotion-normalize를 이용했는데, 다른 방식을 선호하신다면 바꿔도 상관 없습니다.
 * 또한 모든 컴포넌트에 스타일링 편의를 위해 `box-sizing: border-box`을 일괄 적용했습니다.
 * 컴포넌트의 공통 변수는 :root의 css variable을 이용하여 관리합니다.
 *
 * @package emotion-normalize
 */

import { css } from "@emotion/react";
import emotionNormalize from "emotion-normalize";

const globalStyle = css`
  @import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css);

  ${emotionNormalize}
  html,
    body {
    padding: 0;
    margin: 0;
    background: white;
    min-height: 100%;
    font-family: Helvetica, Arial, sans-serif;
  }
  body {
    overflow: hidden;
  }
  * {
    box-sizing: border-box;
    font-family: "Spoqa Han Sans Neo", sans-serif;
    font-style: normal;
    line-height: normal;
  }
  :root {
    --nav-height: 56px;
    --header-height: 104px;
    --nav-bottom-margin: 35px;
    --max-width: 400px;
    /* --primary-color: #; */
    /* --secondary-color: #; */
    /* --background-color: #; */
  }
`;

export default globalStyle;
