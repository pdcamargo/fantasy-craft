import {
  PanelBottomOpen,
  PanelLeftOpen,
  PanelRightOpen,
  PanelTopOpen,
} from "lucide-react";
import { WaterColorImageSaveData } from "./types";

export const waterColorEdgeVariants = ["0001.webp"];

export const waterColorMasks = {
  edge: {
    top: waterColorEdgeVariants.map(
      (variant) => `/api/images/water-color/top/${variant}`,
    ),
    bottom: waterColorEdgeVariants.map(
      (variant) => `/api/images/water-color/bottom/${variant}`,
    ),
    left: waterColorEdgeVariants.map(
      (variant) => `/api/images/water-color/left/${variant}`,
    ),
    right: waterColorEdgeVariants.map(
      (variant) => `/api/images/water-color/right/${variant}`,
    ),
  },
};

export const edgesItems = [
  {
    tooltipText:
      "Position meant to images that will be placed on the top of the page, left to right.",
    value: "top",
    label: "Edge Top",
    icon: PanelTopOpen,
  },
  {
    tooltipText:
      "Position meant to images that will be placed on the bottom of the page, left to right.",
    value: "bottom",
    label: "Edge Bottom",
    icon: PanelBottomOpen,
  },
  {
    tooltipText:
      "Position meant to images that will be placed on the left of the page, top to bottom.",
    value: "left",
    label: "Edge Left",
    icon: PanelLeftOpen,
  },
  {
    tooltipText:
      "Position meant to images that will be placed on the right of the page, top to bottom.",
    value: "right",
    label: "Edge Right",
    icon: PanelRightOpen,
  },
] as const;

export const typeItems = [
  {
    tooltipText: "The mask is meant to be used on the edge of the page.",
    value: "edge",
    label: "Edge",
    icon: () => (
      <div className="w-6 h-6 border-[#071437] rounded-sm border-2 overflow-hidden">
        <div className="w-2 h-6 ml-auto bg-[#071437]" />
      </div>
    ),
  },
  {
    tooltipText: "The mask is meant to be used on the corner of the page.",
    value: "corner",
    label: "Corner",
    icon: () => (
      <div className="w-6 h-6 border-[#071437] rounded-sm border-2 overflow-hidden">
        <div className="w-[10px] h-[10px] bg-[#071437]" />
      </div>
    ),
  },
  {
    tooltipText: "The mask is meant to be used on the center of the page.",
    value: "center",
    label: "Center",
    icon: () => (
      <div className="w-6 h-6 border-[#071437] rounded-sm border-2 overflow-hidden flex items-center justify-center">
        <div className="w-[10px] h-[10px] bg-[#071437] rounded-[2px]" />
      </div>
    ),
  },
] as const;

export const isUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

export const createDefaultState = (): WaterColorImageSaveData => {
  return {
    file: {
      url: "https://i.imgur.com/GZfjDWV.png",
      caption: "",
    },
    waterColor: {
      url: waterColorMasks.edge.top[0][0],
      type: "edge",
      position: "top",
    },
  };
};
