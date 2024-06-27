import {
  API,
  BlockTool,
  InlineTool,
  InlineToolConstructorOptions,
} from "@editorjs/editorjs";

export class Lorem implements InlineTool {
  private button: HTMLButtonElement;
  private api: API;

  private _state = false;

  static get isInline() {
    return true;
  }

  public get state() {
    return this._state;
  }

  public set state(_value: boolean) {
    this._state = false;
  }

  constructor({ api }: InlineToolConstructorOptions) {
    this.button = document.createElement("button");
    this.button.innerHTML = `
      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" fill="transparent"/>
        <text x="12" y="16" font-size="14" text-anchor="middle" fill="black" font-family="Arial" font-style="italic" font-weight="bold">L</text>
      </svg>
    `;
    this.button.type = "button";
    this.button.classList.add(api.styles.inlineToolButton);

    this.api = api;
  }

  // shortcut?: string | undefined;

  surround(range: Range): void {
    const loremText =
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi eaque voluptate similique sunt, excepturi dolor deserunt totam sit, quisquam nostrum natus, ipsa doloribus iste? Perferendis blanditiis officia corporis quam atque.";

    const textNode = document.createTextNode(loremText);

    // add the lorem after the selection, don't replace
    range.insertNode(textNode);
  }

  checkState(selection: Selection): boolean {
    return true;
  }

  save(block: HTMLElement) {}

  render(): HTMLElement {
    return this.button;
  }
}
