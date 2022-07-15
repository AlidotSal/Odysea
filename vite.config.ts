import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import solidStyled from "babel-plugin-solid-styled";

export default defineConfig({
  plugins: [
    solidPlugin({
      babel: {
        plugins: [[solidStyled, { prefix: "sg" }]],
      },
    }),
  ],
  build: {
    lib: {
      entry: "./src/index.ts",
      fileName: "solid-graph",
      name: "SolidGraph",
    },
    rollupOptions: {
      external: ["solidjs"],
      output: {
        dir: "./dist",
      },
    },
  },
});
