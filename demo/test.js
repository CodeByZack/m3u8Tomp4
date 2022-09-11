const merge2mp4 = require('../dist/m3u8Tomp4').default;
const fs = require('fs');


(async () => {
    try {
        const data = await merge2mp4("https://dy1.yle888.vip/20220418/n5QKogWx/index.m3u8");
        await fs.promises.writeFile('./test.mp4', data);
        process.exit(0);
    } catch (error) {
        console.log(error);
    }

})();