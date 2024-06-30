import { compile } from "handlebars";
import { html } from "../../utils";

export const listTemplate = compile(html`
  <ul
    style="list-style: {{#if (eq style 'ordered')}}decimal{{else}}disc{{/if}}"
  >
    {{#each items}}
    <li>{{this}}</li>
    {{/each}}
  </ul>
`);
