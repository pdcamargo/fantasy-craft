export type WaterColorImageSaveData = {
  file: {
    url: string;
    caption: string;
  };
  waterColor: {
    url: string;
    type: "edge" | "corner" | "center";
    position:
      | "top"
      | "bottom"
      | "left"
      | "right"
      | "top-left"
      | "top-right"
      | "bottom-left"
      | "bottom-right";
  };
};

export type WaterColorPosition =
  WaterColorImageSaveData["waterColor"]["position"];

export type WaterColorImageComponentProps = {
  initialState?: WaterColorImageSaveData;
};

export type WaterColorImageComponentRef = {
  save: () => WaterColorImageSaveData;
};
