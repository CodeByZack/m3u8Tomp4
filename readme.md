<h1 align="center">Welcome to m3u8tomp4 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/CodeByZack/m3u8Tomp4#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/CodeByZack/m3u8Tomp4/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
</p>

> 一个便利的工具，从 m3u8 转换到 mp4 文件，并且可以在浏览器端使用！

## 感谢

基于优秀的 FFMPEG [ffmpeg.wasm](https://github.com/ffmpegwasm/ffmpeg.wasm)，简单封装了下。

## demo 演示

见 demo 文件夹下。

[在线体验](https://m3u8-tomp4.vercel.app/index.html)

## 安装

### In Browser

```
<script src="https://unpkg.com/@zackdk/m3u8tomp4@1.0.4/dist/m3u8tomp4.browser.mini.js"></script>
```

### npm

```
npm i @zackdk/m3u8tomp4
```

## 使用

```javascript
//node端
//import m3u8tomp4 from 'm3u8tomp4'; ES Module
const m3u8tomp4 = require('m3u8tomp4');
const fs = require('fs');
//返回一个promise, data 是一个 Unit8Array。
const data = await m3u8tomp4.default(m3u8Url, options);
fs.promises.writeFile('./test.mp4', data);

//浏览器内
const data = await m3u8tomp4(m3u8Url, options);
const url = URL.createObjectURL(new Blob([res.buffer], { type: 'video/mp4' }));

//log信息
m3u8tomp4.setLogger((msg) => console.log);
```

## options

```typescript
interface MergeOptions {
  /** 下载 TS 片段时，最大的并发请求数量，默认 6 */
  maxLimit?: number;
  /** 是否打印日志，默认 true */
  logOpen?: boolean;
  /** 如果下载ts片段，出现下载失败的情况，重新下载所有失败片段的次数，默认 3 */
  retryTimes?: number;
}
```

## 限制

具体请参照 ffmpeg.wasm 的[FAQ](https://github.com/ffmpegwasm/ffmpeg.wasm#faq).

1. 只能在支持 SharedArrayBuffer 的浏览器种运行.(目前看来只有 PC 端的谷歌浏览器可以用)

2. 由于 WebAssembly 的限制,最大支持 2GB 文件的输入.

## 支持一下

如果该库对你有帮助，可以点一下 ⭐️!
