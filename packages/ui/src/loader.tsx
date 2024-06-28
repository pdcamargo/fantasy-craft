import { cn } from "./utils";

const LdsEllipsis: React.FC<{
  className?: string;
}> = ({ className }) => {
  return (
    <div className={cn("lds-ellipsis", className)}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

const variantsToCode: Record<string, React.FC<{ className?: string }>> = {
  ellipsis: LdsEllipsis,
};

const Loader: React.FC<{
  variant?: keyof typeof variantsToCode;
  className?: string;
}> = ({ variant, className }) => {
  const Component = variantsToCode[variant ?? "ellipsis"];

  return <Component className={className} />;
};

export { Loader };
