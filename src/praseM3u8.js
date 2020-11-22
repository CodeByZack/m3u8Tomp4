import FFmpeg from '@ffmpeg/ffmpeg';
import { Uint8ArrayToString, checkSourceType } from './utils';

const { fetchFile } = FFmpeg;

const reg = /(.*\/).*\.m3u8$/;
// const vaildM3u8Reg = /(http|https):\/\/.+\.m3u8$/ 

// M3U8分为两种顶级M3U8和二级M3U8，就是一个父子关系，顶级管理二级。
// 顶级M3U8：多码率适配的管理
// 二级M3U8：真正的切片文件，

//处理后的结果为 对象，每个key代表了一种码率，值为数组，存放所有ts片段的url。
const praseM3u8 = async (url)=>{
  let resultObj = {};
  // 获取到m3u8文件 字符串形式的
  const res = await fetchFile(url);
  const m3u8 = Uint8ArrayToString(res);

  // 获取通用前缀
  const [_,prefixUrl] = url.match(reg);
  console.log(prefixUrl);
  //拆分字符串为数组，过滤掉对于我们来说没有用的信息
  const lines = m3u8.split('\n').filter(i=>!i.startsWith('#'));
  console.log(lines);
  if(lines.length === 0 )return resultObj;
  const type = checkSourceType(lines[0]);
  if(type === "ts"){
    // const tsArr = getTs(lines);
    resultObj[url] = lines.map(d=>({ name : d, path :  prefixUrl + d})).filter(d=>d.name);
    return resultObj;
  }else{
    //其它情况默认都当作 m3u8文件
    for (const item of lines) {
      const lineM3u8 = prefixUrl + item;
      console.log(lineM3u8);
      const lineObj = await praseM3u8(lineM3u8);
      resultObj = {
        ...resultObj,
        ...lineObj
      }
    }
    return resultObj;
  }
};

export default praseM3u8;