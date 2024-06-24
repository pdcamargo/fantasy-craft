import { produce } from "immer";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from "../../popover";
import { CornerRightDown, CornerRightUp, Plus, Trash2 } from "lucide-react";
import { Separator } from "../../separator";

export type DndSpellData = {
  name: string;
  type: string;
  attributes: {
    name: string;
    value: string;
  }[];
  description: string;
};

export type DndSpellDndSpellComponentProps = {};
export type DndSpellDndSpellRef = {
  save: () => DndSpellData;
};

export const DndSpellComponent = forwardRef<
  DndSpellDndSpellRef,
  DndSpellDndSpellComponentProps
>(function DndSpellComponent(props, ref) {
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<DndSpellData>({
    name: "Cursed Ritual of Bad Hair",
    type: "2nd-level transmutation",
    attributes: [
      {
        name: "Casting Time",
        value: "1 action",
      },
      {
        name: "Range",
        value: "Touch",
      },
      {
        name: "Components",
        value: "V, S, M (a bit of phosphorus or wychwood, or a glowworm)",
      },
      {
        name: "Duration",
        value: "Until dispelled",
      },
    ],
    description:
      "A flame, equivalent in brightness to a torch, springs from an object that you touch. The effect look like a regular flame, but it creates no heat and doesn’t use oxygen. A continual flame can be covered or hidden but not smothered or quenched.",
  });

  useImperativeHandle(ref, () => ({
    save: () => {
      const description = descriptionRef.current?.innerText || "";

      return produce(state, (draft) => {
        draft.description = description;
      });
    },
  }));

  return (
    <div>
      <div>
        <input
          className="cdx-input"
          type="text"
          placeholder="Spell name"
          value={state.name}
          onChange={(e) =>
            setState(
              produce((draft) => {
                draft.name = e.target.value;
              }),
            )
          }
        />
        <input
          className="cdx-input"
          type="text"
          placeholder="Spell URL"
          value={state.type}
          onChange={(e) =>
            setState(
              produce((draft) => {
                draft.type = e.target.value;
              }),
            )
          }
        />

        {state.attributes.map((attr, index) => (
          <div
            key={index}
            className="flex items-center focus-within:outline-dotted focus-within:outline-blue-500"
          >
            <input
              className="cdx-input text-xs w-[25%] p-1 rounded-none border-r-0 font-bold"
              type="text"
              placeholder="Attribute name"
              value={attr.name}
              style={{
                backgroundColor: index % 2 === 0 ? "#e5e6e7" : "#f5f5f5",
              }}
              onChange={(e) =>
                setState(
                  produce((draft) => {
                    draft.attributes[index].name = e.target.value;
                  }),
                )
              }
            />
            <input
              className="cdx-input text-xs flex-1 p-1 rounded-none border-l-0"
              type="text"
              placeholder="Attribute value"
              value={attr.value}
              style={{
                backgroundColor: index % 2 === 0 ? "#f3f4f6" : "#fff",
              }}
              onChange={(e) =>
                setState(
                  produce((draft) => {
                    draft.attributes[index].value = e.target.value;
                  }),
                )
              }
            />

            <Popover>
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
                    onClick={() =>
                      setState(
                        produce((draft) => {
                          draft.attributes.splice(index + 1, 0, {
                            name: "",
                            value: "",
                          });
                        }),
                      )
                    }
                  >
                    <div className="cdx-input p-1 w-[26px] h-[26px] flex items-center justify-center">
                      <CornerRightDown />
                    </div>
                    <span className="text-sm font-semibold">Add below</span>
                  </button>
                  <button
                    className="flex items-center gap-2 p-2 hover:text-blue-500"
                    onClick={() =>
                      setState(
                        produce((draft) => {
                          draft.attributes.splice(Math.max(index - 1, 0), 0, {
                            name: "",
                            value: "",
                          });
                        }),
                      )
                    }
                  >
                    <div className="cdx-input p-1 w-[26px] h-[26px] flex items-center justify-center">
                      <CornerRightUp />
                    </div>
                    <span className="text-sm font-semibold">Add above</span>
                  </button>
                  <Separator orientation="horizontal" className="bg-gray-300" />
                  <button
                    className="flex items-center gap-2 p-2 hover:text-red-500"
                    onClick={() => {
                      setState(
                        produce((draft) => {
                          draft.attributes.splice(index, 1);
                        }),
                      );
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
          </div>
        ))}

        <div
          ref={descriptionRef}
          contentEditable
          className="cdx-input"
          data-placeholder="Spell Description"
        >
          {state.description}
        </div>
      </div>
    </div>
  );
});
