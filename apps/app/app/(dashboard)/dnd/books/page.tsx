"use client";

import { blocksHTMLToPageHTML, blocksToHTML } from "@craft/editorjs";
import { useTranslation } from "@craft/translation";
import { Card, CardContent } from "@craft/ui/card";
import {
  DashboardToolbar,
  DashboardBreadcrumb,
  DashboradPageInfo,
  DashboardContent,
} from "app/(dashboard)/components";
import Link from "next/link";

import { CopyPlus } from "lucide-react";
import { cn } from "@craft/ui/utils";

const renderFirstPage = (blocks: any[], theme = "") => {
  const groups = blocksToHTML(blocks);
  const html = blocksHTMLToPageHTML([groups[0]], "0px", {
    className: cn("miniature shadow-smooth-lg", theme),
  });

  return html;
};

// TODO: fix any type and use actions
export default function BooksPage() {
  //TODO: get all books
  const { data, isLoading } = { data: undefined, isLoading: false } as any;
  const { t } = useTranslation();

  if (!data) {
    return "loading";
  }

  const [_, result] = data;

  const books = result?.data ?? [];

  return (
    <>
      <DashboardToolbar>
        <DashboardBreadcrumb
          items={[
            {
              label: t("General.dashboard"),
              href: "/",
            },
            {
              label: t("General.dungeonsAndDragons"),
              href: "/dnd",
            },
            {
              label: t("General.books"),
              href: "/dnd/books",
            },
          ]}
        />

        <DashboradPageInfo title="My Books" description="Overview" />
      </DashboardToolbar>

      <DashboardContent>
        <Card variant="white" className="flex-1">
          <CardContent className="pt-6">
            {books.map((book: any) => (
              <Link
                key={book.id}
                href={`/dnd/books/${book.id}`}
                className="inline-block"
                dangerouslySetInnerHTML={{
                  __html: renderFirstPage(book.content.blocks, book.theme),
                }}
                prefetch
              />
            ))}

            {books.length === 0 && (
              <Link href="/dnd/books/new" prefetch>
                <div className="page miniature">
                  <h1
                    className="wide text-center"
                    style={{
                      zoom: 2.5,
                    }}
                  >
                    Create new book
                  </h1>

                  <span
                    className="wide mx-auto text-center text-[#58180d] block mt-12"
                    style={{
                      zoom: 7,
                    }}
                  >
                    <CopyPlus className="mx-auto" />
                  </span>
                </div>
              </Link>
            )}
          </CardContent>
        </Card>
      </DashboardContent>
    </>
  );
}
