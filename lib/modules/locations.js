const axios = require("axios").default;

function retrieveLocation(id, networkConfig) {
  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      url: `${networkConfig.base_url}/deliveries/${id}`,
      headers: {
        Authorization: "apikey " + networkConfig.api_key,
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

module.exports = {
  retrieveLocation,
};
