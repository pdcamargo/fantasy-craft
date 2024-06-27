import { produce } from "immer";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

import { DndSpellComponentAttributeLinePopover } from "./dnd-spell-component-attribute-line-popover";
import { DndSpellComponentAttributeLine } from "./dnd-spell-component-attribute-line";

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
          className="cdx-input py-1 text-sm italic"
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
          <DndSpellComponentAttributeLine
            key={index}
            index={index}
            name={attr.name}
            value={attr.value}
            onChangeName={(name) => {
              setState(
                produce((draft) => {
                  draft.attributes[index].name = name;
                }),
              );
            }}
            onChangeValue={(newValue) => {
              setState(
                produce((draft) => {
                  draft.attributes[index].value = newValue;
                }),
              );
            }}
          >
            <DndSpellComponentAttributeLinePopover
              attributesLength={state.attributes.length}
              index={index}
              onAddAbove={() => {
                setState(
                  produce((draft) => {
                    draft.attributes.splice(index, 0, {
                      name: "",
                      value: "",
                    });
                  }),
                );
              }}
              onAddBelow={() => {
                setState(
                  produce((draft) => {
                    draft.attributes.splice(index + 1, 0, {
                      name: "",
                      value: "",
                    });
                  }),
                );
              }}
              onMoveDown={() => {
                setState(
                  produce((draft) => {
                    if (index === draft.attributes.length - 1) return;

                    const temp = draft.attributes[index];
                    draft.attributes[index] = draft.attributes[index + 1];
                    draft.attributes[index + 1] = temp;
                  }),
                );
              }}
              onMoveUp={() => {
                setState(
                  produce((draft) => {
                    if (index === 0) return;

                    const temp = draft.attributes[index];
                    draft.attributes[index] = draft.attributes[index - 1];
                    draft.attributes[index - 1] = temp;
                  }),
                );
              }}
              onRemove={() => {
                setState(
                  produce((draft) => {
                    draft.attributes.splice(index, 1);
                  }),
                );
              }}
            />
          </DndSpellComponentAttributeLine>
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
