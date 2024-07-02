"use client";

import { useTranslation } from "@craft/translation";
import { Card, CardContent } from "@craft/ui/card";
import {
  DashboardToolbar,
  DashboardBreadcrumb,
  DashboradPageInfo,
  DashboardContent,
} from "app/dashboard/components";
import { cn } from "@craft/ui/utils";

export default function BooksPage() {
  const { t } = useTranslation();

  return (
    <>
      <DashboardToolbar>
        <DashboardBreadcrumb
          items={[
            {
              label: t("General.dashboard"),
              href: "/dashboard",
            },
            {
              label: t("General.naruto5e"),
              href: "/dashboard/n5e",
            },
            {
              label: t("General.characters"),
              href: "/dashboard/n5e/characters",
            },
          ]}
        />

        <DashboradPageInfo title="My Naruto 5e Characters" description="" />
      </DashboardToolbar>

      <DashboardContent>
        <Card variant="white" className="flex-1">
          <CardContent className="pt-6"></CardContent>
        </Card>
      </DashboardContent>
    </>
  );
}
