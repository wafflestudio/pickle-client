/**
 * @fileoverview 홈 레이아웃의 탭을 전환하는 네비게이터.
 *
 * 대충 기능만 만들었습니다.
 */

import styled from "@emotion/styled";
import { Link } from "react-router-dom";

import MeIcon from "../icons/Me";
import HomeIcon from "../icons/Home";
import NavigateIcon from "../icons/Navigate";
import PlusSquaredIcon from "../icons/PlusSquared";
import MeFillIcon from "../icons/MeFill";
import HomeFillIcon from "../icons/HomeFill";
import NavigateFillIcon from "../icons/NavigateFill";
import PlusSquaredFillIcon from "../icons/PlusSquaredFill";

export default function HomeNavigator() {
  const currentPath = window?.location?.pathname;
  // TODO: 탭 트랜지션 효과

  return (
    <Nav>
      <Tab to="/">{currentPath === "/" ? <HomeFillIcon /> : <HomeIcon />}</Tab>
      <Tab to="/feed">
        {currentPath === "/feed" ? <NavigateFillIcon /> : <NavigateIcon />}
      </Tab>
      <Tab to="/upload">
        {currentPath === "/upload" ? (
          <PlusSquaredFillIcon />
        ) : (
          <PlusSquaredIcon />
        )}
      </Tab>
      <Tab to="/me">{currentPath === "/me" ? <MeFillIcon /> : <MeIcon />}</Tab>
    </Nav>
  );
}

const Nav = styled.nav`
  width: 100%;
  max-width: var(--max-width);
  height: var(--nav-height);
  background-color: #fff;
  position: fixed;
  bottom: var(--nav-bottom-margin);
  display: flex;
  margin: auto;
`;

const Tab = styled(Link)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
`;
