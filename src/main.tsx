/**
 * @fileoverview ReactDOM에 최초로 렌더링할 Main 컴포넌트
 *
 * Main에서는 React, React-Router-Dom, React-Query와 같은 라이브러리들의 필수적인 래퍼 컴포넌트만을 렌더합니다.
 */

import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes/index.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./utils/react-query/queryClient.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>,
);
