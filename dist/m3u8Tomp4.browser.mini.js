!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).m3u8Tomp4=t()}(this,(function(){"use strict";function e(e,t,r,n,o,i,a){try{var s=e[i](a),c=s.value}catch(e){return void r(e)}s.done?t(c):Promise.resolve(c).then(n,o)}function t(t){return function(){var r=this,n=arguments;return new Promise((function(o,i){var a=t.apply(r,n);function s(t){e(a,o,i,s,c,"next",t)}function c(t){e(a,o,i,s,c,"throw",t)}s(void 0)}))}}function r(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?n(Object(o),!0).forEach((function(t){r(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):n(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function i(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],n=!0,o=!1,i=void 0;try{for(var a,s=e[Symbol.iterator]();!(n=(a=s.next()).done)&&(r.push(a.value),!t||r.length!==t);n=!0);}catch(e){o=!0,i=e}finally{try{n||null==s.return||s.return()}finally{if(o)throw i}}return r}(e,t)||a(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(e,t){if(e){if("string"==typeof e)return s(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?s(e,t):void 0}}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function c(e,t){var r;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(r=a(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0,o=function(){};return{s:o,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,s=!0,c=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return s=e.done,e},e:function(e){c=!0,i=e},f:function(){try{s||null==r.return||r.return()}finally{if(c)throw i}}}}"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;function f(e,t,r){return e(r={path:t,exports:{},require:function(e,t){return function(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}(null==t&&r.path)}},r.exports),r.exports}f((function(e){var t=function(e){var t,r=Object.prototype,n=r.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",s=o.toStringTag||"@@toStringTag";function c(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{c({},"")}catch(e){c=function(e,t,r){return e[t]=r}}function f(e,t,r,n){var o=t&&t.prototype instanceof g?t:g,i=Object.create(o.prototype),a=new P(n||[]);return i._invoke=function(e,t,r){var n=l;return function(o,i){if(n===h)throw new Error("Generator is already running");if(n===m){if("throw"===o)throw i;return S()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var s=O(a,r);if(s){if(s===d)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===l)throw n=m,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=h;var c=u(e,t,r);if("normal"===c.type){if(n=r.done?m:p,c.arg===d)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n=m,r.method="throw",r.arg=c.arg)}}}(e,r,a),i}function u(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}e.wrap=f;var l="suspendedStart",p="suspendedYield",h="executing",m="completed",d={};function g(){}function y(){}function v(){}var w={};w[i]=function(){return this};var b=Object.getPrototypeOf,x=b&&b(b(k([])));x&&x!==r&&n.call(x,i)&&(w=x);var E=v.prototype=g.prototype=Object.create(w);function F(e){["next","throw","return"].forEach((function(t){c(e,t,(function(e){return this._invoke(t,e)}))}))}function j(e,t){function r(o,i,a,s){var c=u(e[o],e,i);if("throw"!==c.type){var f=c.arg,l=f.value;return l&&"object"==typeof l&&n.call(l,"__await")?t.resolve(l.__await).then((function(e){r("next",e,a,s)}),(function(e){r("throw",e,a,s)})):t.resolve(l).then((function(e){f.value=e,a(f)}),(function(e){return r("throw",e,a,s)}))}s(c.arg)}var o;this._invoke=function(e,n){function i(){return new t((function(t,o){r(e,n,t,o)}))}return o=o?o.then(i,i):i()}}function O(e,r){var n=e.iterator[r.method];if(n===t){if(r.delegate=null,"throw"===r.method){if(e.iterator.return&&(r.method="return",r.arg=t,O(e,r),"throw"===r.method))return d;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return d}var o=u(n,e.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,d;var i=o.arg;return i?i.done?(r[e.resultName]=i.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=t),r.delegate=null,d):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,d)}function _(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function L(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function P(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(_,this),this.reset(!0)}function k(e){if(e){var r=e[i];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,a=function r(){for(;++o<e.length;)if(n.call(e,o))return r.value=e[o],r.done=!1,r;return r.value=t,r.done=!0,r};return a.next=a}}return{next:S}}function S(){return{value:t,done:!0}}return y.prototype=E.constructor=v,v.constructor=y,y.displayName=c(v,s,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===y||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,v):(e.__proto__=v,c(e,s,"GeneratorFunction")),e.prototype=Object.create(E),e},e.awrap=function(e){return{__await:e}},F(j.prototype),j.prototype[a]=function(){return this},e.AsyncIterator=j,e.async=function(t,r,n,o,i){void 0===i&&(i=Promise);var a=new j(f(t,r,n,o),i);return e.isGeneratorFunction(r)?a:a.next().then((function(e){return e.done?e.value:a.next()}))},F(E),c(E,s,"Generator"),E[i]=function(){return this},E.toString=function(){return"[object Generator]"},e.keys=function(e){var t=[];for(var r in e)t.push(r);return t.reverse(),function r(){for(;t.length;){var n=t.pop();if(n in e)return r.value=n,r.done=!1,r}return r.done=!0,r}},e.values=k,P.prototype={constructor:P,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(L),!e)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var r=this;function o(n,o){return s.type="throw",s.arg=e,r.next=n,o&&(r.method="next",r.arg=t),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],s=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var c=n.call(a,"catchLoc"),f=n.call(a,"finallyLoc");if(c&&f){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!f)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===e||"continue"===e)&&i.tryLoc<=t&&t<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=e,a.arg=t,i?(this.method="next",this.next=i.finallyLoc,d):this.complete(a)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),d},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),L(r),d}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var o=n.arg;L(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,r,n){return this.delegate={iterator:k(e),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=t),d}},e}(e.exports);try{regeneratorRuntime=t}catch(e){Function("r","regeneratorRuntime = r")(t)}}));let u=!1,l=()=>{};var p={logging:u,setLogging:e=>{u=e},setCustomLogger:e=>{l=e},log:(e,t)=>{l({type:e,message:t}),u&&console.log(`[${e}] ${t}`)}};let h=0;const m=e=>{const[t,r,n]=e.split(":");return 60*parseFloat(t)*60+60*parseFloat(r)+parseFloat(n)};var d=f((function(e,t){e.exports=function(){function e(){var e=arguments.length;if(0===e)throw new Error("resolveUrl requires at least one argument; got none.");var t=document.createElement("base");if(t.href=arguments[0],1===e)return t.href;var r=document.getElementsByTagName("head")[0];r.insertBefore(t,r.firstChild);for(var n,o=document.createElement("a"),i=1;i<e;i++)o.href=arguments[i],n=o.href,t.href=n;return r.removeChild(t),n}return e}()})),g={name:"@ffmpeg/ffmpeg",version:"0.9.5",description:"FFmpeg WebAssembly version",main:"src/index.js",types:"src/index.d.ts",directories:{example:"examples"},scripts:{start:"node scripts/server.js",build:"rimraf dist && webpack --config scripts/webpack.config.prod.js",prepublishOnly:"npm run build",lint:"eslint src",wait:"rimraf dist && wait-on http://localhost:3000/dist/ffmpeg.dev.js",test:"npm-run-all -p -r start test:all","test:all":"npm-run-all wait test:browser:ffmpeg test:node:all","test:node":"node --experimental-wasm-threads --experimental-wasm-bulk-memory node_modules/.bin/_mocha --exit --bail --require ./scripts/test-helper.js","test:node:all":"npm run test:node -- ./tests/*.test.js","test:browser":"mocha-headless-chrome -a allow-file-access-from-files -a incognito -a no-sandbox -a disable-setuid-sandbox -a disable-logging -t 300000","test:browser:ffmpeg":"npm run test:browser -- -f ./tests/ffmpeg.test.html"},browser:{"./src/node/index.js":"./src/browser/index.js"},repository:{type:"git",url:"git+https://github.com/ffmpegwasm/ffmpeg.wasm.git"},keywords:["ffmpeg","WebAssembly","video"],author:"Jerome Wu <jeromewus@gmail.com>",license:"MIT",bugs:{url:"https://github.com/ffmpegwasm/ffmpeg.wasm/issues"},engines:{node:">=12.16.1"},homepage:"https://github.com/ffmpegwasm/ffmpeg.wasm#readme",dependencies:{"is-url":"^1.2.4","node-fetch":"^2.6.1","regenerator-runtime":"^0.13.7","resolve-url":"^0.2.1"},devDependencies:{"@babel/core":"^7.12.3","@babel/preset-env":"^7.12.1","@ffmpeg/core":"^0.8.4","@types/emscripten":"^1.39.4","babel-loader":"^8.1.0",chai:"^4.2.0",cors:"^2.8.5",eslint:"^7.12.1","eslint-config-airbnb-base":"^14.1.0","eslint-plugin-import":"^2.22.1",express:"^4.17.1",mocha:"^8.2.1","mocha-headless-chrome":"^2.0.3","npm-run-all":"^4.1.5","wait-on":"^5.2.0",webpack:"^5.3.2","webpack-cli":"^4.1.0","webpack-dev-middleware":"^4.0.0"},__npminstall_done:"Sat Nov 21 2020 13:13:05 GMT+0800 (中国标准时间)",_from:"@ffmpeg/ffmpeg@0.9.5",_resolved:"https://registry.npm.taobao.org/@ffmpeg/ffmpeg/download/@ffmpeg/ffmpeg-0.9.5.tgz"};const{devDependencies:y}=g;var v={corePath:"undefined"!=typeof process&&"development"===process.env.FFMPEG_ENV?d("/node_modules/@ffmpeg/core/dist/ffmpeg-core.js"):`https://unpkg.com/@ffmpeg/core@${y["@ffmpeg/core"].substring(1)}/dist/ffmpeg-core.js`};const{log:w}=p;var b={defaultOptions:v,getCreateFFmpegCore:async({corePath:e})=>{if(void 0===window.createFFmpegCore){w("info","fetch ffmpeg-core.worker.js script");const t=d(e),r=await(await fetch(t.replace("ffmpeg-core.js","ffmpeg-core.worker.js"))).blob();return window.FFMPEG_CORE_WORKER_SCRIPT=URL.createObjectURL(r),w("info",`worker object URL=${window.FFMPEG_CORE_WORKER_SCRIPT}`),w("info",`download ffmpeg-core script (~25 MB) from ${t}`),new Promise((e=>{const r=document.createElement("script"),n=()=>{r.removeEventListener("load",n),w("info","initialize ffmpeg-core"),e(window.createFFmpegCore)};r.src=t,r.type="text/javascript",r.addEventListener("load",n),document.getElementsByTagName("head")[0].appendChild(r)}))}return w("info","ffmpeg-core is loaded already"),Promise.resolve(window.createFFmpegCore)},fetchFile:async e=>{let t=e;if(void 0===e)return new Uint8Array;if("string"==typeof e)if(/data:_data\/([a-zA-Z]*);base64,([^"]*)/.test(e))t=atob(e.split(",")[1]).split("").map((e=>e.charCodeAt(0)));else{const r=await fetch(d(e));t=await r.arrayBuffer()}else(e instanceof File||e instanceof Blob)&&(t=await(r=e,new Promise(((e,t)=>{const n=new FileReader;n.onload=()=>{e(n.result)},n.onerror=({target:{error:{code:e}}})=>{t(Error(`File could not be read! Code=${e}`))},n.readAsArrayBuffer(r)}))));var r;return new Uint8Array(t)}};const{defaultArgs:x,baseOptions:E}={defaultArgs:["./ffmpeg","-nostdin","-y"],baseOptions:{log:!1,logger:()=>{},progress:()=>{},corePath:""}},{setLogging:F,setCustomLogger:j,log:O}=p,{defaultOptions:_,getCreateFFmpegCore:L}=b,{version:P}=g,k=Error("ffmpeg.wasm is not ready, make sure you have completed load().");const{fetchFile:S}=b;var R={createFFmpeg:(e={})=>{const{log:t,logger:r,progress:n,...o}={...E,..._,...e};let i=null,a=null,s=null,c=!1,f=n;const u=({type:e,message:t})=>{O(e,t),((e,t)=>{if("string"==typeof e)if(e.startsWith("  Duration")){const t=e.split(", ")[0].split(": ")[1],r=m(t);(0===h||h>r)&&(h=r)}else if(e.startsWith("frame")){const r=e.split("time=")[1].split(" ")[0];t({ratio:m(r)/h})}else e.startsWith("video:")&&(t({ratio:1}),h=0)})(t,f),(e=>{"FFMPEG_END"===e&&null!==s&&(s(),s=null,c=!1)})(t)};return F(t),j(r),O("info",`use ffmpeg.wasm v${P}`),{setProgress:e=>{f=e},setLogger:e=>{j(e)},setLogging:F,load:async()=>{if(O("info","load ffmpeg-core"),null!==i)throw Error("ffmpeg.wasm was loaded, you should not load it again, use ffmpeg.isLoaded() to check next time.");{O("info","loading ffmpeg-core");const e=await L(o);i=await e({printErr:e=>u({type:"fferr",message:e}),print:e=>u({type:"ffout",message:e}),locateFile:(e,t)=>"undefined"!=typeof window&&void 0!==window.FFMPEG_CORE_WORKER_SCRIPT&&e.endsWith("ffmpeg-core.worker.js")?window.FFMPEG_CORE_WORKER_SCRIPT:t+e}),a=i.cwrap("proxy_main","number",["number","number"]),O("info","ffmpeg-core loaded")}},isLoaded:()=>null!==i,run:(...e)=>{if(O("info",`run ffmpeg command: ${e.join(" ")}`),null===i)throw k;if(c)throw Error("ffmpeg.wasm can only run one command at a time");return c=!0,new Promise((t=>{const r=[...x,...e].filter((e=>0!==e.length));s=t,a(...((e,t)=>{const r=e._malloc(t.length*Uint32Array.BYTES_PER_ELEMENT);return t.forEach(((t,n)=>{const o=e._malloc(t.length+1);e.writeAsciiToMemory(t,o),e.setValue(r+Uint32Array.BYTES_PER_ELEMENT*n,o,"i32")})),[t.length,r]})(i,r))}))},FS:(e,...t)=>{if(O("info",`run FS.${e} ${t.map((e=>"string"==typeof e?e:`<${e.length} bytes binary file>`)).join(" ")}`),null===i)throw k;{let r=null;try{r=i.FS[e](...t)}catch(r){throw"readdir"===e?Error(`ffmpeg.FS('readdir', '${t[0]}') error. Check if the path exists, ex: ffmpeg.FS('readdir', '/')`):"readFile"===e?Error(`ffmpeg.FS('readFile', '${t[0]}') error. Check if the path exists`):Error("Oops, something went wrong in FS operation.")}return r}}}},fetchFile:S},C=/(.*\/).*\.m3u8$/,T=function(e){for(var t="",r=0;r<e.length;r++)t+=String.fromCharCode(e[r]);return t},A=function(){var e=t(regeneratorRuntime.mark((function e(t){var r,n,a,s,f,u,l,p,h,m,d,g;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={},e.next=3,R.fetchFile(t);case 3:if(n=e.sent,a=T(n),s=t.match(C),f=i(s,2),f[0],u=f[1],console.log(u),l=a.split("\n").filter((function(e){return!e.startsWith("#")})),console.log(l),0!==l.length){e.next=11;break}return e.abrupt("return",r);case 11:if(y=l[0],"ts"!==(y.endsWith("m3u8")?"m3u8":y.endsWith("ts")||y.endsWith("key")?"ts":"")){e.next=17;break}return r[t]=l.map((function(e){return{name:e,path:u+e}})).filter((function(e){return e.name})),e.abrupt("return",r);case 17:p=c(l),e.prev=18,p.s();case 20:if((h=p.n()).done){e.next=30;break}return m=h.value,d=u+m,console.log(d),e.next=26,A(d);case 26:g=e.sent,r=o(o({},r),g);case 28:e.next=20;break;case 30:e.next=35;break;case 32:e.prev=32,e.t0=e.catch(18),p.e(e.t0);case 35:return e.prev=35,p.f(),e.finish(35);case 38:return e.abrupt("return",r);case 39:case"end":return e.stop()}var y}),e,null,[[18,32,35,38]])})));return function(t){return e.apply(this,arguments)}}();return function(){var e=t(regeneratorRuntime.mark((function e(t){var r,n,o,a,s,f,u,l,p,h,m,d,g,y=arguments;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=y.length>1&&void 0!==y[1]?y[1]:console.log,n=R.createFFmpeg,o=R.fetchFile,a=n(),r("开始下载".concat(t,",并获取所有ts片段链接")),e.next=6,A(t);case 6:return s=e.sent,f=i(Object.entries(s)[0],2),u=f[0],l=f[1],r("加载ffmpeg..."),e.next=11,a.load();case 11:return e.t0=a,e.next=14,o(u);case 14:e.t1=e.sent,e.t0.FS.call(e.t0,"writeFile","index.m3u8",e.t1),a.setLogging(!1),a.setProgress((function(e){var t=e.ratio;r("合并进度".concat(t,"."))})),p=c(l),e.prev=19,p.s();case 21:if((h=p.n()).done){e.next=33;break}return m=h.value,e.t2=a,e.t3=m.name,e.next=27,o(m.path);case 27:e.t4=e.sent,e.t2.FS.call(e.t2,"writeFile",e.t3,e.t4),d=l.indexOf(m),r("正在下载ts片段: 第".concat(d,"段，共").concat(l.length,"段"));case 31:e.next=21;break;case 33:e.next=38;break;case 35:e.prev=35,e.t5=e.catch(19),p.e(e.t5);case 38:return e.prev=38,p.f(),e.finish(38);case 41:return r("开始执行合并."),e.next=44,a.run("-i","index.m3u8","-c","copy","output.mp4");case 44:return g=a.FS("readFile","output.mp4"),e.abrupt("return",g);case 46:case"end":return e.stop()}}),e,null,[[19,35,38,41]])})));return function(t){return e.apply(this,arguments)}}()}));
