/**
 * @fileoverview queries / mutations for PostRepository
 *
 * PostRepository와 관련된 쿼리 혹은 뮤테이션을 정의합니다.
 *
 */

import { useQuery } from "@tanstack/react-query";
import { PostApiSchema, postRepo } from "../apis/post";

export const useGetPostListQuery = (
  body: PostApiSchema["getPostList"]["request"],
) => {
  const query = useQuery({
    queryKey: ["postList"],
    queryFn: () => postRepo().getPostList(body),
    retry: 1,
    retryDelay: 1000,
    staleTime: Infinity,
  });
  return query;
};

export const useGetMyPostListQuery = (
  body: PostApiSchema["getMyPostList"]["request"],
) => {
  const query = useQuery({
    queryKey: ["myPostList"],
    queryFn: () => postRepo().getMyPostList(body),
    retry: 1,
    retryDelay: 1000,
    staleTime: Infinity,
  });
  return query;
};

export const useGetMyLikedPostListQuery = (
  body: PostApiSchema["getMyLikedPostList"]["request"],
) => {
  const query = useQuery({
    queryKey: ["myLikedPostList"],
    queryFn: () => postRepo().getMyLikedPostList(body),
    retry: 1,
    retryDelay: 1000,
    staleTime: Infinity,
  });
  return query;
};

export const useGetPostQuery = (feedId: number) => {
  const query = useQuery({
    queryKey: ["post", feedId],
    queryFn: () => postRepo().getPost(feedId),
  });
  return query;
};
