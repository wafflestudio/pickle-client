/**
 * @fileoverview queries / mutations for PostRepository
 *
 * PostRepository와 관련된 쿼리 혹은 뮤테이션을 정의합니다.
 *
 */

import { useMutation, useQuery } from "@tanstack/react-query";
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

export const useGetMyPostListQuery = (
  body: PostSchema["getMyPostList"]["request"],
) => {
  const query = useQuery({
    queryKey: ["myPostList"],
    queryFn: () => postRepo().getMyPostList({ ...body }),
    retry: 1,
    retryDelay: 1000,
    staleTime: Infinity,
  });
  return query;
};

export const useGetMyLikedPostListQuery = (
  body: PostSchema["getMyLikedPostList"]["request"],
) => {
  const query = useQuery({
    queryKey: ["myLikedPostList"],
    queryFn: () => postRepo().getMyLikedPostList({ ...body }),
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

export const useLikeMutation = () => {
  const mutation = useMutation({
    mutationKey: ["like"],
    mutationFn: (feedId: number) => postRepo().like(feedId),
  });
  return mutation;
};
