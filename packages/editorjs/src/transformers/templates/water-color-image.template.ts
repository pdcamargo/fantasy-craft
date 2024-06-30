import { compile } from "handlebars";
import { html } from "../../utils";

export const waterColorImageTemplate = compile(html`
  <div
    class="water-color-wrapper {{waterColor.position}} {{waterColor.type}}"
    style="--water-color-image: url({{waterColor.url}})"
  >
    <div class="water-color-container">
      <div class="water-color-mask">
        <img src="{{file.url}}" alt="{{file.caption}}" />
      </div>
    </div>
  </div>
`);
