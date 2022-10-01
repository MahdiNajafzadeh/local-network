const GetAPI = require("../Services/request/get");
const DeleteAPI = require("../Services/request/delete");

module.exports = async () => {
  try {
    // log
    console.log("RUN Remvoe Labels!");
    // get All labels data
    const labels = await GetAPI("projects/183/labels");
    // Delete all labels
    for (label of labels.data) {
      // RUN Delete API
      const resAPI = await DeleteAPI(`projects/183/labels/${label.id}`);
      // Check status API
      if (resAPI.state) {
        console.log(`Label ${label.name} --> Delete!`);
      } else {
        console.log(`Label ${label.name} --> Not Delete!`);
      }
    }
  } catch (error) {
    // log Error
    console.log("Error: " + error);
  } finally {
    next();
  }
};
