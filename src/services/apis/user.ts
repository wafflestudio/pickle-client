/**
 * @fileoverview UserRepository 클래스
 *
 * 서버에서 로그인, 회원가입을 진행하거나 로그인 상태를 확인할 때 이용합니다.
 *
 * @module UserRepository
 */

import { HttpClient } from "./httpClient";
import { z } from "zod";

export const UserSchema = {
  me: {
    response: z.object({
      id: z.number(),
      email: z.string().email(),
      username: z.string(),
    }),
  },
  signup: {
    request: z.object({
      email: z.string().email(),
      username: z.string(),
      password: z.string(),
    }),
    response: z.object({
      id: z.number(),
      email: z.string().email(),
      username: z.string(),
    }),
  },
  login: {
    request: z.object({
      email: z.string().email(),
      password: z.string(),
    }),
    response: z.object({
      id: z.number(),
      email: z.string().email(),
      username: z.string(),
    }),
  },
};

export type UserSchema = {
  me: {
    response: z.infer<(typeof UserSchema)["me"]["response"]>;
  };
  signup: {
    request: z.infer<(typeof UserSchema)["signup"]["request"]>;
    response: z.infer<(typeof UserSchema)["signup"]["response"]>;
  };
  login: {
    request: z.infer<(typeof UserSchema)["login"]["request"]>;
    response: z.infer<(typeof UserSchema)["login"]["response"]>;
  };
};

export class UserRepository {
  private cli: HttpClient;
  constructor(cli: HttpClient) {
    this.cli = cli;
  }

  async getMe() {
    return await this.cli
      .get(`/api/user/me`)
      .then((res) => res.data)
      .then(UserSchema.me.response.parse);
  }

  async postSignup(body: UserSchema["signup"]["request"]) {
    try {
      const validBody = UserSchema.signup.request.parse(body);
      return await this.cli
        .post(`/api/user/signup`, validBody)
        .then((res) => res.data)
        .then(UserSchema.signup.response.parse);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async postLogin(body: UserSchema["login"]["request"]) {
    return this.cli
      .post(`/api/user/login`, body)
      .then((res) => res?.data)
      .catch((err) => err);
  }
}

export function userRepo() {
  const defaultCli = new UserRepository(new HttpClient());
  return defaultCli;
}

export function userRepoWithCli(cli: HttpClient) {
  return new UserRepository(cli);
}
