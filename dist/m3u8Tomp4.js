(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@ffmpeg/ffmpeg')) :
    typeof define === 'function' && define.amd ? define(['@ffmpeg/ffmpeg'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.m3u8Tomp4 = factory(global.FFmpeg));
}(this, (function (FFmpeg) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var FFmpeg__default = /*#__PURE__*/_interopDefaultLegacy(FFmpeg);

    const Uint8ArrayToString = (fileData) => {
        let dataString = "";
        for (let i = 0; i < fileData.length; i++) {
            dataString += String.fromCharCode(fileData[i]);
        }
        return dataString
    };

    const checkSourceType = (str) => {
        if (str.endsWith("m3u8")) {
            return "m3u8";
        } else if (str.endsWith("ts")) {
            return "ts";
        } else if (str.endsWith("key")) {
            return "ts";
        } else {
            return "";
        }
    };

    const { fetchFile } = FFmpeg__default['default'];

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
      }else {
        //其它情况默认都当作 m3u8文件
        for (const item of lines) {
          const lineM3u8 = prefixUrl + item;
          console.log(lineM3u8);
          const lineObj = await praseM3u8(lineM3u8);
          resultObj = {
            ...resultObj,
            ...lineObj
          };
        }
        return resultObj;
      }
    };

    // const wrapFetchFile = async (url)=>{

    //     let retryCount = 0;


    //     const wrap = ()=>{
    //         while


    //     }
        
        
    //     try {
    //         const data = await fetchFile(url);
    //     } catch (error) {
            


    //     }

    // }

    const { createFFmpeg, fetchFile: fetchFile$1 } = FFmpeg__default['default'];


    const merge2mp4 = async (url,logger = console.log)=>{
      const ffmpeg = createFFmpeg();

      logger(`开始下载${url},并获取所有ts片段链接`);
      const praseObj = await praseM3u8(url);

      // 如果有多个码率,默认选第一个
      const [link,tsArr] = Object.entries(praseObj)[0];
      
      logger(`加载ffmpeg...`);
      await ffmpeg.load();
      ffmpeg.FS('writeFile', 'index.m3u8', await fetchFile$1(link));
      ffmpeg.setLogging(false);
      ffmpeg.setProgress(({ratio})=>{
        logger(`合并进度${ratio}.`);
      });
      for (const ts of tsArr) {
          ffmpeg.FS('writeFile', ts.name, await fetchFile$1(ts.path));
          const index = tsArr.indexOf(ts);
          logger(`正在下载ts片段: 第${index}段，共${tsArr.length}段`);
      }
      logger(`开始执行合并.`);
      await ffmpeg.run('-i', 'index.m3u8', '-c', 'copy' , 'output.mp4');
      const data = ffmpeg.FS('readFile', 'output.mp4');

      //返回 一个mp4的 url
      return data;

    };

    return merge2mp4;

})));
