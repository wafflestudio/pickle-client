import styled from "@emotion/styled";
import { Page } from "../../components/common/Page";
// import { useState } from "react";

export default function Time() {
  // const [time, setTime] = useState("");

  return (
    <Main>
      <Title>반가워요!</Title>
      <Greeting>프로필 사진과 이름을 설정해주세요.</Greeting>
      <Image />
      <Upload htmlFor="timetable">시간표 업로드</Upload>
      <FileInput id="timetable" />
    </Main>
  );
}

const Main = styled(Page)`
  padding: 0 16px;
  padding-top: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.h1`
  width: 100%;
  font-weight: 500;
  font-size: 24px;
  text-align: center;
  margin-bottom: 15px;
`;
const Greeting = styled.div`
  color: black;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 47px;
`;

const Image = styled.img``;

const Upload = styled.label`
  display: flex;
  width: 350px;
  height: 48px;
  padding: 12px 0px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  border-radius: 4px;
  background: #1e1e1e;

  color: #fff;
  text-align: center;
  font-family: "Spoqa Han Sans Neo";
  font-size: 16px;
  font-weight: 400;
`;

const FileInput = styled.input`
  display: none;
`;
