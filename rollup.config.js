// rollup.config.js
export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/m3u8tomp4.js",
      name: "m3u8tomp4",
      format: "umd",
      plugins: []
    }
  ],
  plugins: []
};
