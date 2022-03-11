const exportUsersToExcel = require("./exportService");
const axios = require("axios");
users = [];
let config = {
  headers: {
    tokenName: "token",
  },
};
// var headerRange = exportUsersToExcel.getRange("A1:T1");
// headerRange.values = headers;
// headerRange.format.fill.color = "#4472C4";
// headerRange.format.font.color = "white"
axios
  .get("linkToGetData", config)
  .then((res) => {
    users = res.data.data;
    // console.log(users)
    const workSheetColumnName = ["xlsFileHeaderName"];
    const workSheetName = "fileName";
    const filePath = "filePath";
    exportUsersToExcel(users, workSheetColumnName, workSheetName, filePath);
  })
  .catch((err) => {
    console.log(err);
  });
