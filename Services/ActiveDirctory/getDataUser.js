const { execSync } = require('node:child_process');

exports.getDataUser = (name='') => {

    /*
return letr === " " ? " " :
    letr === "x" ? "X" :
    letr === "y" ? "Y" :
    "neither";
    */

    try
    {
        const x = execSync(`Get-ADUser -Filter "Name -Like '${name}'"`,{'shell':'powershell.exe'})
        const userDataArray = x.toString().trim().split("\r\n")[0].split(",OU=")[2]
        //console.log(userDataArray);
        return userDataArray ? { status : true , teamName : userDataArray } : { status : false , message:"username not found"}
    }
    catch
    {
        return{ status : false, message:"unknown error !" }
    }

}
