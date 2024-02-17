import styled from "@emotion/styled";
import { Page } from "../../components/common/Page";
import { useNavigate } from "react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import createImageCache from "../../components/create/createImageCache";
import { CreateSchema } from "../../services/apis/create";
import { useCreateQuery } from "../../services/repositories/create";
import { ButtonBase } from "../../components/button/ButtonBase";
import BackIcon from "../../components/icons/Back";
import { FullButton } from "../../components/button/FullButton";

export default function Create() {
  const { post } = useCreateQuery();
  const [input, setInput] = useState<CreateSchema["post"]["request"]>({
    text: "",
    latitude: 0,
    longitude: 0,
    image: new Blob(),
  });
  const navigate = useNavigate();

  const imageUrl = useMemo(() => {
    if (input.image) return URL.createObjectURL(input.image);
    return "";
  }, [input.image]);

  const set = useCallback(
    (partial: Partial<CreateSchema["post"]["request"]>) => {
      setInput((prev) => ({ ...prev, ...partial }));
    },
    [],
  );

  useEffect(() => {
    const cache = createImageCache.get();
    if (cache) {
      setInput((prev) => ({ ...prev, image: cache }));
    } else {
      navigate(-1);
    }
  }, [navigate]);

  return (
    <Main>
      <Header>
        <Back onClick={() => navigate(-1)}>
          <BackIcon />
        </Back>
        <div>새 게시물</div>
      </Header>
      <Image src={imageUrl} width={210} height={280} />
      <Description>
        <DescriptionMain>일반 메시지</DescriptionMain>
        <DescriptionSub>게시물과 함께 항상 보이는 글입니다.</DescriptionSub>
      </Description>
      <TextArea
        value={input.text}
        onChange={(e) => set({ text: e.target.value })}
      />
      <Description>
        <DescriptionMain>비밀 메시지</DescriptionMain>
        <DescriptionSub>
          챌린지에 성공한 사람에게만 보이는 글입니다. 사진 속 장소에서 겪을 수
          있는 특별한 경험이나 팁을 작성해보세요!
        </DescriptionSub>
      </Description>
      <TextArea />
      <FullButton
        theme="black"
        disabled={input.text.length === 0 || input.image.size === 0}
        onClick={() =>
          post
            .mutateAsync({ ...input, longitude: 127.03996, latitude: 37.50324 })
            .then(() => {
              alert("생성되었습니다!");
              navigate("/");
            })
        }
      >
        작성하기
      </FullButton>
    </Main>
  );
}

const Main = styled(Page)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
`;

const Header = styled.header`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 64px 0px 12px 0px;

  color: black;
  font-family: "Spoqa Han Sans Neo";
  font-size: 20px;
  font-weight: 400;

  margin-bottom: 16px;
`;

const Back = styled(ButtonBase)`
  position: absolute;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 210px;
  height: 280px;
  object-fit: cover;
  margin-bottom: 28px;
`;

const Description = styled.div`
  width: 100%;
  font-family: "Spoqa Han Sans Neo";
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 10px;
`;
const DescriptionMain = styled.div`
  color: black;
  font-size: 14px;
  font-weight: 500;
`;
const DescriptionSub = styled.div`
  color: #969696;
  font-size: 12px;
  font-weight: 400;
`;
const TextArea = styled.textarea`
  width: 100%;
  height: 72px;
  padding: 12px;
  margin-bottom: 28px;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  background: #fff;
  resize: none;

  font-family: "Spoqa Han Sans Neo";
  color: black;
  font-size: 14px;
  font-weight: 400;
`;
