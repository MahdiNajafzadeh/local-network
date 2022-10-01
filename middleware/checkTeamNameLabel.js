// package importing

const { activeDirectory } = require("../Services/ActiveDirctory/index");
const putAPI = require("../Services/request/put");

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
    // log Data for Debugging
    // console.log(`------------------------------------------------------`);
    // console.log(`User Name      : ${usernameInRequest}`);
    // console.log(`Uesr Team Name : ${userTeamName}`);
    // console.log(`Project ID     : ${projectID}`);
    // console.log(`Issue ID       : ${issueID}`);
    // console.log(`Labels         : ${req.body.object_attributes.labels}`);
    // console.log(`------------------------------------------------------`);

    // import All variable
    let checkLabelTeamName = true;
    let allLabelOnIssue = [];
    let allLabelOnIssueString = "";
    // check all label
    for (const label of req.body.object_attributes.labels) {
      if (label.title === userTeamName) {
        checkLabelTeamName = true;
        break;
      } else {
        checkLabelTeamName = false;
      }
      // add all label
      allLabelOnIssue.push(label.title);
    }
    // check to Do PUT or Not !
    if (!checkLabelTeamName) {
      // Add User Team Name to All Labels
      allLabelOnIssue.push(userTeamName);
      // Ready Label to PUT API --> Array to String
      for (let index = 0; index < allLabelOnIssue.length; index++) {
        if (index === allLabelOnIssue.length - 1) {
          // for last label
          allLabelOnIssueString += allLabelOnIssue[index];
        } else {
          // for another labels
          allLabelOnIssueString += allLabelOnIssue[index] + ",";
        }
      }
      console.log(
        // Modify Labels --> PUT API
        await putAPI(`projects/${projectID}/issues/${issueID}/`, {
          labels: allLabelOnIssueString,
        })
      );
    }
  } catch (error) {
    console.log("Error: " + error);
  } finally {
    next();
  }
};
