"use client";

import { useGetBook, useUpdateBook } from "@craft/query";
import { Card, CardContent, Skeleton } from "@craft/ui";
import { BookEditor } from "../book-editor";
import { produce } from "immer";
import { useDebouncedCallback } from "use-debounce";

export default function DndBooksBookIdPage({
  params,
}: {
  params: {
    bookId: string;
  };
}) {
  const { data, isLoading } = useGetBook(params.bookId);
  const updateBookMutation = useUpdateBook(params.bookId);

  const mudateBook = useDebouncedCallback(
    (data) => {
      if (!updateBookMutation.isPending) {
        updateBookMutation.mutateAsync(data);
      }
    },
    1000,
    { leading: true, trailing: true },
  );

  if (!data || isLoading) {
    return (
      <Card variant="white">
        <CardContent className="flex flex-row gap-2 px-0 pb-0">
          <div
            className="flex-1 overflow-hidden min-w-[800px] max-w-[850px]"
            style={{
              height: "calc(100vh - 65px)",
            }}
          >
            <div
              className="w-full overflow-auto py-8 px-12 flex flex-col gap-5"
              style={{
                height: "calc(100vh - 65px)",
              }}
            >
              {Array.from({ length: 10 }).map((_, idx) => (
                <Skeleton key={idx} className="w-full h-5 bg-gray-500/10" />
              ))}
            </div>
          </div>

          <div
            className="flex-1 bg-[#e6e5e5] shadow-inner overflow-hidden"
            style={{
              height: "calc(100vh - 65px)",
            }}
          ></div>
        </CardContent>
      </Card>
    );
  }

  const [result, response] = data;

  if (result.status === 404) {
    return (
      <div className="w-full h-full flex-1 flex flex-col items-center justify-center text-center">
        <span className="text-3xl text-red-500 font-bold">404</span>
        <span className="text-xl text-gray-900 font-bold">Book not found</span>
      </div>
    );
  }

  return (
    <BookEditor
      defaultBlocks={response?.data?.content?.blocks ?? []}
      onBlocksChange={(blocks) => {
        if (!updateBookMutation.isPending) {
          mudateBook(
            produce(response.data, (draft) => {
              draft.content.blocks = blocks;
            }),
          );
        }
      }}
    />
  );
}
