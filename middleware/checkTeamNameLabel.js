// package importing

const getDataUser = require("../Services/ActiveDirctory/getDataUser");
const putAPI = require("../Services/request/put");
const translateTeamName = require("../utils/translateTeamName");
const wirteComment = require("../utils/wirteComment");
const checkCommentExist = require("../utils/checkCommentExist");

module.exports = async (req, res, next) => {
  try {
    // log
    console.log("check Label MW Running ...");

    // variables importing
    const usernameInRequest = req.body.user.name,
      projectID = req.body.object_attributes.project_id,
      issueID = req.body.object_attributes.iid;

    let userTeamName,
      allLabelOnIssue = [],
      userObjectData,
      userTeamNameFa;

    const bodyCommentFor404Error = `خطایی در ثبت لیبل نام تیم رخ داده است  \n\nنام کاربری @${usernameInRequest} دارای نام تیم نمی‌باشد \n\nپیگیری شود : @arash.ghavidast`;
    const bodyCommentFor405Error = `خطایی در ثبت لیبل نام تیم رخ داده است  \n\n2 نام کاربری با اسم @${usernameInRequest} وجود دارد. این خطا ممکن است در بخش پردازش رخ داده باشد.  \n\n پیگیری شود : @arash.ghavidas`;

    // Listing All Labels on Issue
    req.body.object_attributes.labels.forEach((label) => {
      allLabelOnIssue.push(label.title);
    });
    // log Data for Debugging ---> هر چه خار آید ، روزی به کار آید :)
    console.log(`------------------------------------------------------`);
    console.log(`                          Before                      `);
    console.log(`User Name      : ${usernameInRequest}`);
    console.log(`Uesr Team Name : ${userTeamName}`);
    console.log(`Project ID     : ${projectID}`);
    console.log(`Issue ID       : ${issueID}`);
    console.log(`Labels         : ${allLabelOnIssue}`);
    console.log(`------------------------------------------------------`);

    userObjectData = getDataUser(usernameInRequest);
    switch (userObjectData.errorCode) {
      case 404:
        if (!checkCommentExist(projectID, issueID, bodyCommentFor404Error)){
          wirteComment(
            projectID,
            issueID,
            usernameInRequest,
            bodyCommentFor404Error
          );
        }
        // if (!checkCommentExists(projectID,issueID,usernameInRequest,bodyCommentFor404Error))
        // wirteComment(projectID,issueID,usernameInRequest,bodyCommentFor404Error);
        break;
      case 405:
        if (!checkCommentExist(projectID, issueID, bodyCommentFor405Error)){
          wirteComment(
            projectID,
            issueID,
            usernameInRequest,
            bodyCommentFor405Error
          );
        }
        // if (!checkCommentExists(projectID,issueID,usernameInRequest,bodyCommentFor405Error))
        // wirteComment(projectID,issueID,usernameInRequest,bodyCommentFor405Error);
        break;
      default:
        userTeamName = userObjectData.userTeamName;
        userTeamNameFa = translateTeamName(userTeamName);
        addTeamNameLabel();
        break;
    }

    // log Data for Debugging ---> هر چه خار آید ، روزی به کار آید :)
    console.log(`------------------------------------------------------`);
    console.log(`                          After                       `);
    console.log(`User Name      : ${usernameInRequest}`);
    console.log(`Uesr Team Name : ${userTeamName}`);
    console.log(`Fa Team Name   : ${userTeamNameFa}`);
    console.log(`Project ID     : ${projectID}`);
    console.log(`Issue ID       : ${issueID}`);
    console.log(`Labels         : ${allLabelOnIssue}`);
    console.log(`------------------------------------------------------`);

    // Add userTeamName & Ready Labels to PUT API & Run API
    async function addTeamNameLabel() {
      allLabelOnIssue.push(userTeamNameFa);
      const allLabelOnIssueString = allLabelOnIssue.toString();
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
