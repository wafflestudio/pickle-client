/**
 * @fileoverview queries / mutations for ChallengeRepository
 *
 * ChallengeRepository와 관련된 쿼리 혹은 뮤테이션을 정의합니다.
 *
 */

import { useQuery } from "@tanstack/react-query";
import { challengeRepo } from "../apis/challenge";

export const useChallengeQuery = (challengeId: number) => {
  const query = useQuery({
    queryKey: ["challenge", challengeId],
    queryFn: () => challengeRepo().getChallenge(challengeId),
  });
  return query;
};
