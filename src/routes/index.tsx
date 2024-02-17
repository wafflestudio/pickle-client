/**
 * @fileoverview 기본 라우터 객체
 *
 * createBrowserRouter를 이용하여 라우터를 객체와 배열로 관리하면, 관심에 따른 라우터 파일의 분리가 쉬워져 이 방법을 선호합니다.
 */

import { Outlet, createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/root/layout";
import HomeLayout from "../layouts/home";
import Wip from "../pages/common/Wip";
import Home from "../pages/home";
import GuestLayout from "../layouts/guest";
import Login from "../pages/login";
import Hello from "../pages/hello";
import Register from "../pages/register/index";
import AuthLayout from "../layouts/auth/index";
import Feed from "../pages/feed";
import RegisterLayout from "../layouts/register";
import RegisterProfile from "../pages/register/Profile";
import Me from "../pages/me";
import Create from "../pages/create";
import { Challenge } from "../pages/challenge";
import ChallengeLayout from "../layouts/challenge/index";
import Detail from "../pages/detail";
import { ChallengeTry } from "../pages/challenge/try";
import { ChallengeResult } from "../pages/challenge/result";
import { ChallengeSecret } from "../pages/challenge/secret";

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
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
