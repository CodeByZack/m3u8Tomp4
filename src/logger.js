const noop = () => {};

let innerLogger = noop;


const setLogger = (fn) => {
  innerLogger = fn || noop;
};

const Logger = {
  setLogger,
  log: (msg) => innerLogger(msg),
};

export default Logger;
