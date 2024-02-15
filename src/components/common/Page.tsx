/**
 * @fileoverview Page 컴포넌트
 *
 * 가장 기본이 되는 페이지 컴포넌트입니다.
 * 화면의 가로폭을 가득 매우며, 상위 레이아웃에서 flexbox를 사용해도 가로폭이 줄어들지 않습니다.
 * 또한 세로 스크롤의 기준이 됩니다.
 */

import styled from "@emotion/styled";

export const Page = styled.div`
  position: relative;
  width: 100%;
  flex-grow: 0;
  flex-shrink: 0;
  overflow-x: hidden;
  overflow-y: auto;
`;
