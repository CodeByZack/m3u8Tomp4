import FFmpeg from '@ffmpeg/ffmpeg';
import praseM3u8, { retryFetchFile } from './praseM3u8';
import logger from './logger';

logger.setLogger(console.log);


const { createFFmpeg } = FFmpeg;


const merge2mp4 = async (url)=>{
  const ffmpeg = createFFmpeg();

  logger.log(`开始下载${url},并获取所有ts片段链接`);
  const praseObj = await praseM3u8(url);

  // 如果有多个码率,默认选第一个
  const [link,tsArr] = Object.entries(praseObj)[0];
  
  logger.log(`加载ffmpeg...`);
  await ffmpeg.load();
  ffmpeg.FS('writeFile', 'index.m3u8', await retryFetchFile(link));
  ffmpeg.setLogging(false);
  ffmpeg.setProgress(({ratio})=>{
    logger.log(`合并进度${ratio}.`);
  });
  for (const ts of tsArr) {
      ffmpeg.FS('writeFile', ts.name, await retryFetchFile(ts.path));
      const index = tsArr.indexOf(ts);
      logger.log(`正在下载ts片段: 第${index}段，共${tsArr.length}段`);
  }
  logger.log(`开始执行合并.`)
  await ffmpeg.run('-i', 'index.m3u8', '-c', 'copy' , 'output.mp4');
  const data = ffmpeg.FS('readFile', 'output.mp4');

  return data;

};

export const setLogger =  logger.setLogger;

export default merge2mp4;