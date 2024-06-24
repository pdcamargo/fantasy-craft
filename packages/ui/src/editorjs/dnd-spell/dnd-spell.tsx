import { Root, createRoot } from "react-dom/client";

import {
  BlockAPI,
  BlockTool,
  BlockToolConstructorOptions,
} from "@editorjs/editorjs";
import { DndSpellComponent, DndSpellDndSpellRef } from "./dnd-spell-component";

export class DndSpell implements BlockTool {
  private _wrapper: HTMLElement;

  private reactRoot: Root;

  private dndSpellComponentRef: React.RefObject<DndSpellDndSpellRef> = {
    current: null,
  };

  constructor(private readonly options: BlockToolConstructorOptions) {
    this._wrapper = document.createElement("div");
    this._wrapper.classList.add("dnd-spell-wrapper");

    this.reactRoot = createRoot(this._wrapper);
  }

  static get toolbox() {
    return {
      title: "Dnd Spell",
      icon: `
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round">
            <rect width="12" height="12" x="2" y="10" rx="2" ry="2"/>
            <path d="m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6"/>
            <path d="M6 18h.01"/>
            <path d="M10 14h.01"/>
            <path d="M15 6h.01"/>
            <path d="M18 9h.01"/>
          </svg>
      `,
    };
  }

  save(block: HTMLElement) {
    return this.dndSpellComponentRef.current?.save();
  }

  render(): HTMLElement {
    this.reactRoot.render(
      <DndSpellComponent ref={this.dndSpellComponentRef} />,
    );

    return this._wrapper;
  }

  rendered(): void {
    // if (this.options.block) {
    //   this.options.block.stretched = true;
    // }
  }
}
