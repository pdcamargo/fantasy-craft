import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { produce } from "immer";

import { ToggleGroup, ToggleGroupItem } from "../../toggle-group";

import { Label } from "../../label";

import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
} from "../../tooltip";

import {
  WaterColorImageComponentProps,
  WaterColorImageComponentRef,
  WaterColorImageSaveData,
  WaterColorPosition,
} from "./types";

import {
  createDefaultState,
  typeItems,
  waterColorMasks,
  edgesItems,
  isUrl,
} from "./data";

export const WaterColorImageComponent = forwardRef<
  WaterColorImageComponentRef,
  WaterColorImageComponentProps
>(({ initialState }, ref) => {
  const [state, setState] = React.useState<WaterColorImageSaveData>(
    initialState ?? createDefaultState(),
  );

  useImperativeHandle(ref, () => ({
    save: () => state,
  }));

  return (
    <div className="p-2 border-gray-200 rounded-lg border">
      <div className="py-2 w-full flex flex-col gap-2 items-start">
        <Label>Water Color Image</Label>
        <ToggleGroup type="single" variant="outline" size="lg">
          {typeItems.map((item) => (
            <TooltipProvider key={item.value}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <ToggleGroupItem value={item.value} aria-label={item.label}>
                    <item.icon />
                  </ToggleGroupItem>
                </TooltipTrigger>
                <TooltipPortal>
                  <TooltipContent align="center" side="right">
                    {item.tooltipText}
                  </TooltipContent>
                </TooltipPortal>
              </Tooltip>
            </TooltipProvider>
          ))}
        </ToggleGroup>

        <ToggleGroup
          type="single"
          variant="outline"
          onValueChange={(newEdgePosition) => {
            const masksForType =
              waterColorMasks.edge[
                newEdgePosition as keyof typeof waterColorMasks.edge
              ];
            const newUrl = masksForType[0];

            setState(
              produce((draft) => {
                draft.waterColor.position =
                  newEdgePosition as WaterColorPosition;
                draft.waterColor.url = newUrl;
              }),
            );
          }}
        >
          {edgesItems.map((item) => (
            <TooltipProvider key={item.value}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <ToggleGroupItem value={item.value} aria-label={item.label}>
                    <item.icon />
                  </ToggleGroupItem>
                </TooltipTrigger>
                <TooltipPortal>
                  <TooltipContent align="center" side="right">
                    {item.tooltipText}
                  </TooltipContent>
                </TooltipPortal>
              </Tooltip>
            </TooltipProvider>
          ))}
        </ToggleGroup>
      </div>

      <input
        className="cdx-input"
        type="text"
        placeholder="Enter image URL"
        value={state.file.url}
        onChange={(e) => {
          if (isUrl(e.target.value)) {
            setState(
              produce((draft) => {
                draft.file.url = e.target.value;
              }),
            );
          }
        }}
      />
    </div>
  );
});
