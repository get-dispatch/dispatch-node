const axios = require("axios").default;

function _retrieveLocation(id, networkConfig) {
  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      url: `${networkConfig.base_url}/deliveries/${id}`,
      headers: {
        Authorization: "apikey " + networkConfig.api_key,
      },
    })
      .then((res) => {
        console.log(res.data);
        resolve(res.data);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
}

// function _listDeliveries() {
//   return new Promise((resolve, reject) => {
//     axios({
//       method: "GET",
//       url: `${networkConfig.base_url}/deliveries/`,
//       headers: {
//         Authorization: "apikey " + networkConfig.api_key,
//       },
//     })
//       .then((res) => {
//         console.log(res.data);
//         resolve(res.data);
//       })
//       .catch((err) => {
//         console.error(err);
//         reject(err);
//       });
//   });
// }

// function _createDelivery(sender, recipient, parcels, options, _config) {
//   return new Promise((resolve, reject) => {
//     axios({
//       method: "POST",
//       url: `${networkConfig.base_url}/deliveries/`,
//       headers: {
//         Authorization: "apikey " + networkConfig.api_key,
//       },
//       data: {
//         sender: sender,
//         recipient: recipient,
//         parcels: parcels,
//         options: options,
//       },
//     })
//       .then((res) => {
//         console.log(res.data);
//         resolve(res.data);
//       })
//       .catch((err) => {
//         console.error(err);
//         reject(err);
//       });
//   });
// }

// function _purchaseDelivery(delivery_id, rate_id, options, _config) {
//   return new Promise((resolve, reject) => {
//     axios({
//       method: "POST",
//       url: `${networkConfig.base_url}/deliveries/${delivery_id}`,
//       headers: {
//         Authorization: "apikey " + networkConfig.api_key,
//       },
//       data: {
//         rate_id: rate_id,
//         payment_method: options.payment_method ? options.payment_method : null,
//       },
//     })
//       .then((res) => {
//         console.log(res.data);
//         resolve(res.data);
//       })
//       .catch((err) => {
//         console.error(err);
//         reject(err);
//       });
//   });
// }

// function _refundDelivery(delivery_id, _config) {
//   return new Promise((resolve, reject) => {
//     axios({
//       method: "POST",
//       url: `${networkConfig.base_url}/deliveries/${delivery_id}/refund`,
//       headers: {
//         Authorization: "apikey " + networkConfig.api_key,
//       },
//     })
//       .then((res) => {
//         console.log(res.data);
//         resolve(res.data);
//       })
//       .catch((err) => {
//         console.error(err);
//         reject(err);
//       });
//   });
// }

module.exports = {
  _retrieveLocation,
};
