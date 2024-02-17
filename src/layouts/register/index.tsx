import { Outlet } from "react-router-dom";
import { RegisterContext, RegisterContextType } from "./context";
import { useState } from "react";
import { UserSchema } from "../../services/apis/user";

export default function RegisterLayout() {
  const [registerInput, setRegisterInput] = useState<
    UserSchema["signup"]["request"]
  >({
    email: "",
    password: "",
    username: "",
    image: undefined,
  });

  const set: RegisterContextType["set"] = (partial) => {
    setRegisterInput((prev) => ({ ...prev, ...partial }));
  };

  return (
    <RegisterContext.Provider value={{ ...registerInput, set }}>
      <Outlet />
    </RegisterContext.Provider>
  );
}
