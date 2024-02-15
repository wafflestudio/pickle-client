import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export default function HomeNavigator() {
  return (
    <Nav>
      <Tab to="/">1</Tab>
      <Tab to="/feed">2</Tab>
      <Tab to="/upload">3</Tab>
      <Tab to="/me">4</Tab>
    </Nav>
  );
}

const Nav = styled.nav`
  width: 100vw;
  height: 56px;
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
`;

const Tab = styled(Link)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
`;
