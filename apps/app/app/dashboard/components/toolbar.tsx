import { cn } from "@craft/ui/utils";

const DashboardToolbar: React.FC<
  React.PropsWithChildren<{
    className?: string;
  }>
> = ({ children, className }) => {
  return (
    <div className={cn("bg-[#17191e] py-6 pb-[100px]", className)}>
      <div className="container mx-auto">{children}</div>
    </div>
  );
};

export { DashboardToolbar };
