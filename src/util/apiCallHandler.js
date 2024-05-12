import axios from "axios";

export const postApiCall = () => 0;

export const getApiCall = async (url, movieName) => {
  const key = process.env.REACT_APP_API_KEY;
  let response = {};
  try {
    const apiCallResponse = await axios.get(
      `${url}?t=${movieName}&apikey=${key}`
    );
    if (apiCallResponse.status === 200) {
      response = apiCallResponse.data;
    } else {
      response = { isError: true };
    }
    return response;
  } catch (err) {
    return { isError: true };
  }
};
