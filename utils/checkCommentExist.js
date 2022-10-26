const getAPI = require("../Services/request/get");
module.exports = (projectID, issueID, bodyComment) => {
  try {
    getAPI(`/projects/${projectID}/issues/${issueID}/notes?sort=asc`)
      .then((res) => {
        let existComment = true;
        for (const comment of res.data) {
          if (comment.body === bodyComment) {
            existComment = false;
            console.log(comment.body);
          }
          return existComment;
        }
      })
      .catch((error) => {
        console.log("Error to read Comment: " + error.message);
        return false;
      });
  } catch (error) {
    console.log("Error to read Comment: " + error.message);
    return false;
  }
};
