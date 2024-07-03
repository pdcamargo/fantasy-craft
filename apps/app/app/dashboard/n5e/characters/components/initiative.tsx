export const Initiative: React.FC<{
  initiative: number;
}> = ({ initiative }) => {
  return (
    <div
      className="relative w-[80px] h-[55px] text-center border-[20px]"
      style={{
        borderImage: "url(/fancy-box-3-bg.svg) 20 20 20 20 fill",
      }}
    >
      <div className="w-[inherit] h-[inherit] m-[-20px] flex flex-col items-center">
        <span
          className="absolute top-[-40px] uppercase font-[700] text-[#b0b7bd] text-[11px]"
          style={{
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          Initiative
        </span>

        <div className="text-[#b0b7bd] text-[30px] font-medium relative flex items-center justify-center w-full mt-[8px]">
          <span className="h-[34px] w-[60px] relative inline-flex justify-center items-center text-white rounded mt-1">
            <small className="text-[#b0b7bd] font-normal text-[60%]">
              {initiative > 0 ? "+" : "-"}
            </small>
            {Math.abs(initiative)}
          </span>
        </div>
      </div>
    </div>
  );
};
