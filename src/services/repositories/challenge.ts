/**
 * @fileoverview queries / mutations for ChallengeRepository
 *
 * ChallengeRepository와 관련된 쿼리 혹은 뮤테이션을 정의합니다.
 *
 */

import { useMutation } from "@tanstack/react-query";
import { ChallengeSchema, challengeRepo } from "../apis/challenge";

export const useChallengeQuery = () => {
  const start = useMutation({
    mutationFn: (body: ChallengeSchema["postChallenge"]["request"]) =>
      challengeRepo().postChallenge(body),
  });

  const submit = useMutation({
    mutationFn: (params: {
      challengeId: number;
      body: ChallengeSchema["postSubmit"]["request"];
    }) => challengeRepo().postSubmit(params.challengeId, params.body),
  });

  const getEvaluation = useMutation({
    mutationFn: (challengeId: number) =>
      challengeRepo().getEvaluation(challengeId),
  });

  return { start, submit, getEvaluation, challengeRepo };
};
