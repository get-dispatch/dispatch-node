const duration = require("../../lib/util/calc-time");
const logSymbols = require("log-symbols");
const Dispatch = require("../../lib/dispatch");
require("dotenv").config();
const dispatch = new Dispatch(process.env.DISPATCH_API_KEY, process.env.DISPATCH_ENV);

const retrieve = () => {
  return new Promise((resolve, reject) => {
    const start_time = process.hrtime();
    console.log("Retrieving profile...");

    dispatch.profile
      .retrieve()
      .then((res) => {
        console.log(`${res.message}`.green.bold);
        console.log(`${logSymbols.info}  Task ran in ${duration(start_time)}`);
        console.log("");
        console.log("");
        resolve(res);
      })
      .catch((err) => {
        console.error(`${err.message}`.bgRed);
        reject(err);
        process.exit(1);
      });
  });
};

module.exports = {
  retrieve,
};
