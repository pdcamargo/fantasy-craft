import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "dist",
  minify: true,
  splitting: false,
  sourcemap: true,
  clean: false,
});
