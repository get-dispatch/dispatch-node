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
const dispatch = new Dispatch("key_EHKD5tbatzX59DArnTBjhr46G5n1f4aJkvwPByft");

dispatch.deliveries
  .list()
  .then((response) => console.log(response.data))
  .catch((error) => console.error(error));
```

Or using ES modules and `async`/`await`:

```js
import Dispatch from "dispatch-node";
const dispatch = new Dispatch("key_EHKD5tbatzX59DArnTBjhr46G5n1f4aJkvwPByft");

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
   email: "roasters@getdispatch.app",
   location_id: "loc_1uzCQL4cTjjw3vRfE2qYk1"
}

const recipient = {
   name: "Jamie Jones"
   email: "jamie.jones@getdispatch.app",
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
   weight: 5.5 // pounds
}

dispatch.deliveries
  .create(sender, recipient, [parcel])
  .then(response => {
      const delivery = response.data

      //your logic to select the rate you want.
      //You could have a customer select it or you can filter by price or service level
      //in this example, we're selecting the first rate

      const rate = delivery.rates[0]
      return dispatch.deliveries.buy(delivery.id, rate.id)
  }).then(response => {
      //new delivery was created
  }).catch(err => {
      //deal with the error
  })
```
