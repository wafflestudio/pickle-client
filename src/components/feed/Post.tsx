import { useMemo } from "react";

import styled from "@emotion/styled";
import LikeIcon from "../icons/Like";
import FlagIcon from "../icons/Flag";

interface Props {
  date: string;
  isOdd?: boolean;
  username: string;
  imageUrl: string;
  likeCount: number;
  isLiked?: boolean;
  description?: string;
  challengeCount?: number;
}

type alignType = "left" | "right";

export default function Post({
  date,
  isOdd,
  // isLiked,
  username,
  imageUrl,
  likeCount,
  description,
  // challengeCount,
}: Props) {
  // console.log(
  //   date,
  //   isOdd,
  //   isLiked,
  //   username,
  //   imageUrl,
  //   likeCount,
  //   description,
  //   challengeCount,
  // );
  const align = useMemo(() => (isOdd ? "left" : "right"), [isOdd]);

  return (
    <Container $align={align}>
      <PhotoSection $align={align}>
        <Information $align={align}>
          <DateText $align={align}>{date}</DateText>
          <Username $align={align}>{username}</Username>
        </Information>
        <Photo src={imageUrl} />

        <Icons $align={align}>
          <IconContainer>
            {/* TODO: later 아이콘 추출 따로 */}
            <LikeIcon width={20} height={24} color={"#fff"} />
            <Text>{likeCount}</Text>
          </IconContainer>
          <IconContainer>
            <FlagIcon width={24} height={24} color={"#fff"} />
            <Text>{likeCount}</Text>
          </IconContainer>
        </Icons>
      </PhotoSection>

      <Desc $align={align}>{description}</Desc>
    </Container>
  );
}

const Container = styled.div<{ $align?: alignType }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
  width: 100%;
  height: 355px;
  padding: 16px 0px 12px 0;
  align-items: ${({ $align }) =>
    $align === "left" ? "flex-start" : "flex-end"};
  background: #fff;
  box-shadow: 0px 0px 12px 0px rgba(29, 29, 29, 0.1);
`;

const PhotoSection = styled.section<{ $align?: alignType }>`
  display: flex;
  flex-direction: ${({ $align }) =>
    $align === "left" ? "row-reverse" : "row"};
  justify-content: flex-end;
  width: auto;
  height: 267px;
  position: relative;
`;

const Photo = styled.img`
  width: 88%;
  max-width: 356px;
  height: 267px;
  flex-shrink: 0;
  background: black;
  object-fit: cover;
`;

const Information = styled.div<{ $align?: alignType }>`
  display: flex;
  justify-content: flex-end;
  transform: ${({ $align }) => ($align === "left" ? "none" : "rotate(180deg)")};
`;

const Username = styled.span<{ $align?: alignType }>`
  color: #786e5a;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  text-transform: uppercase;
  font-family: "VCR OSD Mono", sans-serif;
  writing-mode: vertical-lr;
  text-align: ${({ $align }) => $align};
`;

const DateText = styled.span<{ $align?: alignType }>`
  color: #786e5a;
  font-family: "VCR OSD Mono";
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  writing-mode: vertical-lr;
  text-align: ${({ $align }) => $align};
`;

const Desc = styled.h6<{ $align?: alignType }>`
  color: #786e5a;
  text-align: ${({ $align }) => $align};
  font-family: "UhBeeBEOJJI";
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: 0.28px;
  padding: 0 16px;
  margin: 0;
  max-width: 70%;
  word-break: keep-all;
`;

const Icons = styled.div<{ $align?: alignType }>`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
  position: absolute;
  ${({ $align }) => ($align === "right" ? "right: 16px" : "left: 16px")};
  bottom: 12px;
`;

const IconContainer = styled.div`
  display: flex;
  height: 40px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Text = styled.span`
  color: #fff;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
