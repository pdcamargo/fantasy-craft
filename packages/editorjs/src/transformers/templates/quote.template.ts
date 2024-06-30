import { compile } from "handlebars";
import { html } from "../../utils";

export const quoteTemplate = compile(html`
  <blockquote class="{{cn alignment}}">
    {{text}} 
    
    {{#if caption}}
      <footer class="attribution">
        {{caption}}
      </footer>
    {{/if}}
  </blockquote>
`);
