/**
 * @fileoverview queries / mutations for PostRepository
 *
 * PostRepository와 관련된 쿼리 혹은 뮤테이션을 정의합니다.
 *
 */

import { useQuery } from "@tanstack/react-query";
import { PostSchema, postRepo } from "../apis/post";

export const useGetPostListQuery = (
  body: PostSchema["getPostList"]["request"],
) => {
  const query = useQuery({
    queryKey: ["postList"],
    queryFn: () => postRepo().getPostList({ ...body }),
    retry: 1,
    retryDelay: 1000,
    staleTime: Infinity,
  });
  return query;
};
