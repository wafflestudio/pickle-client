import styled from "@emotion/styled";
import { Outlet } from "react-router";
import { Page } from "../../components/common/Page";

export default function ChallengeLayout() {
  return (
    <Main>
      <Outlet />
    </Main>
  );
}

const Main = styled(Page)`
  position: relative;
  height: 100vh;
  background: url("/backgrounds/challenge_bg.png") no-repeat center;
`;
