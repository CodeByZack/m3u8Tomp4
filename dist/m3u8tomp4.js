(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@ffmpeg/ffmpeg'), require('m3u8-parser')) :
  typeof define === 'function' && define.amd ? define(['exports', '@ffmpeg/ffmpeg', 'm3u8-parser'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.m3u8tomp4 = {}, global.FFmpeg, global.m3u8Parser));
})(this, (function (exports, FFmpeg, m3u8Parser) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var FFmpeg__default = /*#__PURE__*/_interopDefaultLegacy(FFmpeg);

  const Uint8ArrayToString = (fileData) => {
    let dataString = '';
    for (let i = 0; i < fileData.length; i++) {
      dataString += String.fromCharCode(fileData[i]);
    }
    return dataString;
  };

  const StringToUint8Array = (str) => {
    var arr = [];
    for (var i = 0, j = str.length; i < j; ++i) {
      arr.push(str.charCodeAt(i));
    }

    var tmpUint8Array = new Uint8Array(arr);
    return tmpUint8Array;
  };

  const noop = () => {};
  let logger = noop;
  const setLogger$1 = (fn) => {
    logger = fn;
  };


  var logger$1 = {
      setLogger: setLogger$1,
      log : (msg)=>logger(msg)
  };

  const { fetchFile } = FFmpeg__default["default"];
  const reg = /(.*\/).*\.m3u8$/;

  function findMaxSubStr(s1, s2) {
    var str = '',
      L1 = s1.length,
      L2 = s2.length;

    if (L1 > L2) {
      var s3 = s1;
      s1 = s2;
      s2 = s3;
      s3 = null;
      L1 = s2.length;
      L2 = s1.length;
    }

    for (var i = L1; i > 0; i--) {
      for (var j = 0; j <= L2 - i && j < L1; j++) {
        str = s1.substr(j, i);
        if (s2.indexOf(str) >= 0) {
          return str;
        }
      }
    }

    return '';
  }

  const getFullUrl = (prefixUrl, path) => {
    if (path.startsWith('http')) return path;
    const subStr = findMaxSubStr(prefixUrl, path);
    return `${prefixUrl}${path.replace(subStr, '')}`;
  };

  const getFileName = (urlPath) => {
    const fileName = urlPath.substring(urlPath.lastIndexOf('/') + 1);
    return fileName;
  };

  const retry =
    (fn, retryCount = 3) =>
    async (...args) => {
      for (let i = 0; i < retryCount; i++) {
        try {
          const data = await fn.apply(null, args);
          return data;
        } catch (error) {
          logger$1.log(`下载${args[0]}出错,已尝试次数${i + 1}`);
          if (i === retryCount - 1)
            throw new Error(`尝试次数${retryCount}次,获取失败！`);
        }
      }
    };

  const retryFetchFile = retry(fetchFile);

  const praseM3u8 = async (url) => {
    const res = await retryFetchFile(url);
    const data = Uint8ArrayToString(res);
    let copyMediaList = data;
    const parser = new m3u8Parser.Parser();
    parser.push(data);
    parser.end();

    const { manifest } = parser;
    const { playlists, segments } = manifest;
    const [_, prefixUrl] = url.match(reg);
    if (playlists?.length) {
      // 如果有多个码率,默认选第一个
      const playList = playlists[0];
      const fullUrl = getFullUrl(prefixUrl, playList.uri);
      const tsRes = await praseM3u8(fullUrl);
      return tsRes;
    }

    if (segments?.length) {
      const results = [];
      let key;

      for (const item of segments) {
        const obj = {
          name: item.uri,
          fileName: getFileName(item.uri),
          path: getFullUrl(prefixUrl, item.uri),
        };
        if(!key && item.key){
          key = item.key;
        }
        copyMediaList = copyMediaList.replace(obj.name, obj.fileName);
        results.push(obj);
      }

      if(key){
        results.push({ name : "key.key", fileName : "key.key", path : getFullUrl(prefixUrl,key.uri)});
        copyMediaList = copyMediaList.replace(key.uri, 'key.key');
      }

      return { tsArr: results, 'index.m3u8': StringToUint8Array(copyMediaList) };
    }

    return null;
  };

  logger$1.setLogger(console.log);

  const { createFFmpeg } = FFmpeg__default["default"];

  const merge2mp4 = async (url) => {
    const ffmpeg = createFFmpeg();

    logger$1.log(`开始下载${url},并获取所有ts片段链接`);
    const praseObj = await praseM3u8(url);
    const tsArr = praseObj.tsArr;

    logger$1.log(`加载ffmpeg...`);
    await ffmpeg.load();
    ffmpeg.FS('writeFile', 'index.m3u8', praseObj['index.m3u8']);
    ffmpeg.setLogging(true);
    ffmpeg.setProgress(({ ratio }) => {
      logger$1.log(`合并进度${ratio}.`);
    });
    for (const ts of tsArr) {
      ffmpeg.FS('writeFile', ts.fileName, await retryFetchFile(ts.path));
      const index = tsArr.indexOf(ts);
      logger$1.log(`正在下载ts片段: 第${index}段，共${tsArr.length}段`);
    }
    logger$1.log(`开始执行合并.`);
    await ffmpeg.run('-allowed_extensions','ALL','-i', 'index.m3u8', '-c', 'copy', 'output.mp4');
    const data = ffmpeg.FS('readFile', 'output.mp4');

    return data;
  };

  const setLogger = logger$1.setLogger;

  exports["default"] = merge2mp4;
  exports.setLogger = setLogger;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
