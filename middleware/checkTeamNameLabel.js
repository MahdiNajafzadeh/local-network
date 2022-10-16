// package importing

const { activeDirectory } = require("../Services/ActiveDirctory/index");
const putAPI = require("../Services/request/put");
const translateTeamName = require("../utils/translateTeamName");

module.exports = async (req, res, next) => {
  try {
    // log
    console.log("check Label MW Running ...");

    // variables importing
    const usernameInRequest = req.body.user.name;
    const projectID = req.body.object_attributes.project_id;
    const issueID = req.body.object_attributes.iid;
    let userTeamName = "";
    let addTeamNameLabel = true;
    let allLabelOnIssue = [];
    let allLabelOnIssueString = "";

    // check request parameters
    if (usernameInRequest) {
      userTeamName = activeDirectory.getDataUser(usernameInRequest).teamName;
      // check userTeamName & traslate Team Name to Persian & add labels to array
      if (userTeamName) {
        userTeamName = translateTeamName(userTeamName);
        for (const label of req.body.object_attributes.labels) {
          if (userTeamName === label.title) addTeamNameLabel = false;
          allLabelOnIssue.push(label.title);
        }
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

    for (let index = 0; index < allLabelOnIssue.length; index++) {
      if (userTeamName === allLabelOnIssue[index]) addTeamNameLabel = false;
    }

    // Add userTeamName & Ready Labels to PUT API & Run API
    if (addTeamNameLabel) {
      allLabelOnIssue.push(userTeamName);
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
    console.log("Error: " + error);
  } finally {
    next();
  }
};
