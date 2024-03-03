/**
 * @fileoverview ChallengeRepository 클래스
 *
 * 서버에서 챌린지 정보를 가져오거나 생성하는 데 사용됩니다.
 * HTTP 클라이언트를 생성하고 이를 ChallengeRepository에 주입하여 사용합니다.
 * 클라이언트 injection이 필요하다면, challengeRepoWithCli를 사용해 클라이언트를 주입해 사용할 수 있습니다.
 *
 * @module ChallengeRepository
 */

import { z } from "zod";
import createHttpClient, { HttpClient } from "./httpClient";
import { CoordsSchema, PostSchema } from "./post";

export const ChallengeApiSchema = {
  getTodayChallenge: {
    request: CoordsSchema,
    response: PostSchema,
  },
  getOtherChallenges: {
    request: CoordsSchema,
    response: z.array(PostSchema),
  },
  get: {
    response: z.object({
      id: z.number(),
      coordinate: z.object({
        latitude: z.number(),
        longitude: z.number(),
      }),
      start_time: z.string().optional(),
      image: z.string().nullable(),
      similarity: z.number().nullable(),
      result: z.string().nullable(),
      post: z.object({
        id: z.number(),
        text: z.string(),
        secret_text: z.string(),
        image: z.string(),
      }),
    }),
  },
  postChallenge: {
    request: z.object({
      post_id: z.number(),
    }),
  },
  postSubmit: {
    request: z.object({
      image: z.instanceof(Blob),
    }),
  },
};

export type ChallengeApiSchema = {
  getTodayChallenge: {
    request: z.infer<
      (typeof ChallengeApiSchema)["getTodayChallenge"]["request"]
    >;
    response: z.infer<
      (typeof ChallengeApiSchema)["getTodayChallenge"]["response"]
    >;
  };
  getOtherChallenges: {
    request: z.infer<
      (typeof ChallengeApiSchema)["getOtherChallenges"]["request"]
    >;
    response: z.infer<
      (typeof ChallengeApiSchema)["getOtherChallenges"]["response"]
    >;
  };
  get: {
    response: z.infer<(typeof ChallengeApiSchema)["get"]["response"]>;
  };
  postChallenge: {
    request: z.infer<(typeof ChallengeApiSchema)["postChallenge"]["request"]>;
  };
  postSubmit: {
    request: z.infer<(typeof ChallengeApiSchema)["postSubmit"]["request"]>;
  };
};

export class ChallengeRepository {
  private cli: HttpClient;

  constructor(cli: HttpClient) {
    this.cli = cli;
  }

  async getTodayChallenge(
    params: ChallengeApiSchema["getTodayChallenge"]["request"],
  ): Promise<ChallengeApiSchema["getTodayChallenge"]["response"]> {
    const queryParams = new URLSearchParams();
    queryParams.append("latitude", params.latitude.toString());
    queryParams.append("longitude", params.longitude.toString());
    return this.cli
      .get(`/api/challenge/today?${queryParams.toString()}`)
      .then((res) => res?.data)
      .catch((err) => err);
  }

  async getOtherChallenges(
    params: ChallengeApiSchema["getOtherChallenges"]["request"],
  ): Promise<ChallengeApiSchema["getOtherChallenges"]["response"]> {
    const queryParams = new URLSearchParams();
    queryParams.append("latitude", params.latitude.toString());
    queryParams.append("longitude", params.longitude.toString());
    return this.cli
      .get(`/api/challenge/?${queryParams.toString()}`)
      .then((res) => res?.data)
      .catch((err) => err);
  }

  async get(
    challengeId: number,
  ): Promise<ChallengeApiSchema["get"]["response"]> {
    return await this.cli
      .get(`/api/challenge/${challengeId}`)
      .then((res) => res.data)
      .then(ChallengeApiSchema.get.response.parse);
  }

  async postChallenge(body: ChallengeApiSchema["postChallenge"]["request"]) {
    try {
      const validBody = ChallengeApiSchema.postChallenge.request.parse(body);
      return await this.cli
        .post(`/api/challenge/`, validBody)
        .then((res) => res.data);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async postSubmit(
    challengeId: number,
    body: ChallengeApiSchema["postSubmit"]["request"],
  ) {
    try {
      const validBody = ChallengeApiSchema.postSubmit.request.parse(body);
      const formData = new FormData();
      formData.append("image", validBody.image);
      return await this.cli
        .post(`/api/challenge/${challengeId}/submit`, formData)
        .then((res) => res.data);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async getEvaluation(challengeId: number) {
    return await fetch(
      `https://seeya-api.wafflestudio.com/api/challenge/${challengeId}/evaluate`,
      {
        credentials: "include",
        cache: "no-cache",
      },
    ).then((res) => res.body);
  }
}

export function challengeRepo() {
  const defaultCli = new ChallengeRepository(createHttpClient());
  return defaultCli;
}

export function challengeRepoWithCli(cli: HttpClient) {
  return new ChallengeRepository(cli);
}
