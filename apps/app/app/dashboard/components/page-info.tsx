const DashboradPageInfo: React.FC<
  React.PropsWithChildren<{
    title: string;
    description?: string;
  }>
> = ({ title, description, children }) => {
  return (
    <div className="pt-12 pb-6">
      <h1 className="text-xl font-bold text-white">{title}</h1>
      {description && (
        <h3 className="text-md font-semibold text-[#78829d]">{description}</h3>
      )}

      {children}
    </div>
  );
};

export { DashboradPageInfo };
