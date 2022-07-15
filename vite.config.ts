import { resolve } from "path";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import solidStyled from "babel-plugin-solid-styled";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    solidPlugin({
      babel: {
        plugins: [[solidStyled, { prefix: "sg" }]],
      },
    }),
    dts({
      insertTypesEntry: true,
      noEmitOnError: true,
      skipDiagnostics: false,
      logDiagnostics: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es", "cjs"],
      fileName: "solid-graph",
      name: "SolidGraph",
    },
    rollupOptions: {
      external: ["solid-js", "solid-js/web", "solid-js/store"],
      output: {
        dir: "./dist",
      },
    },
  },
});
