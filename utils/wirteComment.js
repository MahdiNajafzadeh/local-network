const postAPI = require("../Services/request/post");
const { log } = require("node:console");
module.exports = (projectID, issueID, userName, body) => {
  let gijg = "?body=${body}";
  let body2 = {body: body}
  try {
    if (projectID && issueID && userName) {
      postAPI(`/projects/${projectID}/issues/${issueID}/notes`, body2)
        .then((res) => {
          if (res.status) {
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
