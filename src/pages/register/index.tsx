import { useState } from "react";

import styled from "@emotion/styled";
import { Page } from "../../components/common/Page";
import { FullButton } from "../../components/button/FullButton";
import FullInput from "../../components/input/FullInput";
import { useUserQuery } from "../../services/repositories/user";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { signup } = useUserQuery();
  const [input, setInput] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  return (
    <Main>
      <Title>회원가입</Title>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          if (!input.email || !input.password) return;
          signup.mutateAsync(input).then(() => navigate("/"));
        }}
      >
        <Inputs>
          <FullInput
            type="text"
            value={input.email}
            onChange={(e) => setInput({ ...input, email: e.target.value })}
            placeholder="이메일"
            icon="user"
          />
          <FullInput
            type="password"
            value={input.password}
            onChange={(e) => setInput({ ...input, password: e.target.value })}
            placeholder="비밀번호"
            icon="key"
          />
        </Inputs>
        <ErrorMessage>
          {signup.isError && JSON.stringify(signup.error)}
          {/* // TODO: 에러 개선 */}
        </ErrorMessage>
        <Buttons>
          <FullButton theme="black" type="submit">
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
`;

const Title = styled.h1`
  width: 100%;
  font-weight: 500;
  font-size: 24px;
  text-align: center;
  margin-bottom: 47px;
`;
const Form = styled.form``;
const Inputs = styled.div`
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
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;
