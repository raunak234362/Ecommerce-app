// Defining a customFetch function that handles API requests asynchronously
const customFetch = async (url, { body, ...rest }) => {
  // Creating a configuration object
  const config = {
    ...rest,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }
  try {
    // Making the API request using fetch
    let response = await fetch(url, config);
    // Parse the response body as JSON
    let data = await response.json();
    if (data) {
      return data;
    } else {
      throw new Error("data not fetched");
    }
  } catch (error) {
    console.log(error);
  }
};
export default customFetch;
