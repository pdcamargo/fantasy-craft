import { marked, TokenizerExtension, RendererExtension, Token } from "marked";

// Register a custom tokenizer and renderer for the custom DIV blocks
const tokenizer: TokenizerExtension = {
  name: "customDiv",
  level: "block",
  start(src) {
    return src.match(/:::/)?.index;
  },
  tokenizer(src, tokens) {
    const rule = /^::: *([^\n]*)\n([\s\S]*?)\n:::(?=\s|$)/;
    const match = rule.exec(src);

    if (match) {
      const token = {
        type: "customDiv",
        raw: match[0],
        params: match[1].trim(),
        text: match[2],
        tokens: [] as Token[],
      };
      this.lexer.blockTokens(token.text, token.tokens);
      return token;
    }
  },
};

const renderer: RendererExtension = {
  name: "customDiv",

  renderer(token) {
    const params = token.params.split(/\s+/);
    let id = "";
    let classes = "";

    if (params.length > 0 && params[0].startsWith("#")) {
      id = ` id="${params.shift().substring(1)}"`;
    }

    if (params.length > 0) {
      classes = ` class="${params.join(" ")}"`;
    }

    const htmlContent = this.parser.parse(token.tokens || []);
    return `<div${id}${classes}>\n${htmlContent}</div>\n`;
  },
};

export { tokenizer, renderer };
