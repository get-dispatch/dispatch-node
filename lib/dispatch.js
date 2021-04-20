const { _retrieveDelivery, _listDeliveries } = require("./modules/deliveries");
const _createNetworkConfig = require("./util/network-config");

/**
 * Creates a new Dispatch class. Once this class is initalized, you can use any of the namespaces with a method to use tge API.
 * @name Dispatch
 * @class
 * @classdesc This is the main class that will be the entry point into dispatch. You can initalize this class with your API Key.
 * @param {string} token - initalize the class with your API key.
 * @param {string} [env="production"] - Unless you have development keys, just leave this to the default value.
 *
 * @example const dispatch = new Dispatch(<YOUR_API_KEY>)
 *
 */
module.exports = class Dispatch {
  constructor(apikey, env = "production", debug = false) {
    this.apikey = apikey;
    this.env = env;
    this.debug = debug;

    /**
     *
     * @memberof Dispatch
     * @namespace deliveries
     */
    this.deliveries = {
      /**
       * Retrieves a delivery using it's ID
       * @memberof Dispatch.deliveries
       * @namespace Dispatch.deliveries.retrieve
       *
       * @method retrieve
       * @param {string} id - The is of the delivery that you want to retrieve
       * @returns {Promise<Delivery>} returns the delivery object. {@link Delivery}
       *
       * @example const response = await dispatch.deliveries.list()
       * const deliveries = response.data
       */
      retrieve: function (id) {
        return new Promise((resolve, reject) => {
          const _config = _createNetworkConfig(apikey, env);
          _retrieveDelivery(id, _config)
            .then((data) => {
              resolve(data);
            })
            .catch((err) => {
              console.error(err);
              reject(err);
            });
        });
      },

      /**
       * Get a paginated list of deliveries
       * @memberof Dispatch.deliveries
       * @namespace Dispatch.deliveries.list
       *
       * @method list
       * @returns {Promise<Object>} returns the standard Dispatch response object.
       */
      list: _listDeliveries(apikey),
    };
  }
};

/**
 * The Delivery object. Any of the properties could have null values if the delivery is not purchased.
 * @typedef {Object} Delivery
 * @property {string} id - The delivery ID
 * @property {integer} amount - The amount that was payed for the delivery as an integer.
 * @property {Object} branding - Specified the branding for thsi delivery
 * @property {integer} branding.email - If an email will be sent by Dispatch, this determines whcih logo will be on the email
 * @property {integer} branding.label - Which logo should be placed on the label
 * @property {Object<Courier>} courier - The courier object if the delivery is on demand
 * @property {integer} created_at - The time in miliseconds from Epoch in miliseconds of the creation date
 * @todo {Object} customs_declaration - Any customes declarations for international shipping
 * @property {string} estimated_delivery - A human readable string value for the estimated delivery date and time.
 * @property {Object} grace_period -The grace period that an on_demand courier will wait for and the fees for going over it.
 * @property {integer} grace_period.fee - The grace period fee as an integer.
 * @property {integer} grace_period.minutes - The amount of minutes that the grace period is good for.
 * @todo {Object} insurance - The object representing the insurance
 * @property {string} intent_status - The status of the delivery intent. An intent can be "created" when rates were generated but not purchased yet, "expired" if the intent was not captured within 15 mins, "captured" which means that the intent was paid for, and "deleted" which is when the intent was removed from the database.
 * @property {string} label_name - The name of the shipping label as saved in the storage bucket. @deprecated This property will be removed.
 * @property {integer} lead_time_hours - The amount of lead time that was required for this delivery before an on_demand courier can pick it up.
 * @property {Array} live_location - The lat and lon coordinates of the the current location of the delivery. Not every courier supports this.
 * @property {Boolean} on_demand - If this delivery is for an on_demand courier
 * @property {Boolean} paid - If this delivery was paid for.
 * @property {Array<Parcel>} parcels - An array of parcel objects, which are the boxes and items that were being transported.
 * @property {integer} pickup_wait_seconds - The amount of seconds that an on demand courier needed to wait after they arrived to pickup the package until it was marked as picked up.
 * @property {Object<Rate>} purchased_rate - The rate that was purchased by the customer
 * @property {string} qr_code_url - If the label has a QR Code, this will be the url that is encoded on it.
 * @property {Array<Rate>} rates - an array of rates that are returned when the delivery intent was created.
 * @property {Object<Recipient>} receipient - The recipient object. This is the person who is getting the package.
 * @property {string} refund_status - The refund status if one was requested. Funds will be credited back to the account after the refund status is approved by the carrier. Dispatch couriers refunds are immediate.
 * @property {Object<Sender>} sender - The object representing the sender, which is the entity that initally sent that package.
 * @property {integer} shipment_date - The time in miliseconds from Epoch in miliseconds of the shipment date.
 * @property {string} special_handling - Any special handling instructions that will be placed on the label. Limited to 10 characters.
 * @property {string} status - The tracking status for the delivery. For a complete list see the github readme.
 * @property {string} substatus - The tracking substatus for the delivery. This gives much more detail about the package whereabouts. For a complete list see the github readme.
 * @property {boolean} test - If this was a test delivery
 * @property {boolean} tracking_notificaitons - Indicates if dispatch will send update emails for the delivery.
 * @property {string} tracking_number - The tracking number for the delivery
 * @property {Object<Tracker>} tracking_status - The current tracking status for this delivery
 * @property {Array<Tracker>} tracking_updates - An array of all of the tracking updates for this delviery including the current one. 
 * @property {string} type - The type of delivery this is: "traditional" or "marketplace"
 * @property {integer} updated_at - The time in miliseconds from Epoch in miliseconds when this delivery last had an update
 * @property {integer} value - The declared value of this delivery
 * @property {Object} webhooks - the webhook object that has all of the events that wil be fired for this delivery 
 * @property {Array<string>} webhooks.delivery_created - an array of urls to notify when a delivery is created
 * @property {Array<string>} webhooks.delivery_expired - an array of urls to notify when a delivery expires. Rates as good for 15 minutes until they expire.
 * @property {Array<string>} webhooks.delivery_purchased - an array of urls to notify when a delivery is successully purchased
 * @property {Array<string>} webhooks.tracking_updated - an array of urls to notify when there is a tracking update to a delivery.
 * /



// /**
//  * The Courier object
//  * @typedef {Object} Courier
//  * @property {string} id - The courier ID
//  * @property {integer} amount - The amount that was payed for the delivery as an integer.
//  */

// /**
//  * The Rate object
//  * @typedef {Object} Rate
//  * @property {string} id - The courier ID
//  * @property {integer} amount - The amount that was payed for the delivery as an integer.
//  */
