// package Importing

const config = require("../../config/gitlab");
const axios = require("axios");

// variable importing

let state = false,
  response = "No Response :(";

module.exports = async (path) => {
  console.log(`URL : DELETE ${config.url}/${path}`);

  try {
    const resAPI = await axios.delete(`${config.url}/${path}`, {
      headers: {
        Authorization: "Bearer " + config.token,
      },
    });
    if (!resAPI.data) {
      state = true;
      response = resAPI.data;
    }
  } catch (error) {
    response = error;
  }
  // Return Data
  return {
    state: state,
    data: response,
  };
};
