const noop = () => {};
let logger = noop;
const setLogger = (fn) => {
  logger = fn;
};


export default {
    setLogger,
    log : (msg)=>logger(msg)
};
