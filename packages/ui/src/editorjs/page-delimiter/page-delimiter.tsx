import { Root, createRoot } from "react-dom/client";

import {
  BlockAPI,
  BlockTool,
  BlockToolConstructorOptions,
} from "@editorjs/editorjs";

export class PageDelimiter implements BlockTool {
  private _wrapper: HTMLElement;

  private reactRoot: Root;

  constructor(private readonly options: BlockToolConstructorOptions) {
    this._wrapper = document.createElement("div");
    this._wrapper.classList.add("page-delimiter-wrapper");

    this.reactRoot = createRoot(this._wrapper);
  }

  static get toolbox() {
    return {
      title: "Page Delimiter",
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
          stroke-linejoin="round"
        >
          <path d="M5 8V5c0-1 1-2 2-2h10c1 0 2 1 2 2v3"/>
          <path d="M19 16v3c0 1-1 2-2 2H7c-1 0-2-1-2-2v-3"/><line x1="4" x2="20" y1="12" y2="12"/>
        </svg>
      `,
    };
  }

  save(block: HTMLElement) {
    return {};
  }

  render(): HTMLElement {
    this.reactRoot.render(
      <div className="w-full h-[60px] my-12 flex items-center justify-center relative">
        <div className="border-2 border-gray-900 border-dashed w-full h-[2px] absolute shadow-smooth"></div>
        <span className="text-center bg-white shadow-lg border-2 border-gray-900 font-bold px-3 py-1 text-xs uppercase select-none absolute">
          Page end
        </span>
      </div>,
    );

    return this._wrapper;
  }

  rendered(): void {
    if (this.options.block) {
      this.options.block.stretched = true;
    }
  }
}
