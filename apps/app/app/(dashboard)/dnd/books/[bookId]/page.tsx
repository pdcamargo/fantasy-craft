"use client";

import { Card, CardContent, Skeleton } from "@craft/ui";
import { BookEditor } from "../../../components/book-editor";
import { produce } from "immer";
import { useDebouncedCallback } from "use-debounce";
import { useLayoutEffect, useState } from "react";
import { useTranslation } from "@craft/translation";

// TODO: fix any type and use actons
export default function DndBooksBookIdPage({
  params,
}: {
  params: {
    bookId: string;
  };
}) {
  const { t } = useTranslation();
  const [lastTimeSaved, setLastTimeSaved] = useState<Date | undefined>(
    undefined,
  );
  // TODO: get book by id and update book
  const { data, isLoading } = { data: undefined, isLoading: false } as any;
  const updateBookMutation = { isPending: false, mutateAsync: () => {} } as any;

  const mudateBook = useDebouncedCallback(
    (data) => {
      if (!updateBookMutation.isPending) {
        updateBookMutation.mutateAsync(data);

        setLastTimeSaved(new Date());
      }
    },
    1000,
    { leading: true, trailing: true },
  );

  useLayoutEffect(() => {
    if (data?.[1]?.data?.updatedAt) {
      setLastTimeSaved(new Date(data[1].data.updatedAt));
    }
  }, []);

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
    <>
      <title>
        {t("BookEditor.pageTitle", {
          title: response?.data?.title ?? "",
        })}
      </title>
      <BookEditor
        defaultBlocks={response?.data?.content?.blocks ?? []}
        lastTimeSaved={lastTimeSaved}
        onBlocksChange={(blocks) => {
          if (!updateBookMutation.isPending) {
            mudateBook(
              produce(response.data, (draft: any) => {
                draft.content.blocks = blocks;
              }),
            );
          }
        }}
      />
    </>
  );
}
