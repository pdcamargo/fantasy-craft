"use client";

import { blocksHTMLToPageHTML, blocksToHTML } from "@craft/editorjs";
import { useAllBooks } from "@craft/query";
import { useTranslation } from "@craft/translation";
import { Card, CardContent } from "@craft/ui/card";
import {
  DashboardToolbar,
  DashboardBreadcrumb,
  DashboradPageInfo,
  DashboardContent,
} from "app/dashboard/components";
import Link from "next/link";

const renderFirstPage = (blocks: any[]) => {
  const groups = blocksToHTML(blocks);
  const html = blocksHTMLToPageHTML([groups[0]], "0px", {
    className: "miniature shadow-smooth-lg",
  });

  return html;
};

export default function BooksPage() {
  const { data, isLoading } = useAllBooks();
  const { t } = useTranslation();

  if (!data) {
    return "loading";
  }

  const [_, result] = data;

  return (
    <>
      <DashboardToolbar>
        <DashboardBreadcrumb />

        <DashboradPageInfo title="My Books" description="Overview" />
      </DashboardToolbar>

      <DashboardContent>
        <Card variant="white">
          <CardContent className="pt-6">
            {result.data.map((book) => (
              <Link
                key={book.id}
                href={`/dashboard/dnd/books/${book.id}`}
                className="inline-block"
                dangerouslySetInnerHTML={{
                  __html: renderFirstPage(book.content.blocks),
                }}
                prefetch
              />
            ))}
          </CardContent>
        </Card>
      </DashboardContent>
    </>
  );
}
