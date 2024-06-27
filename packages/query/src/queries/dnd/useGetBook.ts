import {
  UseQueryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { FetcherResponse, fetcher } from "../../fetcher";

export const GET_BOOK_QUERY_KEY = "getBookById";

export type GetBookQueryResponse = {
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
  };
};

type UseGetBookQueryOptions = Omit<
  UseQueryOptions<FetcherResponse<GetBookQueryResponse>>,
  "queryFn" | "queryKey"
> & {
  suspense?: boolean;
};

export const useGetBook = (
  bookId: string,
  options?: UseGetBookQueryOptions,
) => {
  const { suspense, ...rest } = options ?? {};

  const useQueryHook = !!suspense ? useSuspenseQuery : useQuery;

  return useQueryHook({
    queryKey: [GET_BOOK_QUERY_KEY, bookId],
    queryFn: async () => {
      const data = await fetcher.get<GetBookQueryResponse>(
        `/api/dnd/books/${bookId}`,
      );

      return data;
    },
    ...rest,
  });
};
