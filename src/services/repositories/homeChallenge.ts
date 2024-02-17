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
