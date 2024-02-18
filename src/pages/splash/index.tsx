import styled from "@emotion/styled";
import { Page } from "../../components/common/Page";
// import MainLogoIcon from "../../components/icons/MainLogo";
// import MainWordMarkIcon from "../../components/icons/MainWordMark";
import { SplashLottie } from "../../components/lottie";

export default function Splash() {
  return (
    <Main>
      <Top>
        <LogoContainer>
          <Container>
            <SplashLottie />
          </Container>
          {/* <MainLogoIcon /> */}
          {/* <MainWordMarkIcon height={36} /> */}
        </LogoContainer>
        <Description>
          서울대학교 학생들의
          <br />
          사진 공유 SNS
        </Description>
      </Top>
      <Bottom>
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
  background:
    linear-gradient(0deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%),
    linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 28.96%),
    url("/backgrounds/splash_bg.png"),
    lightgray -276.691px -154.107px / 342.276% 119.104% no-repeat;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Description = styled.div`
  color: #fff;
  text-align: center;
  font-family: "Spoqa Han Sans Neo";
  font-size: 13px;
  font-weight: 400;
  line-height: 150%; /* 19.5px */
  letter-spacing: 0.26px;
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
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

const Container = styled.div`
  width: 390px;
  height: 390px;
`;
