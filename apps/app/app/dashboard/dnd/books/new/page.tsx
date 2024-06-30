"use client";

import { useTranslation } from "@craft/translation";
import { BookEditor } from "../../../components/book-editor";

export default function DndBooksNewPage() {
  const { t } = useTranslation();

  return (
    <>
      <title>
        {t("BookEditor.pageTitle", {
          title: t("BookEditor.newBook"),
        })}
      </title>
      <BookEditor defaultBlocks={[]} />
    </>
  );
}
