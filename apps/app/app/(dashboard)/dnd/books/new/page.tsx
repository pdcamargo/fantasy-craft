"use client";

import { useTranslation } from "@craft/translation";
import { BookEditor } from "../../../components/book-editor";
import { Suspense } from "react";

export default function DndBooksNewPage() {
  const { t } = useTranslation();

  return (
    <Suspense>
      <title>
        {t("BookEditor.pageTitle", {
          title: t("BookEditor.newBook"),
        })}
      </title>
      <BookEditor defaultBlocks={[]} />
    </Suspense>
  );
}
