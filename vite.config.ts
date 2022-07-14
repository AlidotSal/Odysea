import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import solidStyled from "babel-plugin-solid-styled";

export default defineConfig({
  plugins: [
    solidPlugin({
      babel: {
        plugins: [[solidStyled, {}]],
      },
    }),
  ],
  build: {
    emptyOutDir: false,
    lib: {
      formats: ["es", "cjs", "iife"],
      entry: "./src/index.ts",
      fileName: "solid-graph",
      name: "solidGraph",
    },
    rollupOptions: {
      output: {
        format: "esm",
        dir: "./dist",
      },
    },
  },
});
