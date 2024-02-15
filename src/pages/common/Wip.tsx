import styled from "@emotion/styled";

type WipProps = {
  name: string;
  color?: string;
};

export default function Wip({ name, color }: WipProps) {
  return (
    <Main style={{ backgroundColor: color ?? "white" }}>
      {name} on progress
    </Main>
  );
}

const Main = styled.main`
  width: 100%;
  height: 400px;
  flex-grow: 0;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
