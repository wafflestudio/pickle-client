import styled from "@emotion/styled";
import Button from "../../components/button/Button";
import { Page } from "../../components/common/Page";
import { useNavigate } from "react-router-dom";

export default function Splash() {
  const navigate = useNavigate();
  return (
    <Main>
      <div />
      <Top>
        <Logo>seeya</Logo>
        <Description>
          서울대학교 학생들의
          <br />
          사진 공유 SNS
        </Description>
      </Top>
      <Bottom>
        <Buttons>
          <Button.Full onClick={() => navigate("../register")}>
            회원가입
          </Button.Full>
          <Button.Full onClick={() => navigate("../login")}>로그인</Button.Full>
        </Buttons>
        <Credit>©wackathon.pickle</Credit>
      </Bottom>
    </Main>
  );
}

const Main = styled(Page)`
  height: 100vh;
  padding: 40px 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 36px;
`;

const Logo = styled.h1`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Description = styled.div`
  font-size: 14px;
  line-height: 1.5em;
  text-align: center;
  letter-spacing: 0.01em;
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Credit = styled.div`
  width: 100%;
  color: #c8c8c8;
  font-size: 14px;
  line-height: 1.4em;
  letter-spacing: 0.02em;
  text-align: center;
  text-decoration: underline;

  display: flex;
  justify-content: center;
  align-items: center;
`;
