import FFmpeg from '@ffmpeg/ffmpeg';
import praseM3u8 from './praseM3u8';

const { createFFmpeg, fetchFile } = FFmpeg;


const merge2mp4 = async (url,logger = console.log)=>{
  const ffmpeg = createFFmpeg();

  logger(`开始下载${url},并获取所有ts片段链接`);
  const praseObj = await praseM3u8(url);

  // 如果有多个码率,默认选第一个
  const [link,tsArr] = Object.entries(praseObj)[0];
  
  logger(`加载ffmpeg...`);
  await ffmpeg.load();
  ffmpeg.FS('writeFile', 'index.m3u8', await fetchFile(link));
  ffmpeg.setLogging(false);
  ffmpeg.setProgress(({ratio})=>{
    logger(`合并进度${ratio}.`);
  });
  for (const ts of tsArr) {
      ffmpeg.FS('writeFile', ts.name, await fetchFile(ts.path));
      const index = tsArr.indexOf(ts);
      logger(`正在下载ts片段: 第${index}段，共${tsArr.length}段`);
  }
  logger(`开始执行合并.`)
  await ffmpeg.run('-i', 'index.m3u8', '-c', 'copy' , 'output.mp4');
  const data = ffmpeg.FS('readFile', 'output.mp4');

  //返回 一个mp4的 url
  return data;

};

export default merge2mp4;