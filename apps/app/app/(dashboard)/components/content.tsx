import { cn } from "@craft/ui/utils";

const DashboardContent: React.FC<
  React.PropsWithChildren<{
    className?: string;
    style?: React.CSSProperties;
  }>
> = ({ children, className, style }) => {
  return (
    <div
      className={cn("container mx-auto flex flex-col flex-1", className)}
      style={style}
    >
      <div className="flex flex-col flex-1">
        <div className="mt-[-100px] py-8 flex-1 flex flex-col">{children}</div>
      </div>
    </div>
  );
};

export { DashboardContent };
