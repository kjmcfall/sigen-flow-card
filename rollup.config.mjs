import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

const dev = !!process.env.ROLLUP_WATCH;

export default {
  input: "src/sigen-flow-card.ts",
  output: {
    file: "dist/sigen-flow-card.js",
    format: "es",
    sourcemap: dev,
  },
  plugins: [
    resolve(),
    commonjs(),
    // NOTE: source files import sibling modules with an explicit ".ts"
    // extension (e.g. "./data.ts") so that `node --test` can run the .ts
    // test files directly with Node's native TypeScript support, with no
    // build step. @rollup/plugin-typescript handles this fine and produces
    // a correct bundle, but prints a harmless TS5097 warning for each such
    // import because its per-file transpile step doesn't have
    // `allowImportingTsExtensions` enabled (enabling it requires `noEmit`,
    // which conflicts with the plugin's own emit). Safe to ignore.
    typescript({ tsconfig: "./tsconfig.json", sourceMap: dev }),
    !dev && terser(),
  ].filter(Boolean),
  watch: {
    clearScreen: false,
  },
};
