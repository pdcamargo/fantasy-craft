import { Root, createRoot } from "react-dom/client";

import { BlockTool, BlockToolConstructorOptions } from "@editorjs/editorjs";
import {
  FrontCoverComponent,
  FrontCoverComponentData,
  FrontCoverComponentRef,
} from "./front-cover-component";

export class FrontCover implements BlockTool {
  private _wrapper: HTMLElement;

  private reactRoot: Root;

  pageCoverRef: React.RefObject<FrontCoverComponentRef> = {
    current: null,
  };

  private _initialData: FrontCoverComponentData;

  private _t: (key: string) => string;

  constructor({
    data,
    api: {
      i18n: { t },
    },
  }: BlockToolConstructorOptions<FrontCoverComponentData, any>) {
    this._t = t;

    this._wrapper = document.createElement("div");
    this._wrapper.classList.add("front-cover-wrapper");

    this.reactRoot = createRoot(this._wrapper);

    this._initialData =
      data && Object.keys(data).length > 0
        ? data
        : {
            title: "",
            subtitle: "",
            bannerText: "",
            footNote: "",
            background: {
              url: "https://images.ctfassets.net/swt2dsco9mfe/6ZWmOSmHjyOInlUApKmOdu/f4b02854a1996636f35d35585496335e/phone-1040x1536-starter.jpg",
              caption: "",
            },
            logo: {
              url: "",
              caption: "",
            },
            md: "",
          };
  }

  static get toolbox() {
    return {
      title: "Front Cover",
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
          <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"/>
          <path d="M2 6h4"/>
          <path d="M2 10h4"/>
          <path d="M2 14h4"/>
          <path d="M2 18h4"/>
          <path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/>
        </svg>
      `,
    };
  }

  save(block: HTMLElement) {
    return this.pageCoverRef.current?.save();
  }

  render(): HTMLElement {
    this.reactRoot.render(
      <FrontCoverComponent
        ref={this.pageCoverRef}
        initialData={this._initialData}
        t={this._t}
      />,
    );

    return this._wrapper;
  }
}
