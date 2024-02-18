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
      image: z.string().nullable(),
    }),
  },
  checkEmail: {
    request: z.string().email(),
  },
  checkUsername: {
    request: z.string().min(2).max(12),
  },
  signup: {
    request: z.object({
      email: z.string().email(),
      password: z.string(),
      username: z.string().min(2).max(12),
      image: z.instanceof(Blob).optional(),
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
  checkEmail: {
    request: z.infer<(typeof UserSchema)["checkEmail"]["request"]>;
  };
  checkUsername: {
    request: z.infer<(typeof UserSchema)["checkUsername"]["request"]>;
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

  async checkEmail(body: UserSchema["checkEmail"]["request"]) {
    try {
      const validQuery = UserSchema.checkEmail.request.parse(body);
      return await this.cli
        .get(`/api/user/check_email?email=${validQuery}`)
        .then((res) => res.data);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async checkUsername(body: UserSchema["checkUsername"]["request"]) {
    try {
      const validQuery = UserSchema.checkUsername.request.parse(body);
      return await this.cli
        .get(`/api/user/check_username?username=${validQuery}`)
        .then((res) => res.data);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async postSignup(body: UserSchema["signup"]["request"]) {
    try {
      const validBody = UserSchema.signup.request.parse(body);
      const formBody = new FormData();
      for (const key in validBody) {
        const value = validBody[key as keyof typeof validBody];
        if (value) formBody.append(key, value);
      }
      return await this.cli
        .post(`/api/user/signup`, formBody)
        .then((res) => res.data)
        .then(UserSchema.signup.response.parse);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async postLogin(body: UserSchema["login"]["request"]) {
    try {
      const validBody = UserSchema.login.request.parse(body);
      return await this.cli
        .post(`/api/user/login`, validBody)
        .then((res) => res.data)
        .then(UserSchema.login.response.parse);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async postTime(body: { image: Blob }) {
    try {
      const formBody = new FormData();
      formBody.append("image", body.image);
      return await this.cli
        .post(`/api/user/timetable`, formBody)
        .then((res) => res.data);
    } catch (e) {
      return Promise.reject(e);
    }
  }
}

export function userRepo() {
  const defaultCli = new UserRepository(new HttpClient());
  return defaultCli;
}

export function userRepoWithCli(cli: HttpClient) {
  return new UserRepository(cli);
}
