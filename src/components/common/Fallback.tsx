import styled from "@emotion/styled";

type Props = {
  message: string;
};

export default function Fallback({ message }: Props) {
  return <LoadingContainer>{message}</LoadingContainer>;
}

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  width: 390px;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;
