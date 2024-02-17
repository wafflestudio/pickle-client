import { useQuery } from "@tanstack/react-query";
import { HomeChallengeSchema, homeChallengeRepo } from "../apis/homeChallenge";

export const useGetChallengeList = (
  body: HomeChallengeSchema["getChallengeList"]["request"],
) => {
  const query = useQuery({
    queryKey: ["challengeList"],
    queryFn: () => homeChallengeRepo().getChallengeList(body),
    retry: 1,
    retryDelay: 1000,
    staleTime: Infinity,
  });
  return query;
};

export const useGetRank = (
  feedId: HomeChallengeSchema["getRank"]["request"],
) => {
  const query = useQuery({
    queryKey: ["rank"],
    queryFn: () => homeChallengeRepo().getRank(feedId),
    retry: 1,
    retryDelay: 1000,
    staleTime: Infinity,
  });
  return query;
};
