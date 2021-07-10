#!/usr/bin/env node
const v8 = require("v8");
const program = require("commander");
const logSymbols = require("log-symbols");
const colors = require("colors");
console.log("");
// console.log(`Script started with ~${(v8.getHeapStatistics().total_available_size / 1024 / 1024 / 1024).toFixed(2)} GB of memory`.green.bold);

const deliveries = require("./scripts/deliveries");
const profile = require("./scripts/profile");

program.version("1.1.0");

program
  .command("deliveries.list")
  .description("Lists the deliveries")
  .option("-l, --limit <int>", "Adds a limit to the deliveries list", 10)
  .option("-p, --page <int>", "Adds a page to the deliveries list", null)
  .action((options) => {
    deliveries.list({ limit: options.limit, page: options.page });
  });

program
  .command("deliveries.create")
  .description("Creates a new delivery intent")
  .action(() => {
    deliveries.create();
  });

program
  .command("deliveries.buy")
  .description("Buys a delivery")
  .argument("<delivery>", "The ID of the delivery")
  .argument("<rate>", "The ID of the rate")
  .action((delivery, rate) => {
    deliveries.buy(delivery, rate);
  });

program
  .command("deliveries.retrieve")
  .description("Retrieve a delivery")
  .argument("<delivery>", "The ID of the delivery")
  .action((delivery, rate) => {
    deliveries.retrieve(delivery);
  });

program
  .command("deliveries.refund")
  .description("Refunds a delivery")
  .argument("<delivery>", "The ID of the delivery")
  .action((delivery) => {
    deliveries.refund(delivery);
  });

program
  .command("deliveries.update")
  .description("Updates a delivery")
  .argument("<deliveryId>", "The ID of the delivery")
  .action((deliveryId) => {
    deliveries.update(deliveryId);
  });

program
  .command("profile.retrieve")
  .description("Retrieve the sender profile")
  .action(() => {
    profile.retrieve();
  });

program
  .command("test")
  .description("Tests dispatch npm module and API's")
  .action((delivery, rate) => {
    console.log("Testing Delivery APIs".bgBlue.bold);
    console.log("");
    console.log("");

    deliveries
      .list()
      .then(() => {
        return deliveries.create();
      })
      .then((res) => {
        return deliveries.update(res.data.id);
      })
      .then((res) => {
        return deliveries.buy(res.data.id, res.data.rates[0].id);
      })
      .then((res) => {
        return deliveries.retrieve(res.data.id);
      })
      .then((res) => {
        return deliveries.refund(res.data.id);
      })
      .then((res) => {
        return profile.retrieve();
      })
      .then((res) => {
        console.log("All Dispatch Delivery API's are working".green.bold);
        console.log("");
        console.log("");
        console.log("Test Completed".bgBlue.bold);
      })
      .catch((err) => {
        console.error(err);
        console.log("Dispatch Test Failed".red.bold);
      });
  });

program.parse(process.argv);
