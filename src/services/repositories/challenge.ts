/**
 * @fileoverview queries / mutations for ChallengeRepository
 *
 * ChallengeRepository와 관련된 쿼리 혹은 뮤테이션을 정의합니다.
 *
 */

import { useQuery } from "@tanstack/react-query";
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
