let userTeamName = "4";
let addTeamNameLabel = false;
let allLabelOnIssue = ["1", "2", "3"];
let allLabelOnIssueString = allLabelOnIssue.toString();
wr = console.log;

for (let index = 0; index < allLabelOnIssue.length; index++) {
    if(userTeamName === allLabelOnIssue[index]) addTeamNameLabel = true;
  }

console.log(addTeamNameLabel);
console.log(allLabelOnIssueString);
