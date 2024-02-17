import { Outlet, useNavigate } from "react-router-dom";
import { useUserQuery } from "../../services/repositories/user";
import Splash from "../../pages/splash";

export default function AuthLayout() {
  const navigate = useNavigate();
  const { me } = useUserQuery();

  if (me.status === "pending") return <Splash />;
  if (me.status === "error") {
    navigate("/hello");
    return null;
  }

  return <Outlet />;
}
