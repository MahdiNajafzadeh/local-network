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
    // check request parameters
    if (usernameInRequest) {
      userTeamName = activeDirectory.getDataUser(usernameInRequest).teamName;
    }

    // log Data for Debugging ---> هر چه خار آید ، روزی به کار آید :)

    // import All variable
    let addTeamNameLabel = false;
    let allLabelOnIssue = [];
    let allLabelOnIssueString = "";
    // check userTeamName
    if (userTeamName) {
      // check all label -- req.body.object_attributes.labels
      for (const label of req.body.object_attributes.labels) {
        // add all label
        allLabelOnIssue.push(label.title);
      }
    }
    addTeamNameLabel = userTeamName in allLabelOnIssue;
    // check to Do PUT or Not !
    if (addTeamNameLabel) {
      // Add User Team Name to All Labels
      allLabelOnIssue.push(userTeamName);
      // Ready Label to PUT API --> Array to String
      allLabelOnIssueString = allLabelOnIssue.toString();
      // Modify Labels --> PUT API
      await putAPI(`projects/${projectID}/issues/${issueID}/`, {
        labels: allLabelOnIssueString,
      });
    }

    console.log(`------------------------------------------------------`);
    console.log(`User Name      : ${usernameInRequest}`);
    console.log(`Uesr Team Name : ${userTeamName}`);
    console.log(`Project ID     : ${projectID}`);
    console.log(`Issue ID       : ${issueID}`);
    console.log(`Labels         : ${allLabelOnIssue}`);
    console.log(`------------------------------------------------------`);
  } catch (error) {
    console.log("Error: " + error);
  } finally {
    next();
  }
};
