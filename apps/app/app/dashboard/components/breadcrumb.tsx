import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  DropdownMenu,
  DropdownMenuTrigger,
  BreadcrumbEllipsis,
  DropdownMenuContent,
  DropdownMenuItem,
  BreadcrumbPage,
} from "@craft/ui";
import { useMemo } from "react";

export type DashboardBreadcrumbProps = {
  items: (
    | string
    | {
        label: string;
        href: string;
      }
  )[];
};

const BreadcrumbItemWrapper: React.FC<{
  item: string | { label: string; href?: string };
}> = ({ item }) => {
  if (typeof item === "string" || typeof item.href === "undefined") {
    return (
      <BreadcrumbItem>
        {typeof item === "string" ? item : item.label}
      </BreadcrumbItem>
    );
  }

  return (
    <BreadcrumbItem>
      <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
    </BreadcrumbItem>
  );
};

/**
 * The first and last items will always be shown.
 * The dropdown will always be the second item.
 *
 * For example, if it's only 3 or less items, the dropdown will not be shown.
 * For 4 items, it would be: first, dropdown, last.
 * For 5 items and more, it would be: first, dropdown, second, last.
 */
const DashboardBreadcrumb: React.FC<DashboardBreadcrumbProps> = ({ items }) => {
  const getLabel = (item: string | { label: string; href: string }) =>
    typeof item === "string" ? item : item.label;

  const getHref = (item: string | { label: string; href: string }) =>
    typeof item === "string" ? undefined : item.href;

  const dropdownItems = useMemo(() => {
    if (items.length <= 3) return [];

    const startIndex = 1;
    const endIndex = items.length - 2;

    return items.slice(startIndex, endIndex).map((item) => ({
      label: getLabel(item),
      href: getHref(item),
    }));
  }, [items]);

  const lastItem = items[items.length - 1];
  const secondToLastItem = items[items.length - 2];

  if (items.length === 0) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbItemWrapper item={items[0]} />
        </BreadcrumbItem>
        {dropdownItems?.length > 0 && (
          <>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1">
                  <BreadcrumbEllipsis className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {dropdownItems.map((item, index) => (
                    <DropdownMenuItem key={index}>
                      <BreadcrumbItemWrapper item={item} />
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
          </>
        )}

        {secondToLastItem && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItemWrapper item={secondToLastItem} />
          </>
        )}

        <BreadcrumbSeparator />
        <BreadcrumbItemWrapper item={lastItem} />
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export { DashboardBreadcrumb };
