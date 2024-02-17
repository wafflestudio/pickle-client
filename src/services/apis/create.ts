import { z } from "zod";
import { HttpClient } from "./httpClient";

export const CreateSchema = {
  post: {
    request: z.object({
      text: z.string().min(1).max(50),
      secret_text: z.string().min(1).max(50),
      latitude: z.number(),
      longitude: z.number(),
      image: z.instanceof(Blob),
    }),
  },
};

export type CreateSchema = {
  post: {
    request: z.infer<(typeof CreateSchema)["post"]["request"]>;
  };
};

export class CreateRepository {
  private cli: HttpClient;

  constructor(cli: HttpClient) {
    this.cli = cli;
  }

  async postCreatePost(body: CreateSchema["post"]["request"]) {
    try {
      const validBody = CreateSchema.post.request.parse(body);
      const formBody = new FormData();
      for (const key in validBody) {
        const value = validBody[key as keyof typeof validBody];
        if (value instanceof Blob) formBody.append(key, value);
        else if (typeof value === "string") formBody.append(key, value);
        else formBody.append(key, JSON.stringify(value));
      }
      return await this.cli.post(`api/post/`, formBody).then((res) => res.data);
    } catch (e) {
      return Promise.reject(e);
    }
  }
}

export function createRepo() {
  const defaultCli = new CreateRepository(new HttpClient());
  return defaultCli;
}

export function createRepoWithCli(cli: HttpClient) {
  return new CreateRepository(cli);
}
