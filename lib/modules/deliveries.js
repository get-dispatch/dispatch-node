const axios = require("axios").default;

function retrieveDelivery(id, _config) {
  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      url: `${_config.base_url}/deliveries/${id}`,
      headers: {
        Authorization: "apikey " + _config.api_key,
      },
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
}

function listDeliveries(options, _config) {
  return new Promise((resolve, reject) => {
    let url = `${_config.base_url}/deliveries?`;

    if (options && options.limit) {
      url += `limit=${options.limit}&`;
    }

    if (options && options.page) {
      url += `page=${options.page}&`;
    }

    if (options && options.location) {
      url += `location=${options.location}&`;
    }

    if (options && options.status) {
      url += `status=${options.status}&`;
    }

    axios({
      method: "GET",
      url: url,
      headers: {
        Authorization: "apikey " + _config.api_key,
      },
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
}

function createDelivery(sender, recipient, parcels, options, _config) {
  return new Promise((resolve, reject) => {
    axios({
      method: "POST",
      url: `${_config.base_url}/deliveries/`,
      headers: {
        Authorization: "apikey " + _config.api_key,
      },
      data: {
        sender: sender,
        recipient: recipient,
        parcels: parcels,
        options: options,
      },
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
}

function purchaseDelivery(delivery_id, rate_id, options, _config) {
  return new Promise((resolve, reject) => {
    axios({
      method: "POST",
      url: `${_config.base_url}/deliveries/${delivery_id}`,
      headers: {
        Authorization: "apikey " + _config.api_key,
      },
      data: {
        rate_id: rate_id,
        payment_method: options.payment_method ? options.payment_method : null,
      },
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
}

function refundDelivery(delivery_id, _config) {
  return new Promise((resolve, reject) => {
    axios({
      method: "POST",
      url: `${_config.base_url}/deliveries/${delivery_id}/refund`,
      headers: {
        Authorization: "apikey " + _config.api_key,
      },
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
}

function updateDelivery(delivery_id, update, _config) {
  return new Promise((resolve, reject) => {
    axios({
      method: "POST",
      url: `${_config.base_url}/deliveries/${delivery_id}/update`,
      headers: {
        Authorization: "apikey " + _config.api_key,
      },
      data: update,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
}

module.exports = {
  retrieveDelivery,
  listDeliveries,
  createDelivery,
  purchaseDelivery,
  refundDelivery,
  updateDelivery,
};
