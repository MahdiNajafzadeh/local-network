const { execSync } = require("node:child_process");

module.exports = (name = "") => {
  try {
    // set variables
    let status = false,
      Disabled = false,
      // query for search user data
      query = `Get-ADUser -Filter "Name -Like '*${name}*'" -Properties * | Select-Object Name, Canonicalname`;
    // get data from AD
    const resulteQueryFromAD = execSync(query, {
      shell: "powershell.exe",
    }).toString();
    // analysis data
    const resulteQueryArry = resulteQueryFromAD.trim().split("\r\n");

    // check to number of user results
    if (!resulteQueryFromAD || resulteQueryArry.length > 3) {
      console.log(`There is more than 1 ${name} username!`);
      return {
        status: status,
        message: `There is more than 1 ${name} username!`,
      };
    } else {
      status = true;
    }
    if (!resulteQueryFromAD) {
      if (resulteQueryArry.length > 3) {
        status = true;
      } else {
        console.log(`There is more than 1 ${name} username!`);
        return {
          status: status,
          errorCode: 405,
          message: `There is more than 1 ${name} username!`,
        };
      }
    } else {
      return {
        status: status,
        errorCode: 404,
        message: `Not found ${name}`,
      };
    }
    // analysis data
    const allDataUser = resulteQueryArry[2].split(" ")[1].trim().split("/");
    // check to Disabled propertie
    allDataUser.forEach((Data) =>
      Data === "Disabled" ? (Disabled = true) : () => {}
    );
    // Collect all data
    const objectReturnData = {
      status: status,
      userName: resulteQueryArry[2].split(" ")[0],
      userTeamName: allDataUser[3],
      userLocation: allDataUser[2],
      Disabled: Disabled,
    };
    // return Data
    return objectReturnData;
  } catch (error) {
    // error Handle
    console.log(error);
    return { status: false, message: "unknown error !" };
  }
};
