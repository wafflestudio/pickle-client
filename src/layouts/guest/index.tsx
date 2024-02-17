/**
 * @fileoverview 게스트(비로그인 회원)을 위한 레이아웃
 */

import { useState, useRef, useMemo, useEffect } from "react";
import { useLocation, useOutlet } from "react-router-dom";
import SlideContainer from "../../components/common/SlideContainer";

const ANIMATION_DURATION = 750;

const TABS = [
  { id: 0, path: "splash" },
  { id: 1, path: "login" },
  { id: 2, path: "register" },
];

const useTab = () => {
  const { pathname } = useLocation();
  const path = pathname.split("/")[1];
  const id = TABS.findIndex((tab) => tab.path === path);
  const outlet = useOutlet();

  const component = outlet ? { ...outlet, key: path } : null;

  if (id < 0) return { ...TABS[0], component };
  return { ...TABS[id], component };
};

export default function GuestLayout() {
  const current = useTab();
  const [cache, setCache] = useState(current);
  const timeout = useRef<number | null>(null);

  const render = useMemo(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = null;
      setCache(current);
      return [current.component];
    }

    if (cache.id === current.id) return [current.component];
    if (cache.id < current.id) return [cache.component, current.component];
    return [current.component, cache.component];
  }, [current, cache]);

  useEffect(() => {
    if (cache.id === current.id) return;
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      setCache(current);
      timeout.current = null;
    }, ANIMATION_DURATION);
  }, [current, cache]);

  return (
    <SlideContainer
      animationDuration={ANIMATION_DURATION}
      slideDirection={current.id > cache.id ? "RIGHT" : "NONE"}
    >
      {render}
    </SlideContainer>
  );
}
