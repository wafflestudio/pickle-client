/**
 * @fileoverview 기본 라우터 객체
 *
 * createBrowserRouter를 이용하여 라우터를 객체와 배열로 관리하면, 관심에 따른 라우터 파일의 분리가 쉬워져 이 방법을 선호합니다.
 */

import { Outlet, createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/auth/index";
import ChallengeLayout from "../layouts/challenge/index";
import GuestLayout from "../layouts/guest";
import HomeLayout from "../layouts/home";
import RegisterLayout from "../layouts/register";
import RootLayout from "../layouts/root";
import { Challenge } from "../pages/challenge";
import { ChallengeResult } from "../pages/challenge/result";
import { ChallengeSecret } from "../pages/challenge/secret";
import { ChallengeTry } from "../pages/challenge/try";
import Wip from "../pages/common/Wip";
import Create from "../pages/create";
import Detail from "../pages/detail";
import Feed from "../pages/feed";
import Hello from "../pages/hello";
import Home from "../pages/home";
import Login from "../pages/login";
import Me from "../pages/me";
import RegisterProfile from "../pages/register/Profile";
import Register from "../pages/register/index";
import Time from "../pages/time";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <AuthLayout />,
        children: [
          {
            path: "",
            element: <HomeLayout />,
            children: [
              { path: "", element: <Home /> },
              { path: "feed", element: <Feed /> },
              {
                path: "upload",
                element: <Wip name="업로드" color="#4b52b1" />,
              },
              {
                path: "me",
                element: <Me />,
              },
              {
                path: "/feed/:feedId",
                element: <Detail />,
              },
            ],
          },
          {
            path: "challenge",
            element: <Outlet />,
            children: [
              {
                path: "create",
                element: <Create />,
              },
              {
                path: ":postId",
                element: <ChallengeLayout />,
                children: [
                  { path: "", element: <Challenge /> },
                  {
                    path: ":challengeId",
                    element: <Outlet />,
                    children: [
                      {
                        path: "try",
                        element: <ChallengeTry />,
                      },
                      {
                        path: "result",
                        element: <ChallengeResult />,
                      },
                      {
                        path: "secret",
                        element: <ChallengeSecret />,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },

      {
        path: "",
        element: <GuestLayout />,
        children: [
          { path: "hello", element: <Hello /> },
          { path: "login", element: <Login /> },
          {
            path: "register",
            element: <RegisterLayout />,
            children: [
              {
                path: "",
                element: <Register />,
              },
              {
                path: "profile",
                element: <RegisterProfile />,
              },
              {
                path: "time",
                element: <Time />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
