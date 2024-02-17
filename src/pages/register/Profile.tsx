import { useContext, useEffect } from "react";

import styled from "@emotion/styled";
import { Page } from "../../components/common/Page";
import { FullButton } from "../../components/button/FullButton";
import FullInput from "../../components/input/FullInput";
import { useUserQuery } from "../../services/repositories/user";
import PlusIcon from "../../components/icons/Plus";
import { RegisterContext } from "../../layouts/register/context";
import { useNavigate } from "react-router-dom";

export default function RegisterProfile() {
  const { signup, checkUsername } = useUserQuery();
  const { email, password, username, image, set } = useContext(RegisterContext);
  const navigate = useNavigate();

  const imageUrl = image ? URL.createObjectURL(image) : "";

  useEffect(() => {
    if (!email || !password) {
      navigate("..");
    }
  }, [email, password, navigate]);

  return (
    <Main>
      <Title>반가워요!</Title>
      <Greeting>프로필 사진과 이름을 설정해주세요.</Greeting>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await checkUsername.mutateAsync(username);
            await signup.mutateAsync({ email, password, username, image });
            navigate("/");
          } catch (e) {
            return;
          }
          // if (!input.email || !input.password) return;
          // signup.mutateAsync(input).then(() => navigate("/"));
        }}
      >
        <ProfileImageWrapper htmlFor="profileInput">
          <ProfileImage src={imageUrl} width={80} height={80} />
          <AddIcon>
            <PlusIcon color="white" />
          </AddIcon>
        </ProfileImageWrapper>
        <FileInput
          id="profileInput"
          type="file"
          accept="image/*"
          onChange={(e) => {
            e.target.files ? set({ image: e.target.files[0] }) : null;
          }}
        />
        <FullInput
          type="text"
          value={username}
          onChange={(e) => set({ username: e.target.value })}
          placeholder="프로필 이름"
          icon="user"
        />
        <ErrorMessage>
          {signup.isError && JSON.stringify(signup.error)}
          {/* // TODO: 에러 개선 */}
        </ErrorMessage>
        <Buttons>
          <FullButton
            theme="black"
            type="submit"
            disabled={username.length < 2 || username.length > 12}
          >
            다음으로
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
  margin-bottom: 15px;
`;
const Greeting = styled.div`
  color: black;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 47px;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FileInput = styled.input`
  display: none;
`;
const ProfileImageWrapper = styled.label`
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #f5f5f5;
  margin-bottom: 38px;
`;
const AddIcon = styled.div`
  position: absolute;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  right: -2px;
  bottom: -2px;

  border: 1px solid #fff;
  background: #1e1e1e;
`;
const ProfileImage = styled.img`
  object-fit: cover;
  object-position: center center;
  border-radius: 50%;
`;

const ErrorMessage = styled.div`
  width: 100%;
  height: 16px;
  font-size: 13px;
  font-weight: 300;
  text-align: right;
  color: #ff6262;
  font-size: 14px;
  margin-top: 8px;
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
