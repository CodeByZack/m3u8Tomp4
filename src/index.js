import FFmpeg from '@ffmpeg/ffmpeg';
import praseM3u8, { retryFetchFile } from './praseM3u8';
import logger from './logger';
import { requestPool } from './requestPool';

logger.setLogger(console.log);

const { createFFmpeg } = FFmpeg;

const merge2mp4 = async (url, options = { maxLimit: 6, logOpen: true }) => {
  const { maxLimit, logOpen } = options;
  if (!logOpen) {
    logger.setLogger(undefined);
  }
  const ffmpeg = createFFmpeg();
  logger.log(`开始下载${url},并获取所有ts片段链接`);
  const praseObj = await praseM3u8(url);
  const tsArr = praseObj.tsArr;

  logger.log(`加载ffmpeg...`);
  await ffmpeg.load();
  ffmpeg.FS('writeFile', 'index.m3u8', praseObj['index.m3u8']);
  ffmpeg.setLogging(logOpen);
  ffmpeg.setProgress(({ ratio }) => {
    logger.log(`合并进度${ratio}.`);
  });

  const downLoadResult = {
    successCount: 0,
    errorCount: 0,
    totalCount: tsArr.length,
  };

  await requestPool({
    data: tsArr,
    maxLimit,
    iteratee: async ({ item }) => {
      try {
        ffmpeg.FS('writeFile', item.fileName, await retryFetchFile(item.path));
        // const index = tsArr.indexOf(item);
        downLoadResult.successCount++;
        logger.log(
          `正在下载ts片段: 成功${downLoadResult.successCount}段，失败${downLoadResult.errorCount}段，总共${downLoadResult.totalCount}段`,
        );
      } catch (error) {
        downLoadResult.errorCount++;
      }
    },
  });
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
