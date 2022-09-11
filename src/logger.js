const noop = () => {};
let logger = noop;
const setLogger = (fn) => {
  logger = fn || noop;
};

export default {
  setLogger,
  setLogging: (open) => (loggerOpen = open),
  log: (msg) => logger(msg),
};
