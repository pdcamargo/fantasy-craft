import Handlebars from "handlebars";
import { parseMarkdown } from "../markdown";
import { textToAnchorId } from "../utils";

Handlebars.registerHelper("and", function () {
  // Convert arguments object to array
  const args = Array.prototype.slice.call(arguments);

  // Check if all arguments are truthy
  return args.every(Boolean);
});

Handlebars.registerHelper("or", function () {
  // Convert arguments object to array
  const args = Array.prototype.slice.call(arguments);

  // Check if any argument is truthy
  return args.some(Boolean);
});

Handlebars.registerHelper("not", function (value) {
  return !value;
});

Handlebars.registerHelper("eq", function (a, b) {
  return a === b;
});

Handlebars.registerHelper("parseMarkdown", function (value) {
  return parseMarkdown(value);
});

Handlebars.registerHelper("textToAnchorId", function (text) {
  return textToAnchorId(text);
});

Handlebars.registerHelper("cn", function (...args) {
  const classes = Array.prototype.slice.call(args, 0, -1);

  return classes.filter(Boolean).join(" ");
});

export * from "./pageDelimiter";
export * from "./breakColumn";
export * from "./paragraph";
export * from "./frontCover";
export * from "./header";
export * from "./image";
export * from "./list";
export * from "./quote";
export * from "./waterColorImage";
export * from "./dndSpell";
export * from "./note";
