import {
  ArrowDownFromLine,
  ArrowUpFromLine,
  CornerRightDown,
  CornerRightUp,
  Plus,
  Trash2,
} from "lucide-react";
import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from "../../popover";
import { Separator } from "../../separator";
import { useDisclose } from "../../hooks";

export type DndSpellComponentAttributeLinePopoverProps = {
  index: number;
  attributesLength: number;
  onRemove: () => void;
  onAddBelow: () => void;
  onAddAbove: () => void;
  onMoveDown: () => void;
  onMoveUp: () => void;
};

export const DndSpellComponentAttributeLinePopover: React.FC<
  DndSpellComponentAttributeLinePopoverProps
> = ({
  index,
  attributesLength,
  onRemove,
  onAddBelow,
  onAddAbove,
  onMoveDown,
  onMoveUp,
}) => {
  const disclosure = useDisclose();

  return (
    <Popover
      open={disclosure.isOpen}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          disclosure.onClose();

          return;
        }

        disclosure.onOpen();
      }}
    >
      <PopoverTrigger asChild>
        <div
          className="cdx-input p-1 w-[26px] h-[26px] flex items-center justify-center ml-[1px]"
          style={{
            backgroundColor: index % 2 === 0 ? "#f3f4f6" : "#fff",
          }}
          tabIndex={0}
          role="button"
        >
          <Plus />
        </div>
      </PopoverTrigger>

      <PopoverPortal>
        <PopoverContent
          side="top"
          align="center"
          className="flex flex-col p-0 w-44"
        >
          <button
            className="flex items-center gap-2 p-2 hover:text-blue-500"
            onClick={() => {
              onAddBelow();

              disclosure.onClose();
            }}
          >
            <div className="cdx-input p-1 w-[26px] h-[26px] flex items-center justify-center">
              <CornerRightDown />
            </div>
            <span className="text-sm font-semibold">Add below</span>
          </button>
          <button
            className="flex items-center gap-2 p-2 hover:text-blue-500"
            onClick={() => {
              onAddAbove();

              disclosure.onClose();
            }}
          >
            <div className="cdx-input p-1 w-[26px] h-[26px] flex items-center justify-center">
              <CornerRightUp />
            </div>
            <span className="text-sm font-semibold">Add above</span>
          </button>

          <button
            className="flex items-center gap-2 p-2 hover:text-blue-500 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:text-gray-500"
            disabled={index === 0}
            onClick={() => {
              onMoveUp();

              disclosure.onClose();
            }}
          >
            <div className="cdx-input p-1 w-[26px] h-[26px] flex items-center justify-center">
              <ArrowUpFromLine />
            </div>
            <span className="text-sm font-semibold">Move up</span>
          </button>

          <button
            className="flex items-center gap-2 p-2 hover:text-blue-500 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:text-gray-500"
            disabled={index === attributesLength - 1}
            onClick={() => {
              onMoveDown();

              disclosure.onClose();
            }}
          >
            <div className="cdx-input p-1 w-[26px] h-[26px] flex items-center justify-center">
              <ArrowDownFromLine />
            </div>
            <span className="text-sm font-semibold">Move down</span>
          </button>

          <Separator orientation="horizontal" className="bg-gray-300" />

          <button
            className="flex items-center gap-2 p-2 hover:text-red-500"
            onClick={() => {
              onRemove();

              disclosure.onClose();
            }}
          >
            <div className="cdx-input p-1 w-[26px] h-[26px] flex items-center justify-center">
              <Trash2 />
            </div>
            <span className="text-sm font-semibold">Remove</span>
          </button>
          <PopoverArrow />
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  );
};
