import { HttpClient } from "./httpClient";
import { z } from "zod";

export const CoordsSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

export type CoordsSchema = z.infer<typeof CoordsSchema>;

export const PostSchema = z.object({
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
});

export type PostSchema = z.infer<typeof PostSchema>;

export const PostApiSchema = {
  getPostList: {
    request: z.object({
      ...CoordsSchema.shape,
      limit: z.number().optional(),
      cursor: z.string().optional(),
    }),
    response: z.object({
      results: z.array(PostSchema),
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
      results: z.array(PostSchema),
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
  getPost: {
    request: z.number(),
    response: z.object({
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
  },
  like: {
    request: z.number(),
    response: z.object({
      like_count: z.number(),
      challenge_count: z.number(),
      latitude: z.number(),
      longitude: z.number(),
      is_liked: z.boolean(),
    }),
  },
};

export type PostApiSchema = {
  getPostList: {
    request: z.infer<(typeof PostApiSchema)["getPostList"]["request"]>;
    response: z.infer<(typeof PostApiSchema)["getPostList"]["response"]>;
  };
  getMyPostList: {
    request: z.infer<(typeof PostApiSchema)["getMyPostList"]["request"]>;
    response: z.infer<(typeof PostApiSchema)["getMyPostList"]["response"]>;
  };
  getMyLikedPostList: {
    request: z.infer<(typeof PostApiSchema)["getMyLikedPostList"]["request"]>;
    response: z.infer<(typeof PostApiSchema)["getMyLikedPostList"]["response"]>;
  };
  getPost: {
    request: z.infer<(typeof PostApiSchema)["getPost"]["request"]>;
    response: z.infer<(typeof PostApiSchema)["getPost"]["response"]>;
  };
  like: {
    request: z.infer<(typeof PostApiSchema)["like"]["request"]>;
    response: z.infer<(typeof PostApiSchema)["like"]["response"]>;
  };
};

export class PostRepository {
  private cli: HttpClient;
  constructor(cli: HttpClient) {
    this.cli = cli;
  }

  async getPostList(
    body: PostApiSchema["getPostList"]["request"],
  ): Promise<PostApiSchema["getPostList"]["response"]> {
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

  async getMyPostList(
    body: PostApiSchema["getMyPostList"]["request"],
  ): Promise<PostApiSchema["getMyPostList"]["response"]> {
    const { limit, cursor } = body;
    const queryParams = new URLSearchParams();
    if (cursor) queryParams.append("cursor", cursor);
    if (limit) queryParams.append("limit", limit.toString());

    return await this.cli
      .get(`/api/post/my/list?${queryParams.toString()}`)
      .then((res) => res.data)
      .catch((e) => Promise.reject(e));
  }

  async getMyLikedPostList(
    body: PostApiSchema["getMyLikedPostList"]["request"],
  ): Promise<PostApiSchema["getMyLikedPostList"]["response"]> {
    const { limit, cursor } = body;
    const queryParams = new URLSearchParams();
    if (cursor) queryParams.append("cursor", cursor);
    if (limit) queryParams.append("limit", limit.toString());

    return await this.cli
      .get(`/api/post/liked_list?${queryParams.toString()}`)
      .then((res) => res.data)
      .catch((e) => Promise.reject(e));
  }

  async getPost(feedId: PostApiSchema["getPost"]["request"]) {
    return await this.cli
      .get(`/api/post/${feedId}`)
      .then((res) => res.data)
      .catch((e) => Promise.reject(e));
  }

  async like(feedId: PostApiSchema["like"]["request"]) {
    return await this.cli
      .post(`/api/post/${feedId}/like`, {})
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
