getAPI = require("./Services/request/get");
postAPI = require("./Services/request/post");
// Get Data Before Request
getAPI("/projects/188/issues/1/notes?sort=asc").then((res) => {
  for (const comment of res.data) {
    console.log(comment.body);
  }
});
// Send Request
let body = "I can write Comment !";
postAPI(`/projects/188/issues/1/notes?body=${body}`).then((res) => {
  console.log("Hey Responss State is " + res.state);
  // Get Data After Request
  getAPI("/projects/188/issues/1/notes?sort=asc").then((res) => {
    for (const comment of res.data) {
      console.log(comment.body);
    }
  });
});
