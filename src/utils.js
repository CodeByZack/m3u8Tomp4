
export const Uint8ArrayToString = (fileData) => {
    let dataString = "";
    for (let i = 0; i < fileData.length; i++) {
        dataString += String.fromCharCode(fileData[i]);
    }
    return dataString
}

export const checkSourceType = (str) => {
    if (str.endsWith("m3u8")) {
        return "m3u8";
    } else if (str.endsWith("ts")) {
        return "ts";
    } else if (str.endsWith("key")) {
        return "key";
    } else {
        return "";
    }
};