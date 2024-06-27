import { Root, createRoot } from "react-dom/client";

import {
  BlockTool,
  BlockToolConstructable,
  PasteEvent,
  SanitizerConfig,
  ToolConfig,
  BlockToolConstructorOptions,
} from "@editorjs/editorjs";
import { TunesMenuConfig, MoveEvent } from "@editorjs/editorjs/types/tools";
import { WaterColorImageComponent } from "./water-color-image-component";
import { WaterColorImageComponentRef, WaterColorImageSaveData } from "./types";
import { createDefaultState } from "./data";

/*
static get toolbox() {
    return {
      title: 'Water Color Image',
      icon: '<svg width="17" height="17" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 19.5V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14.5c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM12 7c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-2 7.5h4c.55 0 1 .45 1 1s-.45 1-1 1h-4c-.55 0-1-.45-1-1s.45-1 1-1z"/></svg>',
    };
  }

  render() {
    const container = document.createElement('div');
    container.innerHTML = `
      <div>
        <input type="file" accept="image/*" />
      </div>
    `;

    return container;
  }

  save() {
    return {
      url: 'https://via.placeholder.com/150',
    };
  }
*/

export class WaterColorImage implements BlockTool {
  // sanitize?: SanitizerConfig | undefined;

  private _wrapper: HTMLElement;

  private _currentData: WaterColorImageSaveData;

  waterColorRef: React.RefObject<WaterColorImageComponentRef> = {
    current: null,
  };

  private reactRoot: Root;

  constructor({
    data,
  }: BlockToolConstructorOptions<WaterColorImageSaveData, any>) {
    this._wrapper = document.createElement("div");
    this._wrapper.classList.add("water-color-image", "wrapper");

    this._currentData =
      data && Object.keys(data).length ? data : createDefaultState();

    this.reactRoot = createRoot(this._wrapper);
  }

  static get toolbox() {
    return {
      title: "Water Color Image",
      icon: `
        <svg xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round">
            <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
            <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
            <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
            <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
        </svg>
      `,
    };
  }

  save(block: HTMLElement) {
    return this.waterColorRef.current!.save();
  }

  private renderReactComponent() {
    this.reactRoot.render(
      <WaterColorImageComponent
        ref={this.waterColorRef}
        initialState={this._currentData}
      />,
    );
  }

  render(): HTMLElement {
    this.renderReactComponent();

    return this._wrapper;
  }
}
