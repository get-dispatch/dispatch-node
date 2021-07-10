const duration = require("../../lib/util/calc-time");
const logSymbols = require("log-symbols");
const Dispatch = require("../../lib/dispatch");
require("dotenv").config();
const dispatch = new Dispatch(process.env.DISPATCH_API_KEY, process.env.DISPATCH_ENV);

const list = (options) => {
  return new Promise((resolve, reject) => {
    const start_time = process.hrtime();
    console.log("List Deliveries...");

    dispatch.deliveries
      .list(options)
      .then((res) => {
        console.log(`${res.data.length} listed`.green.bold);
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

const create = () => {
  return new Promise((resolve, reject) => {
    const start_time = process.hrtime();
    console.log("Creating Delivery...");

    const sender = {
      name: "Dispatch Roasters",
      email: "roasters@getdispatch.app",
      phone: "2678846151",
      address: "500 7th Ave 8th floor, New York, NY 10018",
    };

    const recipient = {
      name: "Jamie Jones",
      email: "jamie.jones@getdispatch.app",
      address: "600 B Street Suite 300 San Diego, CA 92101",
    };

    const parcel = {
      length: 10, // inches
      width: 10, // inches
      height: 10, // inches
      weight: 5.5, // pounds
    };

    dispatch.deliveries
      .create(sender, recipient, [parcel])
      .then((res) => {
        console.log(`${res.data.id}, ${res.data.rates[0].id}`);
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

const buy = (deliveryId, rateId) => {
  return new Promise((resolve, reject) => {
    const start_time = process.hrtime();
    console.log("Purchasing delivery...");

    dispatch.deliveries
      .buy(deliveryId, rateId)
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

const retrieve = (deliveryId) => {
  return new Promise((resolve, reject) => {
    const start_time = process.hrtime();
    console.log("Retrieving delivery...");

    dispatch.deliveries
      .retrieve(deliveryId)
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

const refund = (deliveryId) => {
  return new Promise((resolve, reject) => {
    const start_time = process.hrtime();
    console.log("Refunding delivery...");

    dispatch.deliveries
      .refund(deliveryId)
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

const update = (deliveryId) => {
  return new Promise((resolve, reject) => {
    const start_time = process.hrtime();
    console.log("Updating delivery...");

    const update = {
      sender: {
        name: "Dispatch Name Update",
      },
    };

    dispatch.deliveries
      .update(deliveryId, update)
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
  list,
  create,
  buy,
  retrieve,
  refund,
  update,
};
