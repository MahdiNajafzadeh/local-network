// package importing

const getDataUser = require("../Services/ActiveDirctory/getDataUser");
const putAPI = require("../Services/request/put");
const translateTeamName = require("../utils/translateTeamName");
const wirteComment = require("../utils/wirteComment");

module.exports = async (req, res, next) => {
  try {
    // log
    console.log("check Label MW Running ...");

    // variables importing
    const usernameInRequest = req.body.user.name,
      projectID = req.body.object_attributes.project_id,
      issueID = req.body.object_attributes.iid,
      labels = req.body.object_attributes.labels;
    let userTeamName,
      addTeamNameLabel = true,
      allLabelOnIssue = [],
      allLabelOnIssueString,
      userObjectData,
      userTeamNameFa;

    // check request parameters
    if (usernameInRequest) {
      // Get Data from AD
      userObjectData = getDataUser(usernameInRequest);
      // Check to Error
      if (userObjectData.errorCode === 404) {
        // if user not found
        wirteComment(projectID, issueID, usernameInRequest);
        addTeamNameLabel = false;
        // check userTeamName & traslate Team Name to Persian & add labels to array
        if (userObjectData.userTeamName) {
          userTeamNameFa = translateTeamName(userTeamName);
          for (const label of labels) {
            if (userTeamNameFa === label.title) addTeamNameLabel = false;
            allLabelOnIssue.push(label.title);
          }
        } else {
          console.log(userObjectData.message);
        }
        // if more than 1 user found !
      } else if (userObjectData.errorCode === 405) {
        console.log(userObjectData.messages);
        addTeamNameLabel = false;
      }
    }

    // log Data for Debugging ---> هر چه خار آید ، روزی به کار آید :)
    // console.log(`------------------------------------------------------`);
    // console.log(`                          Before                      `);
    // console.log(`User Name      : ${usernameInRequest}`);
    // console.log(`Uesr Team Name : ${userTeamName}`);
    // console.log(`Project ID     : ${projectID}`);
    // console.log(`Issue ID       : ${issueID}`);
    // console.log(`Labels         : ${allLabelOnIssue}`);
    // console.log(`------------------------------------------------------`);

    // Add userTeamName & Ready Labels to PUT API & Run API
    if (addTeamNameLabel) {
      allLabelOnIssue.push(userTeamNameFa);
      allLabelOnIssueString = allLabelOnIssue.toString();
      await putAPI(`projects/${projectID}/issues/${issueID}/`, {
        labels: allLabelOnIssueString,
      });
    }

    // log Data for Debugging ---> هر چه خار آید ، روزی به کار آید :)
    // console.log(`------------------------------------------------------`);
    // console.log(`                          after                       `);
    // console.log(`User Name      : ${usernameInRequest}`);
    // console.log(`Uesr Team Name : ${userTeamName}`);
    // console.log(`Project ID     : ${projectID}`);
    // console.log(`Issue ID       : ${issueID}`);
    // console.log(`Labels         : ${allLabelOnIssue}`);
    // console.log(`------------------------------------------------------`);
  } catch (error) {
    // Error logging
    console.log("Error: " + error);
  } finally {
    next();
  }
};
