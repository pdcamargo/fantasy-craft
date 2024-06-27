import { z } from "zod";

import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { FetcherResponse, fetcher } from "../../fetcher";
import { GET_BOOK_QUERY_KEY } from "./useGetBook";

export const updateBookSchema = z.object({
  title: z.string().trim().optional(),
  description: z.string().optional(),
  author: z.string().trim().optional(),
  theme: z.string().trim().optional(),
  content: z.object({
    version: z.string().trim(),
    time: z.number(),
    blocks: z.array(
      z.object({
        type: z.string().trim(),
        data: z.record(z.string(), z.unknown()),
      }),
    ),
  }),
});

export type UpdateBookData = z.infer<typeof updateBookSchema>;

export type UpdateMutationResponse = {
  message: string;
};

export const useUpdateBook = (bookId: string) => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateBookData) => {
      updateBookSchema.parse(data);

      const [, response] = await fetcher.put<UpdateMutationResponse>(
        `/api/dnd/books/${bookId}`,
        data,
      );

      return response;
    },
    retry: false,
  });
};
