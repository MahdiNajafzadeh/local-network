const getAPI = require("../Services/request/get");
const wirteComment = require("./wirteComment");
module.exports = async (projectID, issueID, bodyComment) => {
  try {
    // get data form server ---> comments
    await getAPI(`/projects/${projectID}/issues/${issueID}/notes?sort=asc`)
      .then(async (res) => {
        // import varibale
        let existComment = false;
        // check data
        if (res.data) {
          // for On all commments
          for (const comment of res.data) {
            // check to exist target Commment In All Comments
            if (comment.body === bodyComment) {
              existComment = true;
            }
          }
          // check to Need Add Comment or Not
          if (!existComment) {
            await wirteComment(projectID, issueID, bodyComment);
          }
        }
      })
      .catch((error) => {
        return errorHandleShow("in getAPI()",error)
      });
  } catch (error) {
    return errorHandleShow("out getAPI()",error)
  }
};

function errorHandleShow(location,error) {
  console.log(`${location} : Error to read Comment :  + ${error.message}`);
  return false;
}
