import { cn } from "@craft/ui/utils";

const DashboradPageInfo: React.FC<
  React.PropsWithChildren<{
    title?: React.ReactNode;
    description?: React.ReactNode;
    className?: string;
  }>
> = ({ title, description, className, children }) => {
  return (
    <div className={cn("pt-12 pb-6 px-4", className)}>
      {title && <h1 className="text-xl font-bold text-white">{title}</h1>}
      {description && (
        <h3 className="text-md font-semibold text-[#78829d]">{description}</h3>
      )}

      {children}
    </div>
  );
};

export { DashboradPageInfo };
