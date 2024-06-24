import { cn } from "./utils";

function Skeleton({
  className,
  roundedFull,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  roundedFull?: boolean;
}) {
  return (
    <div
      className={cn(
        "animate-pulse bg-primary/10",
        {
          "rounded-full": !!roundedFull,
          "rounded-md": !roundedFull,
        },
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
