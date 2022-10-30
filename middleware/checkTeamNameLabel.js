// package importing

const getDataUser = require("../Services/ActiveDirctory/getDataUser");
const putAPI = require("../Services/request/put");
const translateTeamName = require("../utils/translateTeamName");
const checkCommentExist = require("../utils/checkCommentExist");

module.exports = async (req, res, next) => {
  try {
    // log
    console.log("check Label MW Running ...");
    // variables importing
    const projectID = req.body.object_attributes.project_id;
    const usernameInRequest = req.body.user.username;
    let issueID = req.body.object_attributes.iid;
    let userTeamName;
    let allLabelOnIssue = [];
    let userObjectData;
    let userTeamNameFa;
    // import labels
    switch (req.body.object_kind) {
      case "issue":
        // for issue events only
        req.body.labels.forEach((label) => {
          allLabelOnIssue.push(label.title);
        });
        break;
      case "note":
        // for comments only
        issueID = req.body.issue.iid;
        req.body.issue.labels.forEach((label) => {
          allLabelOnIssue.push(label.title);
        });
    }

    const bodyCommentFor404Error = `خطایی در ثبت لیبل نام تیم رخ داده است\n\n نام کاربری @${usernameInRequest} دارای نام تیم نمی باشد \n\n پیگیری شود : @arash.ghavidast`;
    const bodyCommentFor405Error = `خطایی در ثبت لیبل نام تیم رخ داده است  \n\n2 نام کاربری با اسم @${usernameInRequest} وجود دارد. این خطا ممکن است در بخش پردازش رخ داده باشد.  \n\n پیگیری شود : @arash.ghavidas`;

    userObjectData = getDataUser(usernameInRequest);
    switch (userObjectData.errorCode) {
      case 404:
        await checkCommentExist(projectID, issueID, bodyCommentFor404Error);
        break;
      case 405:
        await checkCommentExist(projectID, issueID, bodyCommentFor405Error);
        break;
      default:
        userTeamName = userObjectData.userTeamName;
        userTeamNameFa = translateTeamName(userTeamName);
        addTeamNameLabel();
        break;
    }
    // Add userTeamName & Ready Labels to PUT API & Run API
    async function addTeamNameLabel() {
      allLabelOnIssue.push(userTeamNameFa);
      const allLabelOnIssueString = allLabelOnIssue.toString();
      await putAPI(`projects/${projectID}/issues/${issueID}/`, {
        labels: allLabelOnIssueString,
      });
    }
  } catch (error) {
    // Error logging
    console.log("Error: " + error);
  } finally {
    next();
  }
};
