const axios = require("axios").default;

function _retrieveDelivery(id, networkConfig) {
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

function _listDeliveries() {
  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      url: `${networkConfig.base_url}/deliveries/`,
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

module.exports = {
  _retrieveDelivery,
  _listDeliveries,
};
