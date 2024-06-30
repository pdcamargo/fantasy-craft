import { compile } from "handlebars"
import { html } from "../../utils";

export const frontCoverTemplate = compile(html`
<div class="front-cover"
    style="--cover-image: url({{background.url}})">
    
    {{#if logo.url}}
        <div class="logo">
            <img alt="" src="{{logo.url}}" />
        </div>
    {{/if}}
    
    {{#if title}}
        <h1 id="{{textToAnchorId title}}">
            {{title}}
        </h1>
    {{/if}}
    
    {{#if subtitle}}
        <h2 id="{{textToAnchorId subtitle}}">
            {{subtitle}}
        </h2>
    {{/if}}

    <hr />

    {{#if bannerText}}
        <div class="banner">{{bannerText}}</div>
    {{/if}}
    
    {{#if footNote}}
        <div class="footnote">{{footNote}}</div>
    {{/if}}
    
    {{#if md}}
        {{parseMarkdown md}}
    {{/if}}
</div>
`)