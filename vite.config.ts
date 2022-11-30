import { resolve } from "path";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import solidStyled from 'vite-plugin-solid-styled';
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    solidPlugin({
      babel: {
        plugins: ["solid-styled/babel"],
      },
    }),
    solidStyled({
      prefix: 'od',
      filter: {
        include: 'src/**/*.ts',
        exclude: 'node_modules/**/*.{ts,js}',
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
