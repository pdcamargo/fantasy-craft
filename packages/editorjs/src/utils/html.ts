/**
 * Create HTML string from template strings and values and render empty string for undefined, null, false, or empty string values.
 */
export function html(strings: TemplateStringsArray, ...values: any[]) {
  let result = "";
  strings.forEach((str, i) => {
    result += str;
    if (i < values.length) {
      const value = values[i];
      if (
        value !== undefined &&
        value !== null &&
        value !== false &&
        value !== ""
      ) {
        result += value;
      }
    }
  });
  return result;
}
