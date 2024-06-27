export type DndSpellComponentAttributeLineProps = {
  name: string;
  value: string;
  index: number;
  onChangeName: (name: string) => void;
  onChangeValue: (value: string) => void;
  children?: React.ReactNode;
};

export const DndSpellComponentAttributeLine: React.FC<
  DndSpellComponentAttributeLineProps
> = ({ name, value, index, onChangeName, onChangeValue, children }) => {
  return (
    <div
      key={index}
      className="flex items-center focus-within:outline-dotted focus-within:outline-blue-500"
    >
      <input
        className="cdx-input text-xs w-[25%] p-1 rounded-none border-r-0 font-bold"
        type="text"
        placeholder="Attribute name"
        value={name}
        style={{
          backgroundColor: index % 2 === 0 ? "#e5e6e7" : "#f5f5f5",
        }}
        onChange={(e) => onChangeName(e.target.value)}
      />
      <input
        className="cdx-input text-xs flex-1 p-1 rounded-none border-l-0"
        type="text"
        placeholder="Attribute value"
        value={value}
        style={{
          backgroundColor: index % 2 === 0 ? "#f3f4f6" : "#fff",
        }}
        onChange={(e) => onChangeValue(e.target.value)}
      />
      {children}
    </div>
  );
};
