const { execSync } = require("node:child_process");
const { log, clear } = require("node:console");
const getAPI = require("./Services/request/get");
// Functions --------------------------------------------------------
function logInfoUser(name, teamName) {
  log(`  ------------------------
  UserName : ${name}
  TeamName : ${teamName}
  ------------------------`);
}
function GetDataUser(name) {
  const dataUser = execSync(`Get-ADUser -Filter "Name -Like '${name}'"`, {
    shell: "powershell.exe",
  });
  let teamName = dataUser.toString().trim().split("\r\n")[0].split(",OU=")[2];
  return teamName;
}
async function GetMember(ID) {
  const members = await getAPI(`projects/1060/members/${ID}`);
  return members.data;
}
// Get All Members ------------------------------------------------
let userNames = [];
async function x() {
  const endFor = 1000
  for (let index = 670; index < 680; index++) {
    // clear();
    log(`${index} of ${endFor} members`);
    userNames.push({ ID : index , username : await GetMember(index)});
  }
  log(userNames[0]);
}
x();
// Loop ----------------------------------------------------------------

// const x1 = dataUser.toString();
// const x2 = x1.trim();
// const x3 = x2.split("\r\n")[0];
// const x4 = x3.split(",OU=")[3];
// console.log
// log(`x1 : ${x1},\n
//     x3 : ${x3},\n
//     x4 : ${x4}`);

// return teamName
//   ? { status: true, teamName: teamName }
//   : { status: false, message: "username not found" };
