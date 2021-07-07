/**
 * Calcualtes time by passing in the a previous process.hrtime()
 * @param {Array} start_time - pass in process.hrtime() for the start period
 * @returns {String} time interval - Returns a string that calculated the time difference in human readable units
 */
module.exports = (start) => {
  const ns_per_sec = 1e9;
  const ns_per_ms = 1e6;

  const diff = process.hrtime(start);
  const ns = diff[0] * ns_per_sec + diff[1];
  let length = ns.toString().length;
  let res = ns;

  switch (length) {
    case 1:
    case 2:
    case 3:
    case 4:
      res = `${ns.toFixed(2)}ns`;
      break;
    case 5:
    case 6:
    case 7:
      res = `${(ns / ns_per_ms).toFixed(2)}ms`;
      break;
    case 8:
    case 9:
    case 10:
    case 11:
      res = `${(ns / ns_per_ms / 1000).toFixed(2)}s`;
      break;
    case 12:
    case 13:
    case 14:
      res = `${(ns / ns_per_ms / 1000 / 60).toFixed(2)} mins`;
      break;
  }

  return res;
};
