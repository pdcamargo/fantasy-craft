import { compile } from "handlebars";
import { html } from "../../utils";

export const headingTemplate = compile(html`
  <h{{level}} id="{{textToAnchorId text}}">
    {{text}}
  </h{{level}}>
`);
