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

  // TODO: unknown DTO
  async postChallenge(challengeId: number, body: { [key: string]: unknown }) {
    return this.cli
      .post(`/api/challenge/${challengeId}`, body)
      .then((res) => res?.data)
      .catch((err) => err);
  }
}

export function challengeRepo() {
  const defaultCli = new ChallengeRepository(createHttpClient());
  return defaultCli;
}

export function challengeRepoWithCli(cli: HttpClient) {
  return new ChallengeRepository(cli);
}
