(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@ffmpeg/ffmpeg'), require('m3u8-parser')) :
  typeof define === 'function' && define.amd ? define(['exports', '@ffmpeg/ffmpeg', 'm3u8-parser'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.m3u8tomp4 = {}, global.FFmpeg, global.m3u8Parser));
})(this, (function (exports, FFmpeg, m3u8Parser) { 'use strict';

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var FFmpeg__namespace = /*#__PURE__*/_interopNamespace(FFmpeg);

  const findMaxSubStr = (s1, s2) => {
    let str = '',
      L1 = s1.length,
      L2 = s2.length;

    if (L1 > L2) {
      let s3 = s1;
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
  };

  const Uint8ArrayToString = (fileData) => {
    let dataString = '';
    for (let i = 0; i < fileData.length; i++) {
      dataString += String.fromCharCode(fileData[i]);
    }
    return dataString;
  };

  const StringToUint8Array = (str) => {
    const arr = [];
    for (let i = 0, j = str.length; i < j; ++i) {
      arr.push(str.charCodeAt(i));
    }

    const tmpUint8Array = new Uint8Array(arr);
    return tmpUint8Array;
  };

  const getFullUrl = (prefixUrl, path) => {
    if (path.startsWith('http')) return path;
    const subStr = findMaxSubStr(prefixUrl, path);
    return `${prefixUrl}${path.replace(subStr, '')}`;
  };

  const getFileName = (urlPath) => {
    const fileName = urlPath.substring(urlPath.lastIndexOf('/') + 1);
    return fileName;
  };

  const noop = () => {};

  let innerLogger = noop;


  const setLogger$1 = (fn) => {
    innerLogger = fn || noop;
  };

  const Logger = {
    setLogger: setLogger$1,
    log: (msg) => innerLogger(msg),
  };

  const { fetchFile } = FFmpeg__namespace;
  const reg = /(.*\/).*\.m3u8$/;

  const retry =
    (fn, retryCount = 3) =>
    async (...args) => {
      for (let i = 0; i < retryCount; i++) {
        try {
          const data = await fn.apply(null, args);
          return data;
        } catch (error) {
          Logger.log(`下载${args[0]}出错,已尝试次数${i + 1}`);
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
    // @ts-ignore
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
        if (!key && item.key) {
          key = item.key;
        }
        copyMediaList = copyMediaList.replace(obj.name, obj.fileName);
        results.push(obj);
      }

      if (key) {
        results.push({
          name: 'key.key',
          fileName: 'key.key',
          path: getFullUrl(prefixUrl, key.uri),
        });
        copyMediaList = copyMediaList.replace(key.uri, 'key.key');
      }

      return { tsArr: results, 'index.m3u8': StringToUint8Array(copyMediaList) };
    }

    return null;
  };

  // interface RequestPoolParams<T> {
  //   data: T[];
  //   maxLimit?: number;
  //   iteratee: (params: {
  //     index: number;
  //     item: T;
  //     data: T[];
  //   }) => any | Promise<any>;
  // }

  /**
   * promise并发限制调用
   * @param {object[]} data - 调用的数据列表
   * @param {number} maxLimit - 并发调用限制个数
   * @param {function} iteratee - 处理单个节点的方法
   * @returns {promise}
   */
  const requestPool = ({
    data = [],
    maxLimit = 3,
    iteratee = () => {},
  }) => {
    const executing = [];
    const enqueue = (index = 0) => {
      // 边界处理
      if (index === data.length) {
        return Promise.all(executing);
      }
      // 每次调用enqueue, 初始化一个promise
      const item = data[index];

      function itemPromise(index) {
        const promise = new Promise(async (resolve) => {
          // 处理单个节点
          await iteratee({ index, item, data });
          resolve(index);
        }).then(() => {
          // 执行结束，从executing删除自身
          const delIndex = executing.indexOf(promise);
          delIndex > -1 && executing.splice(delIndex, 1);
        });
        return promise;
      }
      // 插入executing数字，表示正在执行的promise
      executing.push(itemPromise(index));

      // 使用Promise.rece，每当executing数组中promise数量低于maxLimit，就实例化新的promise并执行
      let race = Promise.resolve();

      if (executing.length >= maxLimit) {
        race = Promise.race(executing);
      }

      // 递归，直到遍历完
      return race.then(() => enqueue(index + 1));
    };

    return enqueue();
  };

  // 示例
  // promiseLimitPool({
  //   data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  //   maxLimit: 2,
  //   iteratee: async ({ item }) => {
  //     console.log('onClick -> item', item);
  //     await Axios({
  //       method: 'get',
  //       url: `API接口地址`,
  //       params: { page: 0, size: 9 },
  //     });
  //   },
  // });

  // interface MergeOptions {
  //   /** 下载 TS 片段时，最大的并发请求数量，默认 6 */
  //   maxLimit?: number;
  //   /** 是否打印日志，默认 true */
  //   logOpen?: boolean;
  //   /** 如果下载ts片段，出现下载失败的情况，重新下载所有失败片段的次数，默认 3 */
  //   retryTimes?: number;
  // }

  Logger.setLogger(console.log);
  const { createFFmpeg } = FFmpeg__namespace;

  const merge2mp4 = async (url, options) => {
    const { maxLimit = 6, logOpen = true, retryTimes = 3 } = options || {};
    if (!logOpen) {
      Logger.setLogger(undefined);
    }
    const ffmpeg = createFFmpeg();
    Logger.log(`开始下载${url},并获取所有ts片段链接`);
    const praseObj = await praseM3u8(url);
    if (!praseObj) {
      Logger.log(`解析 m3u8 列表出错！`);
      return null;
    }
    let tsArr = praseObj.tsArr;

    Logger.log(`加载ffmpeg...`);
    await ffmpeg.load();
    ffmpeg.FS('writeFile', 'index.m3u8', praseObj['index.m3u8']);
    ffmpeg.setLogging(logOpen);
    ffmpeg.setProgress(({ ratio }) => {
      Logger.log(`合并进度${ratio}.`);
    });

    const downLoadResult = {
      successItems: [],
      errorItems: [],
      totalItems: tsArr,
    };

    for (let i = 0; i < retryTimes; i++) {
      await requestPool({
        data: tsArr,
        maxLimit,
        iteratee: async ({ item }) => {
          try {
            ffmpeg.FS(
              'writeFile',
              item.fileName,
              await retryFetchFile(item.path),
            );
            // const index = tsArr.indexOf(item);
            downLoadResult.successItems.push(item);
            const successCount = downLoadResult.successItems.length;
            const errorCount = downLoadResult.errorItems.length;
            const totalCount = downLoadResult.totalItems.length;

            Logger.log(
              `正在下载ts片段: 成功${successCount}段，失败${errorCount}段，总共${totalCount}段`,
            );
          } catch (error) {
            Logger.log(error);
            downLoadResult.errorItems.push(item);
          }
        },
      });

      console.log(downLoadResult);

      if (
        downLoadResult.successItems.length === downLoadResult.totalItems.length
      ) {
        break;
      } else {
        tsArr = downLoadResult.errorItems;
        downLoadResult.errorItems = [];
      }
    }

    // for (const ts of tsArr) {
    //   ffmpeg.FS('writeFile', ts.fileName, await retryFetchFile(ts.path));
    //   const index = tsArr.indexOf(ts);
    //   logger.log(`正在下载ts片段: 第${index}段，共${tsArr.length}段`);
    // }
    Logger.log(`开始执行合并.`);
    await ffmpeg.run(
      '-allowed_extensions',
      'ALL',
      '-i',
      'index.m3u8',
      '-c',
      'copy',
      'output.mp4',
    );
    const data = ffmpeg.FS('readFile', 'output.mp4');

    return data;
  };

  const setLogger = Logger.setLogger;

  exports["default"] = merge2mp4;
  exports.setLogger = setLogger;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
