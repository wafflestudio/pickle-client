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
    queryFn: async () => {
      const res = await userRepo().getMe();
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(res);
        }, 3000);
      });
      return res;
    },

    retry: 1,
    retryDelay: 1000,
    staleTime: Infinity,
  });

  const login = useMutation({
    mutationFn: (body: UserSchema["login"]["request"]) =>
      userRepo().postLogin(body),
    onSuccess: () => query.refetch(),
  });

  const signup = useMutation({
    mutationFn: (body: UserSchema["signup"]["request"]) =>
      userRepo().postSignup(body),
    onSuccess: () => query.refetch(),
  });

  const checkEmail = useMutation({
    mutationFn: (body: UserSchema["checkEmail"]["request"]) =>
      userRepo().checkEmail(body),
  });

  const checkUsername = useMutation({
    mutationFn: (body: UserSchema["checkUsername"]["request"]) =>
      userRepo().checkUsername(body),
  });

  const uploadTime = useMutation({
    mutationFn: (body: Blob) => userRepo().postTime({ image: body }),
  });

  return { me: query, login, signup, checkEmail, checkUsername, uploadTime };
};
