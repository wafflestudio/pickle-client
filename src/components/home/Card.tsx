import { useLayoutEffect, useRef, useState } from "react";
import styled from "@emotion/styled";

import FlagIcon from "../icons/Flag";
import LikeIcon from "../icons/Like";
import CardClipper from "./CardClipper";

interface Props {
  username: string;
  imageUrl: string;
  likeCount: number;
  isLiked?: boolean;
}

export default function Card({ username, imageUrl, likeCount }: Props) {
  const [size, setSize] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (ref.current) {
      setSize(ref.current?.clientWidth);
    }
  }, []);

  return (
    <Container ref={ref} $height={size}>
      <Image src={imageUrl} alt="사진" />

      <ClipCotainer>
        <CardClipper
          width={size}
          height={size}
          filter={"drop-shadow(0px 0px 12px rgba(29, 29, 29, 0.08))"}
        />
      </ClipCotainer>

      <Information>
        <Username>{username ?? "익명"}</Username>

        <IconSection>
          <Interaction>
            <IconContainer $visible>
              <FlagIcon width={12} height={12} />
            </IconContainer>
            <Text>{14}</Text>
          </Interaction>
          <Interaction>
            <IconContainer $visible>
              <LikeIcon width={12} height={12} />
            </IconContainer>
            <Text>{likeCount}</Text>
          </Interaction>
        </IconSection>
      </Information>
    </Container>
  );
}

const Container = styled.div<{ $url?: string; $height: number }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  width: 100%;
  height: ${({ $height }) => $height}px;
  border-radius: 8px;
  padding: 10px;
  aspect-ratio: 1;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ClipCotainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Information = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 12px;
`;

const Username = styled.span`
  color: #000;
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Interaction = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const IconSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: auto;
  gap: 12px;
`;

const IconContainer = styled.div<{ $visible?: boolean }>`
  display: ${({ $visible }) => ($visible ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  width: auto;
  height: auto;
`;

const Text = styled.span`
  color: #000;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
