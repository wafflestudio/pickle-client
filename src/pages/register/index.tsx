import { useContext } from "react";

import styled from "@emotion/styled";
import { Page } from "../../components/common/Page";
import { FullButton } from "../../components/button/FullButton";
import FullInput from "../../components/input/FullInput";
import { useUserQuery } from "../../services/repositories/user";
import { useNavigate } from "react-router-dom";
import { RegisterContext } from "../../layouts/register/context";

export default function Register() {
  const { checkEmail } = useUserQuery();
  const { email, password, set } = useContext(RegisterContext);
  const navigate = useNavigate();

  return (
    <Main>
      <Title>회원가입</Title>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          if (email === "" || password === "") return;
          checkEmail.mutateAsync(email).then(() => {
            navigate("profile");
          });
        }}
      >
        <Inputs>
          <FullInput
            type="text"
            value={email}
            onChange={(e) => set({ email: e.target.value })}
            placeholder="이메일"
            icon="user"
          />
          <FullInput
            type="password"
            value={password}
            onChange={(e) => set({ password: e.target.value })}
            placeholder="비밀번호"
            icon="key"
          />
        </Inputs>
        <ErrorMessage>
          {checkEmail.isError && JSON.stringify(checkEmail.error)}
          {/* // TODO: 에러 개선 */}
        </ErrorMessage>
        <Buttons>
          <FullButton
            theme="black"
            type="submit"
            disabled={email === "" || password === ""}
          >
            회원가입
          </FullButton>
        </Buttons>
      </Form>
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
  margin-bottom: 47px;
`;

const Form = styled.form`
  width: 100%;
`;
const Inputs = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 8px;
`;
const ErrorMessage = styled.div`
  width: 100%;
  height: 16px;
  font-size: 13px;
  font-weight: 300;
  text-align: right;
  color: #ff6262;
  font-size: 14px;
  margin-bottom: 12px;
  white-space: nowrap;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
`;
const Buttons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;
