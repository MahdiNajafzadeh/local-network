postAPI = require("../Services/request/post");
module.exports = (projectID, issueID, userName) => {
  try {
    body = `
    خطایی در ثبت لیبل نام تیم رخ داده است

نام کاربری @${userName} دارای نام تیم نمی‌باشد 

پیگیری شود : @arash.ghavidast

    `;
    if (projectID && issueID && userName) {
      postAPI(`/projects/${projectID}/issues/${issueID}/notes?body=${body}`)
        .then((res) => {
          console.log("Comment Writing ... done! \n state API : " + res.state);
        })
        .catch((error) => {
          console.log("Error to write comment : " + error.message);
        });
    } else {
      console.log("Body not Valid \n Body : " + body + "\n");
    }
  } catch (error) {
    console.log("Error to write comment : " + error.message);
  }
};
