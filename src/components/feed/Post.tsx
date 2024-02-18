import { useCallback, useMemo } from "react";

import styled from "@emotion/styled";
import LikeIcon from "../icons/Like";
import FlagIcon from "../icons/Flag";
import { useLikeMutation } from "../../services/repositories/post";
import { useParams } from "react-router-dom";
import LikeFillIcon from "../icons/LikeFill";

interface Props {
  date: string;
  isOdd?: boolean;
  username: string;
  imageUrl: string;
  likeCount: number;
  isLiked?: boolean;
  description?: string;
  challengeCount?: number;
  onClick?: () => void;
}

type alignType = "left" | "right";

export default function Post({
  date,
  isOdd,
  isLiked,
  username,
  imageUrl,
  likeCount,
  description,
  challengeCount,
  onClick,
}: Props) {
  const { feedId } = useParams();
  const align = useMemo(() => (isOdd ? "left" : "right"), [isOdd]);
  const diff = useMemo(() => {
    const current = new Date();
    const updated = new Date(date);
    const diff = current.getTime() - updated.getTime();
    const before = Math.floor(diff / 1000 / 60 / 60);
    if (before < 1) return `${Math.floor(diff / 1000 / 60)}분 전`;
    return `${before}시간 전`;
  }, [date]);

  const {
    mutateAsync: like,
    data: likeInformation,
    isSuccess,
  } = useLikeMutation();

  const handleToggleLike = useCallback(() => {
    like(Number(feedId))
      .then(() => {})
      .catch(() => {});
  }, [feedId, like]);

  return (
    // TODO: link
    <Container $align={align} onClick={onClick}>
      <PhotoSection $align={align}>
        <Information $align={align}>
          <DateText $align={align}>{date}</DateText>
          <Username $align={align}>{username}</Username>
        </Information>
        <Photo src={imageUrl} />

        <Icons $align={align}>
          <IconContainer onClick={handleToggleLike}>
            {/* TODO: later 아이콘 추출 따로 */}

            {(isSuccess ? likeInformation?.is_liked : isLiked) ? (
              <>
                <LikeFillIcon width={20} height={20} color={"#fff"} />
                <Text>
                  {isSuccess ? likeInformation?.like_count : likeCount}
                </Text>
              </>
            ) : (
              <>
                <LikeIcon width={20} height={20} color={"#fff"} />
                <Text>
                  {isSuccess ? likeInformation?.like_count : likeCount}
                </Text>
              </>
            )}
          </IconContainer>
          <IconContainer>
            <FlagIcon width={20} height={20} color={"#fff"} />
            <Text>{challengeCount}</Text>
          </IconContainer>
        </Icons>
      </PhotoSection>

      <Desc $align={align}>{description}</Desc>
      <Diff $align={align}>{diff}</Diff>
    </Container>
  );
}

const Container = styled.div<{ $align?: alignType }>`
  display: flex;
  position: relative;
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
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
  }
`;

const PhotoSection = styled.section<{ $align?: alignType }>`
  display: flex;
  flex-direction: ${({ $align }) =>
    $align === "left" ? "row-reverse" : "row"};
  justify-content: flex-end;
  width: 382px;
  height: 267px;
  position: relative;
`;

const Photo = styled.img`
  width: 88%;
  max-width: 356px;
  height: 267px;
  flex-shrink: 1;
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
  -webkit-text-stroke-width: 0.25;
  -webkit-text-stroke-color: #786e5a;
`;

const Icons = styled.div<{ $align?: alignType }>`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
  position: absolute;
  ${({ $align }) => ($align === "right" ? "right: 16px" : "left: 16px")};
  bottom: 12px;
  background: transparent;
  mix-blend-mode: exclusion;
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

const Diff = styled.span<{ $align?: alignType }>`
  color: #878787;
  font-family: "Spoqa Han Sans Neo";
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  position: absolute;
  bottom: 12px;
  ${({ $align }) => ($align === "right" ? "left: 16px" : "right: 16px")};
`;
