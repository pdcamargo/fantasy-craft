import { compile } from "handlebars";
import { html } from "../../utils";

export const dndSpellTemplate = compile(html`
<div class="dnd-spell">
    <h4 class="dnd-spell-name">{{name}}</h4>
    <p class="dnd-spell-type">{{type}}</p>
    <div class="dnd-spell-attributes">
        {{#each attributes}}
            {{#if (and this.name this.value)}}
                <div class="dnd-spell-attributes-attr">
                    <strong>{{this.name}}</strong>: {{this.value}}
                </div>
            {{/if}}
        {{/each}}
    </div>
    <pre class="dnd-spell-description">{{description}}</pre>
</div>
`);
