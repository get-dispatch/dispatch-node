const axios = require("axios").default;

function retrieveProfile(networkConfig) {
  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      url: `${networkConfig.base_url}/profile`,
      headers: {
        Authorization: "apikey " + networkConfig.api_key,
      },
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
}

module.exports = {
  retrieveProfile,
};
