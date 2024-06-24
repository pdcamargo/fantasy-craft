// Namespaces is equal to key values in en.json (Awaited)
export type TranslationNamespaces = keyof typeof import("./pt-BR.json");

type DotNotationPaths<T, Prefix extends string = ""> = {
  [K in keyof T]: T[K] extends object
    ? K extends string
      ? DotNotationPaths<T[K], `${Prefix}${K}.`>
      : never
    : // @ts-expect-error
      `${Prefix}${K}`;
}[keyof T];

// Simplify nested unions
type Simplify<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

export type TranslationJson = typeof import("./pt-BR.json");

// Recursive Union Type with dot notation
export type TranslationKey = Simplify<DotNotationPaths<TranslationJson>>;
