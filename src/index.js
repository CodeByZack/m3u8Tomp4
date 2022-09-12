import * as FFmpeg from '@ffmpeg/ffmpeg';
import praseM3u8, { retryFetchFile } from './praseM3u8';
import logger from './logger';
import { requestPool } from './requestPool';

// interface MergeOptions {
//   /** 下载 TS 片段时，最大的并发请求数量，默认 6 */
//   maxLimit?: number;
//   /** 是否打印日志，默认 true */
//   logOpen?: boolean;
//   /** 如果下载ts片段，出现下载失败的情况，重新下载所有失败片段的次数，默认 3 */
//   retryTimes?: number;
// }

logger.setLogger(console.log);
const { createFFmpeg } = FFmpeg;

const merge2mp4 = async (url, options) => {
  const { maxLimit = 6, logOpen = true, retryTimes = 3 } = options || {};
  if (!logOpen) {
    logger.setLogger(undefined);
  }
  const ffmpeg = createFFmpeg();
  logger.log(`开始下载${url},并获取所有ts片段链接`);
  const praseObj = await praseM3u8(url);
  if (!praseObj) {
    logger.log(`解析 m3u8 列表出错！`);
    return null;
  }
  console.log(praseObj);
  debugger
  let tsArr = praseObj.tsArr;

  logger.log(`加载ffmpeg...`);
  await ffmpeg.load();
  ffmpeg.FS('writeFile', 'index.m3u8', praseObj['index.m3u8']);
  ffmpeg.setLogging(logOpen);
  ffmpeg.setProgress(({ ratio }) => {
    logger.log(`合并进度${ratio}.`);
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

          logger.log(
            `正在下载ts片段: 成功${successCount}段，失败${errorCount}段，总共${totalCount}段`,
          );
        } catch (error) {
          logger.log(error);
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
  logger.log(`开始执行合并.`);
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

export const setLogger = logger.setLogger;

export default merge2mp4;
