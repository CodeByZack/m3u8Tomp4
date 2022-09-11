export const findMaxSubStr = (s1, s2) => {
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

export const Uint8ArrayToString = (fileData) => {
  let dataString = '';
  for (let i = 0; i < fileData.length; i++) {
    dataString += String.fromCharCode(fileData[i]);
  }
  return dataString;
};

export const StringToUint8Array = (str) => {
  const arr = [];
  for (let i = 0, j = str.length; i < j; ++i) {
    arr.push(str.charCodeAt(i));
  }

  const tmpUint8Array = new Uint8Array(arr);
  return tmpUint8Array;
};

export const getFullUrl = (prefixUrl, path) => {
  if (path.startsWith('http')) return path;
  const subStr = findMaxSubStr(prefixUrl, path);
  return `${prefixUrl}${path.replace(subStr, '')}`;
};

export const getFileName = (urlPath) => {
  const fileName = urlPath.substring(urlPath.lastIndexOf('/') + 1);
  return fileName;
};