import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateSchema, createRepo } from "../apis/create";

export const useCreateQuery = () => {
  const queryClient = useQueryClient();

  const post = useMutation({
    mutationFn: (body: CreateSchema["post"]["request"]) =>
      createRepo().postCreatePost(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["post"] }),
  });

  return { post };
};
