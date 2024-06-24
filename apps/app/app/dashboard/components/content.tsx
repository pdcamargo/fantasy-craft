const DashboardContent: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="container mx-auto flex flex-col flex-1">
      <div className="flex flex-col flex-1">
        <div className="mt-[-100px] py-8 flex-1 flex flex-col">{children}</div>
      </div>
    </div>
  );
};

export { DashboardContent };
