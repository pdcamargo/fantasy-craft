const DashboardToolbar: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-[#17191e] py-6 pb-[100px]">
      <div className="container mx-auto">{children}</div>
    </div>
  );
};

export { DashboardToolbar };
