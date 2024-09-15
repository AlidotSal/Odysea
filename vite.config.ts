import { resolve } from "node:path";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import solidStyled from "vite-plugin-solid-styled";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    solid(),
    solidStyled({
      prefix: 'od', // optional
      filter: {
        include: 'src/**/*.{ts,js,tsx,jsx}',
        exclude: 'node_modules/**/*.{ts,js,tsx,jsx}',
      },
    }),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es", "cjs"],
      fileName: "odysea",
      name: "Odysea",
    },
    rollupOptions: {
      external: ["solid-js", "solid-js/web", "solid-js/store"],
      output: {
        dir: "./dist",
      },
    },
  },
});
