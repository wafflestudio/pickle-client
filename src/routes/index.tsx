/**
 * @fileoverview 기본 라우터 객체
 *
 * createBrowserRouter를 이용하여 라우터를 객체와 배열로 관리하면, 관심에 따른 라우터 파일의 분리가 쉬워져 이 방법을 선호합니다.
 */

import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../pages/layout";
import HomeLayout from "../layouts/home";
import Wip from "../pages/Wip";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <HomeLayout />,
        children: [
          { path: "", element: <Wip name="홈(챌린지)" color="white" /> },
          { path: "feed", element: <Wip name="피드" color="#87a284" /> },
          {
            path: "upload",
            element: <Wip name="업로드" color="#4b52b1" />,
          },
          { path: "me", element: <Wip name="마이페이지" color="#c63f30" /> },
        ],
      },
    ],
  },
]);

export default router;
