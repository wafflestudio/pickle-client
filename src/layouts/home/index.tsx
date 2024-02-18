/**
 * @fileoverview 홈 레이아웃
 *
 * 탭이 나뉘는 홈 레이아웃.
 * 탭 전환 애니메이션을 구현해 두었는데, 이후 커스텀 훅으로 뺄 수 있을 것 같습니다.
 */

import { useMemo, useRef, useState } from "react";
import { useLocation, useOutlet } from "react-router-dom";
import Header from "../../components/common/Header";
import HomeNavigator from "../../components/home/HomeNavigator";
import SlideContainer from "../../components/common/SlideContainer";

// 전환 시간
const ANIMATION_DURATION = 1000;

// 탭 목록
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

// 현재 주소로부터 탭 정보를 찾아 반환하는 훅.
const useTab = () => {
  const { pathname } = useLocation();
  const path = pathname.split("/")[1];
  const id = TABS.findIndex((tab) => tab.path === path);
  const outlet = useOutlet();

  // 최적화를 위해 컴포넌트에 Key 세팅
  const component = outlet ? { ...outlet, key: path } : null;

  if (id < 0) return { ...TABS[0], component };
  return { ...TABS[id], component };
};

export default function HomeLayout() {
  const current = useTab(); // 현재 탭 정보
  const [cache, setCache] = useState(current); // 이전 탭 정보. 애니메이션이 끝날 때 최신화됩니다.
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 디버깅용 콘솔
  // console.log(current);
  // console.log(cache);

  const render = useMemo(() => {
    // 렌더할 컴포넌트를 계산합니다.
    // cache와 current가 동일하면 컴포넌트 하나, 동일하지 않으면 애니메이션 중이라고 판단하고 이전과 현재 컴포넌트의 배열을 반환합니다.
    // 애니메이션 중에 경로가 변경되며 애니메이션을 중단하고 해당 탭으로 바로 전환됩니다. (동작 자체를 추후 개선할 필요 있음)

    // 애니메이션 중에 경로 변경
    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = null;
      setCache(current);
      return [current.component];
    }

    // 애니메이션이 끝났을 때
    if (cache.id === current.id) return [current.component];

    // 애니메이션이 시작할 때
    timeout.current = setTimeout(() => {
      timeout.current = null;
      setCache(current);
    }, ANIMATION_DURATION);
    return [cache.component, current.component]; // 순서가 동일한 이유는 방향에 따라 flex-direction이 바뀌기 때문입니다.
  }, [cache, current]);

  return (
    <>
      <Header color={current.path === "" ? "white" : undefined} />
      <SlideContainer
        slideDirection={
          current.id < cache.id
            ? "LEFT"
            : current.id > cache.id
              ? "RIGHT"
              : "NONE"
        }
      >
        {render}
      </SlideContainer>
      <HomeNavigator />
    </>
  );
}
