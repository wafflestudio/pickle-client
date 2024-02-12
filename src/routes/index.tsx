/**
 * @fileoverview 기본 라우터 객체
 *
 * createBrowserRouter를 이용하여 라우터를 객체와 배열로 관리하면, 관심에 따른 라우터 파일의 분리가 쉬워져 이 방법을 선호합니다.
 */

import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../pages/layout";
import Home from "../pages/home";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [{ path: "", element: <Home /> }],
  },
]);

export default router;
