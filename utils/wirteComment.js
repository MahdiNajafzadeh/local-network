const postAPI = require("../Services/request/post");
const { log } = require("node:console");
module.exports = (projectID, issueID, body) => {
  let bodyObject = {body: body}
  try {
    if (projectID && issueID ) {
      postAPI(`/projects/${projectID}/issues/${issueID}/notes`, bodyObject)
        .then((res) => {
          if (res.state) {
            log(`
            Comment Writing ... Done! 
            state API : ${res.state}
            `);
          } else {
            log(`
            Comment Writing ... Failed! 
            state API : ${res.state}
            API Error : ${res.data} 
             `);
          }
        })
        .catch((error) => {
          log("Error to write comment : " + error.message);
        });
    } else {
      log(`Data not Valid
      projectID : ${projectID}
      issueID : ${issueID}
      Body : \n${body}
      `);
    }
  } catch (error) {
    log("Error to write comment : " + error.message);
  }
};
