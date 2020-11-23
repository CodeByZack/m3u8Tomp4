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

> 一个便利的工具，从 m3u8 转换到 mp4文件，并且可以在浏览器端使用！

## 感谢

基于优秀的FFMPEG [ffmpeg.wasm](https://github.com/ffmpegwasm/ffmpeg.wasm)，简单封装了下。

## demo 演示

见 demo 文件夹下。

[在线体验](https://m3u8-tomp4.vercel.app/%E5%9C%A8%E7%BA%BF%E5%90%88%E5%B9%B6m3u8.html)

## 安装
### In Browser

```
<script src="./dist/m3u8tomp4.browser.mini.js"></script>
```

### npm

```
npm i @zackdk/m3u8tomp4
```


## 使用

```

//import m3u8tomp4 from 'm3u8tomp4'; ES Module
const m3u8tomp4 = require('m3u8tomp4');
const fs = require('fs');


//返回一个promise, data 是一个 Unit8Array。
const data = await m3u8tomp4.default(m3u8Url);

//node端可以
fs.promises.writeFile('./test.mp4', data);

//浏览器内可以
//const url = URL.createObjectURL(new Blob([res.buffer], { type: 'video/mp4' }));



//log信息
m3u8tomp4.setLogger((msg)=>console.log);

```



## 限制

具体请参照ffmpeg.wasm的[FAQ](https://github.com/ffmpegwasm/ffmpeg.wasm#faq).

1. 只能在支持SharedArrayBuffer的浏览器种运行.(目前看来只有PC端的谷歌浏览器可以用)

2. 由于WebAssembly的限制,最大支持2GB文件的输入.


## 支持一下

如果该库对你有帮助，可以点一下 ⭐️!
