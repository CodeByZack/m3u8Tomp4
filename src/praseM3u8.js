import * as FFmpeg from '@ffmpeg/ffmpeg';
import {
  Uint8ArrayToString,
  StringToUint8Array,
  getFullUrl,
  getFileName,
} from './utils';
import logger from './logger';
import { Parser } from 'm3u8-parser';

const { fetchFile } = FFmpeg;
const reg = /(.*\/).*\.m3u8$/;

const retry =
  (fn, retryCount = 3) =>
  async (...args) => {
    for (let i = 0; i < retryCount; i++) {
      try {
        const data = await fn.apply(null, args);
        return data;
      } catch (error) {
        logger.log(`下载${args[0]}出错,已尝试次数${i + 1}`);
        if (i === retryCount - 1)
          throw new Error(`尝试次数${retryCount}次,获取失败！`);
      }
    }
  };

export const retryFetchFile = retry(fetchFile);

const praseM3u8 = async (url) => {
  const res = await retryFetchFile(url);
  const data = Uint8ArrayToString(res);
  let copyMediaList = data;
  // @ts-ignore
  const parser = new Parser();
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

export default praseM3u8;
