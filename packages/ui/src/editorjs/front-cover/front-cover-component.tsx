import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { produce } from "immer";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "../../separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../collapsible";

const frontCoverComponentSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  bannerText: z.string(),
  footNote: z.string(),
  background: z.object({
    url: z.string(),
    caption: z.string(),
  }),
  logo: z.object({
    url: z.string(),
    caption: z.string(),
  }),
  md: z.string().optional().nullable(),
});

export type FrontCoverComponentData = z.infer<typeof frontCoverComponentSchema>;

export type FrontCoverComponentProps = {
  initialData?: FrontCoverComponentData;
  t: (key: string) => string;
};

export type FrontCoverComponentRef = {
  save: () => FrontCoverComponentData;
};

export const FrontCoverComponent = forwardRef<
  FrontCoverComponentRef,
  FrontCoverComponentProps
>(({ initialData, t }, ref) => {
  const form = useForm<FrontCoverComponentData>({
    resolver: zodResolver(frontCoverComponentSchema),
    defaultValues: initialData ?? {
      background: {
        url: "",
        caption: "",
      },
      logo: {
        url: "",
        caption: "",
      },
      bannerText: "",
      footNote: "",
      subtitle: "",
      title: "",
      md: "",
    },
  });

  const save = useCallback(() => {
    return form.getValues();
  }, [form]);

  useImperativeHandle(ref, () => ({ save }));

  return (
    <form onSubmit={form.handleSubmit(() => {})}>
      <div className="p-2 border-gray-200 rounded-lg border mb-3">
        <label>
          <span className="uppercase font-semibold text-xs mb-2">Title</span>
          <input
            className="cdx-input mb-1"
            {...form.register("title")}
            placeholder="Title"
          />
        </label>

        <label>
          <span className="uppercase font-semibold text-xs mb-2">Subtitle</span>

          <input
            className="cdx-input py-2 text-sm"
            {...form.register("subtitle")}
            placeholder="Subtitle"
          />
        </label>

        <Separator orientation="horizontal" className="my-4" />

        <label>
          <span className="uppercase font-semibold text-xs mb-2">
            Banner text
          </span>
          <input
            className="cdx-input py-2 text-sm mb-1"
            {...form.register("bannerText")}
            placeholder="Banner Text"
          />
        </label>

        <label>
          <span className="uppercase font-semibold text-xs mb-2">
            Foot note
          </span>
          <textarea
            rows={2}
            className="cdx-input py-2 text-sm"
            {...form.register("footNote")}
            placeholder="Foot Note"
          />
        </label>

        <Separator orientation="horizontal" className="my-4" />

        <label>
          <span className="uppercase font-semibold text-xs mb-2">
            Page Background URL
          </span>
          <input
            className="cdx-input py-2 text-sm"
            {...form.register("background.url")}
            placeholder="Background URL"
          />
        </label>

        <Separator orientation="horizontal" className="my-4" />

        <label>
          <span className="uppercase font-semibold text-xs mb-2">Logo URL</span>
          <input
            className="cdx-input py-2 text-sm"
            {...form.register("logo.url")}
            placeholder="Logo URL"
          />
        </label>
      </div>
    </form>
  );
});
