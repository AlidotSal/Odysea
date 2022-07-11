import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import Unocss from "unocss/vite";

export default defineConfig({
  plugins: [
    solidPlugin(),
    Unocss({
      rules: [["animated", { animation: "dash 0.5s linear infinite" }]],
    }),
  ],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
  },
});
