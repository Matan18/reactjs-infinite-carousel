import typescript from 'rollup-plugin-typescript2';
import del from 'rollup-plugin-delete';
import pkg from './package.json';
import path from "path";

const PACKAGE_ROOT_PATH = process.cwd();
const INPUT_FILE = path.join(PACKAGE_ROOT_PATH, 'src/index.ts');

export default {
  input: INPUT_FILE,
  output: [
    {
      file: 'playground/src/component-lib/index.js',
      format: 'esm',
      banner: '/* eslint-disable */',
    },
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'esm' },
  ],
  plugins: [
    del({ targets: ['dist/*', 'playground/src/component-lib'] }),
    typescript({
      rollupCommonJSResolveHack: false,
      clean: true,
      tsconfigOverride: {
        compilerOptions: {
          declarationDir: path.resolve(PACKAGE_ROOT_PATH, './typings'),
        },
      },
    }),
  ],
  external: Object.keys(pkg.peerDependencies || {}),
};
