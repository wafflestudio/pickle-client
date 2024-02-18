import styled from "@emotion/styled";
import { Page } from "../../components/common/Page";
import { useUserQuery } from "../../services/repositories/user";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Time() {
  const { uploadTime } = useUserQuery();
  // const navigate = useNavigate();
  const [time, setTime] = useState("");

  return (
    <Main>
      <Title>시간표를 업로드해주세요!</Title>
      <Greeting>공강 시간을 자동으로 인식합니다.</Greeting>
      {time.length > 0 && <Image src={time} />}
      <Upload htmlFor="timetable">시간표 업로드</Upload>
      <FileInput
        id="timetable"
        type="file"
        accept="images/*"
        onChange={(e) => {
          if (e.target.files) {
            const file = e.target.files[0];
            if (file) {
              uploadTime.mutateAsync(file).then((res) => {
                setTime(res);
              });
            }
          }
        }}
      />
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
