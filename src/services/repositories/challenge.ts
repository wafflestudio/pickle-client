/**
 * @fileoverview queries / mutations for ChallengeRepository
 *
 * ChallengeRepository와 관련된 쿼리 혹은 뮤테이션을 정의합니다.
 *
 */

import { useMutation, useQuery } from "@tanstack/react-query";
import { ChallengeApiSchema, challengeRepo } from "../apis/challenge";

export const useTodayChallengeQuery = (
  params: ChallengeApiSchema["getTodayChallenge"]["request"],
) => {
  const query = useQuery({
    queryKey: [
      "todayChallenge",
      params.latitude.toFixed(4),
      params.longitude.toFixed(4),
    ],
    queryFn: () => challengeRepo().getTodayChallenge(params),
  });
  return query;
};

export const useOhterChallengesQuery = (
  params: ChallengeApiSchema["getTodayChallenge"]["request"],
) => {
  const query = useQuery({
    queryKey: [
      "otherChallenge",
      params.latitude.toFixed(4),
      params.longitude.toFixed(4),
    ],
    queryFn: () => challengeRepo().getOtherChallenges(params),
  });
  return query;
};

export const useChallengeStartQuery = () => {
  const start = useMutation({
    mutationFn: (body: ChallengeApiSchema["postChallenge"]["request"]) =>
      challengeRepo().postChallenge(body),
  });

  const submit = useMutation({
    mutationFn: (params: {
      challengeId: number;
      body: ChallengeApiSchema["postSubmit"]["request"];
    }) => challengeRepo().postSubmit(params.challengeId, params.body),
  });

  const getEvaluation = useMutation({
    mutationFn: (challengeId: number) =>
      challengeRepo().getEvaluation(challengeId),
  });

  return { start, submit, getEvaluation, challengeRepo };
  return { start };
};

export const useChallengeQuery = (challengeId: number) => {
  const query = useQuery({
    queryKey: ["challenge", { challengeId }],
    queryFn: () => challengeRepo().get(challengeId),
    retry: 1,
  });
  const submit = useMutation({
    mutationFn: (body: ChallengeApiSchema["postSubmit"]["request"]) =>
      challengeRepo().postSubmit(challengeId, body),
    onSuccess: () => query.refetch(),
  });
  const getEvaluation = useMutation({
    mutationFn: () => challengeRepo().getEvaluation(challengeId),
    onSuccess: () => query.refetch(),
  });

  return { challenge: query, submit, getEvaluation };
};
