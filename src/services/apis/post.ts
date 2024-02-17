/**
 * @fileoverview PostRepository 클래스
 *
 * 서버에서 로그인, 회원가입을 진행하거나 로그인 상태를 확인할 때 이용합니다.
 *
 * @module PostRepository
 */

import { HttpClient } from "./httpClient";
import { z } from "zod";

export const PostSchema = {
  getPostList: {
    request: z.object({
      latitude: z.number(),
      longitude: z.number(),
      limit: z.number().optional(),
      cursor: z.string().optional(),
    }),
    response: z.object({
      results: z.array(
        z.object({
          id: z.number(),
          text: z.string(),
          image: z.string(),
          author_id: z.number(),
          author_name: z.string(),
          created_at: z.string(),
          updated_at: z.string(),
          like_count: z.number(),
          latitude: z.number(),
          longitude: z.number(),
          is_liked: z.boolean(),
          distance: z.number(),
        }),
      ),
      count: z.number(),
      next: z.string(),
      previous: z.string(),
    }),
  },
  // // ----------------------------------
  // me: {
  //   response: z.object({
  //     id: z.number(),
  //     email: z.string().email(),
  //     username: z.string(),
  //   }),
  // },
  // checkEmail: {
  //   request: z.string().email(),
  // },
  // checkUsername: {
  //   request: z.string().min(2).max(12),
  // },
  // signup: {
  //   request: z.object({
  //     email: z.string().email(),
  //     password: z.string(),
  //     username: z.string().min(2).max(12),
  //     image: z.instanceof(Blob).optional(),
  //   }),
  //   response: z.object({
  //     id: z.number(),
  //     email: z.string().email(),
  //     username: z.string(),
  //   }),
  // },
  // login: {
  //   request: z.object({
  //     email: z.string().email(),
  //     password: z.string(),
  //   }),
  //   response: z.object({
  //     id: z.number(),
  //     email: z.string().email(),
  //     username: z.string(),
  //   }),
  // },
};

export type PostSchema = {
  getPostList: {
    request: z.infer<(typeof PostSchema)["getPostList"]["request"]>;
    response: z.infer<(typeof PostSchema)["getPostList"]["response"]>;
  };
  // me: {
  //   response: z.infer<(typeof PostSchema)["me"]["response"]>;
  // };
  // checkEmail: {
  //   request: z.infer<(typeof PostSchema)["checkEmail"]["request"]>;
  // };
  // checkUsername: {
  //   request: z.infer<(typeof PostSchema)["checkUsername"]["request"]>;
  // };
  // signup: {
  //   request: z.infer<(typeof PostSchema)["signup"]["request"]>;
  //   response: z.infer<(typeof PostSchema)["signup"]["response"]>;
  // };
  // login: {
  //   request: z.infer<(typeof PostSchema)["login"]["request"]>;
  //   response: z.infer<(typeof PostSchema)["login"]["response"]>;
  // };
};

export class PostRepository {
  private cli: HttpClient;
  constructor(cli: HttpClient) {
    this.cli = cli;
  }

  async getPostList(body: PostSchema["getPostList"]["request"]) {
    const { latitude, longitude, limit, cursor } = body;
    const queryParams = new URLSearchParams();
    queryParams.append("latitude", latitude.toString());
    queryParams.append("longitude", longitude.toString());
    if (cursor) queryParams.append("cursor", cursor);
    if (limit) queryParams.append("limit", limit.toString());

    return await this.cli
      .get(`/api/post/?${queryParams.toString()}`)
      .then((res) => res.data)
      .catch((e) => Promise.reject(e));
  }

  // async checkEmail(body: PostSchema["checkEmail"]["request"]) {
  //   try {
  //     const validQuery = PostSchema.checkEmail.request.parse(body);
  //     return await this.cli
  //       .get(`/api/user/check_email?email=${validQuery}`)
  //       .then((res) => res.data);
  //   } catch (e) {
  //     return Promise.reject(e);
  //   }
  // }

  // async checkUsername(body: PostSchema["checkUsername"]["request"]) {
  //   try {
  //     const validQuery = PostSchema.checkUsername.request.parse(body);
  //     return await this.cli
  //       .get(`/api/user/check_username?username=${validQuery}`)
  //       .then((res) => res.data);
  //   } catch (e) {
  //     return Promise.reject(e);
  //   }
  // }

  // async postSignup(body: PostSchema["signup"]["request"]) {
  //   try {
  //     const validBody = PostSchema.signup.request.parse(body);
  //     const formBody = new FormData();
  //     for (const key in validBody) {
  //       const value = validBody[key as keyof typeof validBody];
  //       if (value) formBody.append(key, value);
  //     }
  //     return await this.cli
  //       .post(`/api/user/signup`, formBody)
  //       .then((res) => res.data)
  //       .then(PostSchema.signup.response.parse);
  //   } catch (e) {
  //     return Promise.reject(e);
  //   }
  // }

  // async postLogin(body: PostSchema["login"]["request"]) {
  //   try {
  //     const validBody = PostSchema.login.request.parse(body);
  //     return await this.cli
  //       .post(`/api/user/login`, validBody)
  //       .then((res) => res.data)
  //       .then(PostSchema.login.response.parse);
  //   } catch (e) {
  //     return Promise.reject(e);
  //   }
  // }
}

export function postRepo() {
  const defaultCli = new PostRepository(new HttpClient());
  return defaultCli;
}

export function postRepoWithCli(cli: HttpClient) {
  return new PostRepository(cli);
}
