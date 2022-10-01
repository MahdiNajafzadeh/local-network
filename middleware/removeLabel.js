const GetAPI = require("../Services/request/get");
const DeleteAPI = require("../Services/request/delete");

module.exports = async () => {
  // log
  console.log("RUN Remvoe Labels!");
  // get All labels data
  const labels = await GetAPI("projects/183/labels");
  // console.log("Next API");
  // console.log(labels);
  // console.log("-----------------------------------------");
  for (label of labels.data) {
    console.log(`projects/183/labels/${label.id}`);
    const resAPI = await DeleteAPI(`projects/183/labels/${label.id}`);
    if (resAPI.state) {
      console.log(`Label ${label.name} --> Delete!`);
    } else {
      console.log(`Label ${label.name} --> Not Delete!`);
    }
  }
};