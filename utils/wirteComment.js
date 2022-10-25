postAPI = require("../Services/request/post");
module.exports = (projectID, issueID, body) => {
  if (body) {
    postAPI(`/projects/${projectID}/issues/${issueID}/notes?body=${body}`)
      .then((res) => {
        console.log("Comment Writing ... done!");
      })
      .catch((err) => {
        console.log("Error to write comment : " + err.message);
      });
  } else {
    console.log("Body not Valid \n Body : " + body + "\n");
  }
};
