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
          challenge_count: z.number(),
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
  getMyPostList: {
    request: z.object({
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
          challenge_count: z.number(),
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
  getMyLikedPostList: {
    request: z.object({
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
          challenge_count: z.number(),
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
};

export type PostSchema = {
  getPostList: {
    request: z.infer<(typeof PostSchema)["getPostList"]["request"]>;
    response: z.infer<(typeof PostSchema)["getPostList"]["response"]>;
  };
  getMyPostList: {
    request: z.infer<(typeof PostSchema)["getMyPostList"]["request"]>;
    response: z.infer<(typeof PostSchema)["getMyPostList"]["response"]>;
  };
  getMyLikedPostList: {
    request: z.infer<(typeof PostSchema)["getMyLikedPostList"]["request"]>;
    response: z.infer<(typeof PostSchema)["getMyLikedPostList"]["response"]>;
  };
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

  async getMyPostList(body: PostSchema["getMyPostList"]["request"]) {
    const { limit, cursor } = body;
    const queryParams = new URLSearchParams();
    if (cursor) queryParams.append("cursor", cursor);
    if (limit) queryParams.append("limit", limit.toString());

    return await this.cli
      .get(`/api/post/my/list?${queryParams.toString()}`)
      .then((res) => res.data)
      .catch((e) => Promise.reject(e));
  }

  async getMyLikedPostList(body: PostSchema["getMyLikedPostList"]["request"]) {
    const { limit, cursor } = body;
    const queryParams = new URLSearchParams();
    if (cursor) queryParams.append("cursor", cursor);
    if (limit) queryParams.append("limit", limit.toString());

    return await this.cli
      .get(`/api/post/liked_list?${queryParams.toString()}`)
      .then((res) => res.data)
      .catch((e) => Promise.reject(e));
  }
}

export function postRepo() {
  const defaultCli = new PostRepository(new HttpClient());
  return defaultCli;
}

export function postRepoWithCli(cli: HttpClient) {
  return new PostRepository(cli);
}
