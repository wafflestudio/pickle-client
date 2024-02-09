import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../pages/layout";
import Home from "../pages/home";

const router = createBrowserRouter([
  {
    path: "",
    element: <DefaultLayout />,
    children: [{ path: "", element: <Home /> }],
  },
]);

export default router;
