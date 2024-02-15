import styled from "@emotion/styled";
import { useMemo, useRef, useState } from "react";
import { useLocation, useOutlet } from "react-router-dom";
import HomeNavigator from "../../components/home/HomeNavigator";
import { css, keyframes } from "@emotion/react";

const TABS = [
  {
    id: 0,
    path: "",
  },
  {
    id: 1,
    path: "feed",
  },
  {
    id: 2,
    path: "upload",
  },
  {
    id: 3,
    path: "me",
  },
] as const;

const useTab = () => {
  const { pathname } = useLocation();
  const path = pathname.split("/")[1];
  const id = TABS.findIndex((tab) => tab.path === path);
  const outlet = useOutlet();

  //sets key to outlet component
  const component = outlet ? { ...outlet, key: path } : null;

  if (id < 0) return { ...TABS[0], component };
  return { ...TABS[id], component };
};

export default function HomeLayout() {
  const current = useTab();
  const [cache, setCache] = useState(current);
  const timeout = useRef<number | null>(null);

  const render = useMemo(() => {
    // stop ongoing transition
    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = null;
      setCache(current);
      return [current.component];
    }

    // stop transition
    if (cache.id === current.id) return [current.component];

    // start transition
    timeout.current = setTimeout(() => {
      timeout.current = null;
      setCache(current);
    }, 1000);
    return [cache.component, current.component];
  }, [cache, current]);

  return (
    <>
      <Container
        $slide={
          cache.id < current.id
            ? "RIGHT"
            : cache.id > current.id
              ? "LEFT"
              : "NONE"
        }
      >
        {render}
      </Container>
      <HomeNavigator />
    </>
  );
}

const Container = styled.div<{
  $slide: "LEFT" | "RIGHT" | "NONE";
}>`
  position: relative;

  display: flex;

  ${(props) => {
    if (props.$slide === "LEFT")
      return css`
        flex-direction: row-reverse;
        animation: ${toLeft} 1s ease;
      `;
    if (props.$slide === "RIGHT")
      return css`
        flex-direction: row;
        animation: ${toRight} 1s ease;
      `;
    return css`
      transform: translateX(0);
    `;
  }}
`;

const toLeft = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

const toRight = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;
