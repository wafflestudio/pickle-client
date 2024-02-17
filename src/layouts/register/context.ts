import { createContext } from "react";
import { UserSchema } from "../../services/apis/user";

export type RegisterContextType = UserSchema["signup"]["request"] & {
  set: (partial: Partial<UserSchema["signup"]["request"]>) => void;
};

export const RegisterContext = createContext<RegisterContextType>({
  email: "",
  password: "",
  username: "",
  image: undefined,
  set: () => null,
});
