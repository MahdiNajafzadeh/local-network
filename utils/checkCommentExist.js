const getAPI = require("../Services/request/get");
module.exports = (projectID, issueID, bodyComment) => {
  try {
    getAPI(`/projects/${projectID}/issues/${issueID}/notes?sort=asc`)
      .then((res) => {
        let existComment = false;
        for (const comment of res.data) {
          existComment = comment.body === bodyComment ? true : false;
        }
        return existComment;
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
