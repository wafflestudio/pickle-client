import { HttpClient } from "./httpClient";
import { z } from "zod";

export const HomeChallengeSchema = {
  getChallengeList: {
    request: z.object({
      latitude: z.number(),
      longitude: z.number(),
    }),
    response: z.array(
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
  },
  getRank: {
    request: z.number(),
    response: z.array(
      z.object({
        id: z.number(),
        coordinate: z.object({
          latitude: z.number(),
          longitude: z.number(),
        }),
        start_time: z.string(),
        image: z.string(),
        similarity: z.number(),
        result: z.string(),
        username: z.string(),
      }),
    ),
  },
};

export type HomeChallengeSchema = {
  getChallengeList: {
    request: z.infer<
      (typeof HomeChallengeSchema)["getChallengeList"]["request"]
    >;
    response: z.infer<
      (typeof HomeChallengeSchema)["getChallengeList"]["response"]
    >;
  };
  getRank: {
    request: z.infer<(typeof HomeChallengeSchema)["getRank"]["request"]>;
    response: z.infer<(typeof HomeChallengeSchema)["getRank"]["response"]>;
  };
};

export class HomeChallengeRepository {
  private cli: HttpClient;
  constructor(cli: HttpClient) {
    this.cli = cli;
  }

  async getChallengeList(
    body: HomeChallengeSchema["getChallengeList"]["request"],
  ) {
    const { latitude, longitude } = body;
    const queryParams = new URLSearchParams();
    queryParams.append("latitude", latitude.toString());
    queryParams.append("longitude", longitude.toString());

    return await this.cli
      .get(`/api/challenge/?${queryParams.toString()}`)
      .then((res) => res.data)
      .catch((e) => Promise.reject(e));
  }

  async getRank(feedId: HomeChallengeSchema["getRank"]["request"]) {
    return await this.cli
      .get(`/api/post/${feedId}/challenges`)
      .then((res) => res.data)
      .catch((e) => Promise.reject(e));
  }
}

export function homeChallengeRepo() {
  const defaultCli = new HomeChallengeRepository(new HttpClient());
  return defaultCli;
}

export function homeChallengeRepoWithCli(cli: HttpClient) {
  return new HomeChallengeRepository(cli);
}
