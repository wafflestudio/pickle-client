/**
 * @fileoverview queries / mutations for ChallengeRepository
 *
 * ChallengeRepository와 관련된 쿼리 혹은 뮤테이션을 정의합니다.
 *
 */

import { useQuery, useMutation } from "@tanstack/react-query";
import { ChallengeApiSchema, challengeRepo } from "../apis/challenge";
export const useTodayChallengeQuery = (
  params: ChallengeApiSchema["getTodayChallenge"]["request"],
) => {
  const query = useQuery({
    queryKey: ["todayChallenge"],
    queryFn: () => challengeRepo().getTodayChallenge(params),
  });
  return query;
};

export const useOhterChallengesQuery = (
  params: ChallengeApiSchema["getTodayChallenge"]["request"],
) => {
  const query = useQuery({
    queryKey: ["otherChallenge", params.latitude, params.longitude],
    queryFn: () => challengeRepo().getOtherChallenges(params),
  });
  return query;
};

export const useChallengeQuery = () => {
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
};
