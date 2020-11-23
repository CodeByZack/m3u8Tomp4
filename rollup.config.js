// rollup.config.js
// import resolve from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';
// import json from '@rollup/plugin-json';
// import babel from '@rollup/plugin-babel';
// import {terser} from 'rollup-plugin-terser';
// import nodePolyfills from 'rollup-plugin-node-polyfills';

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/m3u8tomp4.js",
      name: "m3u8Tomp4",
      format: "umd",
    //   plugins: [terser()]
    }
  ],
  plugins: [],
};
