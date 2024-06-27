import {
  UseQueryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { FetcherResponse, fetcher } from "../../fetcher";

export const ALL_BOOKS_QUERY_KEY = "getAllBooks";

export type AllBooksQueryResponse = {
  data: {
    userId: number;
    title: string;
    description: string;
    author: string;
    isPublished: boolean;
    theme: string;
    content: {
      version: string;
      time: number;
      blocks: Array<{
        type: string;
        data: Record<string, any>;
      }>;
    };
    createdAt: string;
    updatedAt: string;
    slug: string;
    id: string;
  }[];
};

type AllBooksQueryOptions = Omit<
  UseQueryOptions<FetcherResponse<AllBooksQueryResponse>>,
  "queryFn" | "queryKey"
> & {
  suspense?: boolean;
};

export const useAllBooks = (options?: AllBooksQueryOptions) => {
  const { suspense, ...rest } = options ?? {};

  const useQueryHook = !!suspense ? useSuspenseQuery : useQuery;

  return useQueryHook({
    queryKey: [ALL_BOOKS_QUERY_KEY],
    queryFn: async () => {
      const data = await fetcher.get<AllBooksQueryResponse>(`/api/dnd/books`);

      return data;
    },
    ...rest,
  });
};
