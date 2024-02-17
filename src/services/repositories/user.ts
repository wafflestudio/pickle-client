/**
 * @fileoverview queries / mutations for UserRepository
 *
 * UserRepository와 관련된 쿼리 혹은 뮤테이션을 정의합니다.
 *
 */

import { useMutation, useQuery } from "@tanstack/react-query";
import { UserSchema, userRepo } from "../apis/user";

export const useUserQuery = () => {
  const query = useQuery({
    queryKey: ["user", "me"],
    queryFn: () => userRepo().getMe(),
  });

  const login = useMutation({
    mutationFn: (body: UserSchema["login"]["request"]) =>
      userRepo().postLogin(body),
  });

  const signup = useMutation({
    mutationFn: (body: UserSchema["signup"]["request"]) =>
      userRepo().postSignup(body),
  });

  return { me: query, login, signup };
};
