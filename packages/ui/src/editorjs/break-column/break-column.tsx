import { Root, createRoot } from "react-dom/client";

import { BlockTool, BlockToolConstructorOptions } from "@editorjs/editorjs";

export class BreakColumn implements BlockTool {
  private _wrapper: HTMLElement;

  private reactRoot: Root;

  constructor(private readonly options: BlockToolConstructorOptions) {
    this._wrapper = document.createElement("div");
    this._wrapper.classList.add("break-column-wrapper");

    this.reactRoot = createRoot(this._wrapper);
  }

  static get toolbox() {
    return {
      title: "Break Column",
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
            <path d="M8 19H5c-1 0-2-1-2-2V7c0-1 1-2 2-2h3"/>
            <path d="M16 5h3c1 0 2 1 2 2v10c0 1-1 2-2 2h-3"/>
            <line x1="12" x2="12" y1="4" y2="20"/>
          </svg>
      `,
    };
  }

  save(block: HTMLElement) {
    return {};
  }

  render(): HTMLElement {
    this.reactRoot.render(
      <div className="w-full h-[2px] border-2 border-gray-900 border-dashed my-12 flex items-center justify-center shadow-smooth">
        <span className="text-center bg-white shadow-lg border-2 border-gray-900 font-bold px-3 py-1 text-xs uppercase select-none">
          <p>Break column</p>
          <small>Force following blocks to the next column</small>
        </span>
      </div>,
    );

    return this._wrapper;
  }
}
