const { execSync } = require("node:child_process");

exports.getDataUser = (name = "") => {
  try {
    const dataUser = execSync(`Get-ADUser -Filter "Name -Like '${name}'"`, {
      shell: "powershell.exe",
    });
    const teamName = dataUser
      .toString()
      .trim()
      .split("\r\n")[0]
      .split(",OU=")[2];
    //console.log(userDataArray);

    return teamName
      ? { status: true, teamName: teamName }
      : { status: false, message: "username not found" };
  } catch {
    return { status: false, message: "unknown error !" };
  }
};

    // //let name = "payam.";
    // let status = false;
    // let Disabled = false;
    // let query = `Get-ADUser -Filter "Name -Like '*${name}*'" -Properties * | Select-Object Name, Canonicalname`;
    // const resulteQueryFromAD = execSync(query, {
    //   shell: "powershell.exe",
    // }).toString();

    // const resulteQueryArry = resulteQueryFromAD.trim().split("\r\n");

    // if (!resulteQueryFromAD || resulteQueryArry.length > 3) {
    //   log(`${name} NOT found #404 !`);
    //   return { status: status , error: `User NOT found !` };
    // } else {
    //   status = true;
    // }
    // const allDataUser = resulteQueryArry[2].split(" ")[1].trim().split("/");

    // // log(resulteQueryArry);

    // allDataUser.forEach((Data)=> Data === "Disabled" ? Disabled = true : ()=>{});

    // const objectReturnData = {
    //   status: status,
    //   userName: resulteQueryArry[2].split(" ")[0],
    //   userTeamName: allDataUser[3],
    //   userLocation: allDataUser[2],
    //   Disabled: Disabled
    // };

    // // log(objectReturnData)

    // return objectReturnData;

