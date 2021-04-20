module.exports = (apikey, env) => {
  let baseUrl = "https://api.getdispatch.app/v1/sender";

  switch (env) {
    case "production":
      baseUrl = "https://api.getdispatch.app/v1/sender";
      break;
    case "staging":
      baseUrl = "https://staging--api.getdispatch.app/v1/sender";
      break;
    case "demo":
      baseUrl = "https://demo--api.getdispatch.app/v1/sender";
      break;
    case "dev":
      baseUrl = "https://dev--api.getdispatch.app/v1/sender";
      break;
    default:
      baseUrl = "https://api.getdispatch.app/v1/sender";
      break;
  }

  const object = {
    api_key: apikey,
    base_url: baseUrl,
  };

  return object;
};
