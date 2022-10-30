const { execSync } = require("node:child_process");

module.exports = (name) => {
  try {
    // set variables
    let Disabled = false,
      // query for search user data
      query = `Get-ADUser -Filter "Name -Like '${name}'" -Properties * | Select-Object Name, Canonicalname`;
    // get data from AD
    let resulteQueryFromAD = execSync(query, {
      shell: "powershell.exe",
    }).toString();
    // analysis data
    let resulteQueryArry = resulteQueryFromAD.trim().split("\r\n");
    // check user results
    if (!resulteQueryFromAD) {
      console.log(`${name} not found`);
      return {
        status: false,
        errorCode: 404,
        userName: name,
        message: `${name} not found`,
      };
    } else if (resulteQueryArry.length > 3) {
      console.log(`There is more than 1 ${name} username!`);
      return {
        status: false,
        errorCode: 405,
        userName: name,
        message: `There is more than 1 ${name} username!`,
      };
    } else {
      // analysis data
      const allDataUser = resulteQueryArry[2].split(" ")[1].trim().split("/");
      // check to Disabled propertie
      allDataUser.forEach((Data) =>
        Data === "Disabled" ? (Disabled = true) : () => {}
      );
      // Collect all data
      const objectReturnData = {
        status: true,
        userName: resulteQueryArry[2].split(" ")[0],
        userTeamName: allDataUser[3],
        userLocation: allDataUser[2],
        Disabled: Disabled,
      };
      // return Data
      return objectReturnData;
    }
  } catch (error) {
    // error Handle
    console.log(error);
    return { status: false, message: "unknown error !" };
  }
};
