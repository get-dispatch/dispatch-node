# Dispatch Sender Node.js Library

The Dispatch Sender Node library provides convenient access to the Dispatch Sender API from applications written in server-side JavaScript.

## Installation

Install the package with:

```sh
npm install dispatch-node --save
```

## Usage

The package needs to be configured with your account's API Key, which is
available in the [Dispatch Dashboard](https://app.getdispatch.app/settings/api).

```js
const Dispatch = require("dispatch-node");
const dispatch = new Dispatch("YOUR_API_KEY");

dispatch.deliveries
  .list()
  .then((response) => console.log(response.data))
  .catch((error) => console.error(error));
```

Or using ES modules and `async`/`await`:

```js
import Dispatch from "dispatch-node";
const dispatch = new Stripe("YOUR_API_KEY");

(async () => {
  const response = await dispatch.deliveries.list();

  console.log(response.data);
})();
```

### Using Promises

Every method returns a chainable promise which can be used instead of a regular callback:

```js
// Create a new delivery and then select the cheapest rate to purchase

const sender = {
   name: "Dispatch Roasters"
   email: roasters@getdispatch.app,
   address_id: "addr_j83498fhweofh4937fh"
}

const recipient = {
   name: "Jamie Jones"
   email: jamie.jones@getdispatch.app,
   address: {
       address_line1: "500 7th Ave",
       city: "New York",
       state: "NY"
       zipcode: "10018"
    }
}

const parcel = {
   length: 10 // inches
   width: 10 // inches
   height: 10 // inches
   weight: 10 // pounds
}

dispatch.deliveries
  .create(sender, recipient, [parcel])
  .then(response => {
      const delivery = response.data

      //filter for the cheapest rate
      const rate = delivery.rates.reduce((a, b) => Math.min(a, b));
      return dispatch.deliveries.buy(delivery.id, rate.id)
  }).then(response => {
      //new delivery was created
  }).catch(err => {
      //deal with the error
  })
```
